var jspb = require("WsUtil");

var WsDecoder = function (opt_bytes, opt_start, opt_length) {
    /**
     * Typed byte-wise view of the source buffer.
     * @private {?Uint8Array}
     */
    this.bytes_ = null;

    /**
     * Start point of the block to read.
     * @private {number}
     */
    this.start_ = 0;

    /**
     * End point of the block to read.
     * @private {number}
     */
    this.end_ = 0;

    /**
     * Current read location in bytes_.
     * @private {number}
     */
    this.cursor_ = 0;

    /**
     * Temporary storage for the low 32 bits of 64-bit data types that we're
     * decoding.
     * @private {number}
     */
    this.tempLow_ = 0;

    /**
     * Temporary storage for the high 32 bits of 64-bit data types that we're
     * decoding.
     * @private {number}
     */
    this.tempHigh_ = 0;

    if (opt_bytes) {
        this.setBlock(opt_bytes, opt_start, opt_length);
    }
};

/**
 * Global pool of BinaryDecoder instances.
 * @private {!Array.<!WsDecoder>}
 */
WsDecoder.instanceCache_ = [];

WsDecoder.alloc = function (opt_bytes, opt_start, opt_length) {
    if (WsDecoder.instanceCache_.length) {
        var newDecoder = WsDecoder.instanceCache_.pop();
        if (opt_bytes) {
            newDecoder.setBlock(opt_bytes, opt_start, opt_length);
        }
        return newDecoder;
    } else {
        return new WsDecoder(opt_bytes, opt_start, opt_length);
    }
};

/**
 * Puts this instance back in the instance cache.
 */
WsDecoder.prototype.free = function () {
    this.clear();
    if (WsDecoder.instanceCache_.length < 100) {
        WsDecoder.instanceCache_.push(this);
    }
};


/**
 * Makes a copy of this decoder.
 * @return {!WsDecoder}
 */
WsDecoder.prototype.clone = function () {
    return WsDecoder.alloc(this.bytes_,
        this.start_, this.end_ - this.start_);
};


/**
 * Clears the decoder.
 */
WsDecoder.prototype.clear = function () {
    this.bytes_ = null;
    this.start_ = 0;
    this.end_ = 0;
    this.cursor_ = 0;
    this.error_ = false;
};


/**
 * Returns the raw buffer.
 * @return {?Uint8Array} The raw buffer.
 */
WsDecoder.prototype.getBuffer = function () {
    return this.bytes_;
};


/**
 * Changes the block of bytes we're decoding.
 * @param {!jspb.ByteSource} data The bytes we're reading from.
 * @param {number=} opt_start The optional offset to start reading at.
 * @param {number=} opt_length The optional length of the block to read -
 *     we'll throw an assertion if we go off the end of the block.
 */
WsDecoder.prototype.setBlock = function (data, opt_start, opt_length) {
    this.bytes_ = jspb.utils.byteSourceToUint8Array(data);
    this.start_ = opt_start | 0;
    this.end_ =
        opt_length ? this.start_ + opt_length : this.bytes_.length;
    this.cursor_ = this.start_;
};

WsDecoder.prototype.readInt = function(){
    return this.readUnsignedVarint32();
};

WsDecoder.prototype.readString = function(){
    return this.readStringWithLength();
};

WsDecoder.prototype.readLong = function(){
    return this.readUnsignedVarint64();
};

WsDecoder.prototype.readUnsignedVarint32 = function () {
    var temp;
    var bytes = this.bytes_;

    temp = bytes[this.cursor_ + 0];
    var x = (temp & 0x7F);
    if (temp < 128) {
        this.cursor_ += 1;
        return x;
    }

    temp = bytes[this.cursor_ + 1];
    x |= (temp & 0x7F) << 7;
    if (temp < 128) {
        this.cursor_ += 2;
        return x;
    }

    temp = bytes[this.cursor_ + 2];
    x |= (temp & 0x7F) << 14;
    if (temp < 128) {
        this.cursor_ += 3;
        return x;
    }

    temp = bytes[this.cursor_ + 3];
    x |= (temp & 0x7F) << 21;
    if (temp < 128) {
        this.cursor_ += 4;
        return x;
    }

    temp = bytes[this.cursor_ + 4];
    x |= (temp & 0x0F) << 28;
    if (temp < 128) {
        // We're reading the high bits of an unsigned varint. The byte we just read
        // also contains bits 33 through 35, which we're going to discard. Those
        // bits _must_ be zero, or the encoding is invalid.
        cc.assert((temp & 0xF0) == 0,"readUnsignedVarint32 error!");
        this.cursor_ += 5;
        return x >>> 0;
    }

    // If we get here, we're reading the sign extension of a negative 32-bit int.
    // We can skip these bytes, as we know in advance that they have to be all
    // 1's if the varint is correctly encoded. Since we also know the value is
    // negative, we don't have to coerce it to unsigned before we return it.

    this.cursor_ += 10;
    return x;
};

/**
 * Reads a raw unsigned 32-bit integer from the binary stream.
 *
 * @return {number} The unsigned 32-bit integer read from the binary stream.
 */
WsDecoder.prototype.readUint32 = function () {
    var a = this.bytes_[this.cursor_ + 0];
    var b = this.bytes_[this.cursor_ + 1];
    var c = this.bytes_[this.cursor_ + 2];
    var d = this.bytes_[this.cursor_ + 3];
    this.cursor_ += 4;
    return ((a << 0) | (b << 8) | (c << 16) | (d << 24)) >>> 0;
};

/**
 * Reads a 32-bit floating-point number from the binary stream, using the
 * temporary buffer to realign the data.
 *
 * @return {number} The float read from the binary stream.
 */
WsDecoder.prototype.readFloat = function () {
    var bitsLow = this.readUint32();
    var bitsHigh = 0;
    return jspb.utils.joinFloat32(bitsLow, bitsHigh);
};

WsDecoder.prototype.readBool = function () {
    return !!this.bytes_[this.cursor_++];
};

WsDecoder.prototype.readStringPure = function (length) {
    var bytes = this.bytes_;
    var cursor = this.cursor_;
    var end = cursor + length;
    var codeUnits = [];

    while (cursor < end) {
        var c = bytes[cursor++];
        if (c < 128) { // Regular 7-bit ASCII.
            codeUnits.push(c);
        } else if (c < 192) {
            // UTF-8 continuation mark. We are out of sync. This
            // might happen if we attempted to read a character
            // with more than four bytes.
            continue;
        } else if (c < 224) { // UTF-8 with two bytes.
            var c2 = bytes[cursor++];
            codeUnits.push(((c & 31) << 6) | (c2 & 63));
        } else if (c < 240) { // UTF-8 with three bytes.
            var c2 = bytes[cursor++];
            var c3 = bytes[cursor++];
            codeUnits.push(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        } else if (c < 248) { // UTF-8 with 4 bytes.
            var c2 = bytes[cursor++];
            var c3 = bytes[cursor++];
            var c4 = bytes[cursor++];
            // Characters written on 4 bytes have 21 bits for a codepoint. 
            // We can't fit that on 16bit characters, so we use surrogates.
            var codepoint = ((c & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
            // Surrogates formula from wikipedia.
            // 1. Subtract 0x10000 from codepoint
            codepoint -= 0x10000;
            // 2. Split this into the high 10-bit value and the low 10-bit value
            // 3. Add 0xD800 to the high value to form the high surrogate
            // 4. Add 0xDC00 to the low value to form the low surrogate:
            var low = (codepoint & 1023) + 0xDC00;
            var high = ((codepoint >> 10) & 1023) + 0xD800;
            codeUnits.push(high, low);
        }
    }
    // String.fromCharCode.apply is faster than manually appending characters on
    // Chrome 25+, and generates no additional cons string garbage.
    var result = String.fromCharCode.apply(null, codeUnits);
    this.cursor_ = cursor;
    return result;
};


/**
 * Reads and parses a UTF-8 encoded unicode string (with length prefix) from
 * the stream.
 * @return {string} The decoded string.
 */
WsDecoder.prototype.readStringWithLength = function () {
    var length = this.readUnsignedVarint32();
    return this.readStringPure(length);
};

WsDecoder.prototype.readUnsignedVarint64 = function() {
  this.readSplitVarint64_();
  return jspb.utils.joinUint64(this.tempLow_, this.tempHigh_);
};

/**
 * Reads an unsigned varint from the binary stream and stores it as a split
 * 64-bit integer. Since this does not convert the value to a number, no
 * precision is lost.
 *
 * It's possible for an unsigned varint to be incorrectly encoded - more than
 * 64 bits' worth of data could be present. If this happens, this method will
 * throw an error.
 *
 * Decoding varints requires doing some funny base-128 math - for more
 * details on the format, see
 * https://developers.google.com/protocol-buffers/docs/encoding
 *
 * @private
 */
WsDecoder.prototype.readSplitVarint64_ = function() {
  var temp;
  var lowBits = 0;
  var highBits = 0;

  // Read the first four bytes of the varint, stopping at the terminator if we
  // see it.
  for (var i = 0; i < 4; i++) {
    temp = this.bytes_[this.cursor_++];
    lowBits |= (temp & 0x7F) << (i * 7);
    if (temp < 128) {
      this.tempLow_ = lowBits >>> 0;
      this.tempHigh_ = 0;
      return;
    }
  }

  // Read the fifth byte, which straddles the low and high dwords.
  temp = this.bytes_[this.cursor_++];
  lowBits |= (temp & 0x7F) << 28;
  highBits |= (temp & 0x7F) >> 4;
  if (temp < 128) {
    this.tempLow_ = lowBits >>> 0;
    this.tempHigh_ = highBits >>> 0;
    return;
  }

  // Read the sixth through tenth byte.
  for (var i = 0; i < 5; i++) {
    temp = this.bytes_[this.cursor_++];
    highBits |= (temp & 0x7F) << (i * 7 + 3);
    if (temp < 128) {
      this.tempLow_ = lowBits >>> 0;
      this.tempHigh_ = highBits >>> 0;
      return;
    }
  }

  // If we did not see the terminator, the encoding was invalid.
  cc.error('Failed to read varint, encoding is invalid.');
  this.error_ = true;
};

module.exports = WsDecoder;