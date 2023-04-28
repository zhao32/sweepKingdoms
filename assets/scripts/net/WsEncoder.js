
var jspb = require("WsUtil");

var WsEncoder = function () {
    /** @private {!Array.<number>} */
    this.buffer_ = [];
};

WsEncoder.instanceCache_ = [];

WsEncoder.alloc = function () {
    if (WsEncoder.instanceCache_.length) {
        var newDecoder = WsEncoder.instanceCache_.pop();
        return newDecoder;
    } else {
        return new WsEncoder();
    }
};

/**
 * Puts this instance back in the instance cache.
 */
WsEncoder.prototype.free = function () {
    this.buffer_ = [];
    if (WsEncoder.instanceCache_.length < 100) {
        WsEncoder.instanceCache_.push(this);
    }
};

/**
 * @return {!Array.<number>}
 */
WsEncoder.prototype.end = function() {
  var buffer = this.buffer_;
  this.buffer_ = [];
  return buffer;
};

WsEncoder.prototype.writeUnsignedVarint32 = function (value) {
    while (value > 127) {
        this.buffer_.push((value & 0x7f) | 0x80);
        value = value >>> 7;
    }
    this.buffer_.push(value);
};

WsEncoder.prototype.writeUnsignedVarint64 = function (value) {
    cc.assert(value == Math.floor(value));
    cc.assert((value >= 0) &&
                      (value < jspb.BinaryConstants.TWO_TO_64));
    jspb.utils.splitInt64(value);
  this.writeSplitVarint64(jspb.utils.split64Low,
                          jspb.utils.split64High);
};

/**
 * Encodes a 64-bit integer in 32:32 split representation into its wire-format
 * varint representation and stores it in the buffer.
 * @param {number} lowBits The low 32 bits of the int.
 * @param {number} highBits The high 32 bits of the int.
 */
WsEncoder.prototype.writeSplitVarint64 = function (lowBits, highBits) {
    // Break the binary representation into chunks of 7 bits, set the 8th bit
    // in each chunk if it's not the final chunk, and append to the result.
    while (highBits > 0 || lowBits > 127) {
        this.buffer_.push((lowBits & 0x7f) | 0x80);
        lowBits = ((lowBits >>> 7) | (highBits << 25)) >>> 0;
        highBits = highBits >>> 7;
    }
    this.buffer_.push(lowBits);
};

WsEncoder.prototype.writeInt = function(value){
    this.writeSignedVarint32(value);
};

WsEncoder.prototype.writeLong = function(value){
    this.writeUnsignedVarint64(value);
};

/**
 * Encodes a 32-bit signed integer into its wire-format varint representation
 * and stores it in the buffer.
 * @param {number} value The integer to convert.
 */
WsEncoder.prototype.writeSignedVarint32 = function (value) {
    // Use the unsigned version if the value is not negative.
    if (value >= 0) {
        this.writeUnsignedVarint32(value);
        return;
    }

    // Write nine bytes with a _signed_ right shift so we preserve the sign bit.
    for (var i = 0; i < 9; i++) {
        this.buffer_.push((value & 0x7f) | 0x80);
        value = value >> 7;
    }

    // The above loop writes out 63 bits, so the last byte is always the sign bit
    // which is always set for negative numbers.
    this.buffer_.push(1);
};

/**
 * Encodes a 64-bit signed integer into its wire-format varint representation
 * and stores it in the buffer. Integers that are not representable in 64 bits
 * will be truncated.
 * @param {number} value The integer to convert.
 */
WsEncoder.prototype.writeSignedVarint64 = function (value) {
    cc.assert(value == Math.floor(value));
  cc.assert((value >= -jspb.BinaryConstants.TWO_TO_63) &&
                      (value < jspb.BinaryConstants.TWO_TO_63));
    jspb.utils.splitInt64(value);
    this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};

/**
 * Writes a single-precision floating point value to the buffer. Numbers
 * requiring more than 32 bits of precision will be truncated.
 * @param {number} value The value to write.
 */
WsEncoder.prototype.writeFloat = function (value) {
    cc.assert((value >= -jspb.BinaryConstants.FLOAT32_MAX) &&
                      (value <= jspb.BinaryConstants.FLOAT32_MAX));
    jspb.utils.splitFloat32(value);
    this.writeUint32(jspb.utils.split64Low);
};

WsEncoder.prototype.writeUint32 = function (value) {
    this.buffer_.push((value >>> 0) & 0xFF);
    this.buffer_.push((value >>> 8) & 0xFF);
    this.buffer_.push((value >>> 16) & 0xFF);
    this.buffer_.push((value >>> 24) & 0xFF);
};

/**
 * Writes a boolean value to the buffer as a varint.
 * @param {boolean} value The value to write.
 */
WsEncoder.prototype.writeBool = function (value) {
    this.buffer_.push(value ? 1 : 0);
};

/**
 * Writes a UTF16 Javascript string to the buffer encoded as UTF8.
 * TODO(aappleby): Add support for surrogate pairs, reject unpaired surrogates.
 * @param {string} value The string to write.
 * @return {number} The number of bytes used to encode the string.
 */
WsEncoder.prototype.writeString = function (value) {
    var str_buffer = [];

    for (var i = 0; i < value.length; i++) {

        var c = value.charCodeAt(i);

        if (c < 128) {
            str_buffer.push(c);
        } else if (c < 2048) {
            str_buffer.push((c >> 6) | 192);
            str_buffer.push((c & 63) | 128);
        } else if (c < 65536) {
            // Look for surrogates
            if (c >= 0xD800 && c <= 0xDBFF && i + 1 < value.length) {
                var second = value.charCodeAt(i + 1);
                if (second >= 0xDC00 && second <= 0xDFFF) { // low surrogate
                    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    c = (c - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;

                    str_buffer.push((c >> 18) | 240);
                    str_buffer.push(((c >> 12) & 63) | 128);
                    str_buffer.push(((c >> 6) & 63) | 128);
                    str_buffer.push((c & 63) | 128);
                    i++;
                }
            }
            else {
                str_buffer.push((c >> 12) | 224);
                str_buffer.push(((c >> 6) & 63) | 128);
                str_buffer.push((c & 63) | 128);
            }
        }
    }

    var length = str_buffer.length;
    this.writeSignedVarint32(length);
    this.writeBytes(str_buffer);
    str_buffer = null;
};

/**
 * Writes an arbitrary byte array to the buffer.
 * @param {!Uint8Array} bytes The array of bytes to write.
 */
WsEncoder.prototype.writeBytes = function (bytes) {
    this.buffer_.push.apply(this.buffer_, bytes);
};


module.exports = WsEncoder;