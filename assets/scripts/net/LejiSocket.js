var WsDecoder = require("WsDecoder");
var WsEncoder = require("WsEncoder");
var NetEvent = require("NetEvent");
var NetEventDispatcher = require("NetEventDispatcher");
var MyProtocols = require("MyProtocols");
var EventNetManager = require("EventNetManager");
var EventManager = require("EventManager");

// const i18n = require("i18n");

var LejiSocket = function (phost_addr) {
    this.host_addr = phost_addr;
    this._cache_msg = null;
    this.initWebSocket();
};

LejiSocket.prototype.initWebSocket = function () {
    cc.log("websocket init,host=" + this.host_addr);
    this._webSocket = new WebSocket(this.host_addr);
    this._webSocket.binaryType = "arraybuffer";
    this._conn_status = -1;
    var self = this;
    this._webSocket.onopen = function (event) {
        cc.log("WebSocket was opened." + JSON.stringify(event));
        self._conn_status = 0;
    };
    var self = this;
    this._webSocket.onmessage = function (event) {
        cc.log("WebSocket onmessage!");
        var rawByteArray = event.data;
        self._decodeByteArray(rawByteArray);
        // if (cc.sys.isNative) {
        // self._decodeByteArray(rawByteArray);
        // }
        // else {
        //     var reader = new FileReader();
        //     reader.readAsArrayBuffer(rawByteArray);
        //     //   当读取操作成功完成时调用.
        //     reader.onload = function (evt) {
        //         if (evt.target.readyState == FileReader.DONE) {
        //             var rawBuffer = evt.target.result;
        //             self._decodeByteArray(rawBuffer);
        //         }
        //     }
        // }
    };
    this._webSocket.onerror = function (event) {
        cc.log("Websocket fired an error" + event);
        self._conn_status = 1;
        NetEventDispatcher.dispatchEvent("NetWork-Error", this);
    };
    this._webSocket.onclose = function (event) {
        cc.log("WebSocket instance closed." + event);
        self._conn_status = 2;
        NetEventDispatcher.dispatchEvent("NetWork-Error", this);
    };
};

LejiSocket.prototype._decodeByteArray = function (rawByteArray) {
    var myDecoder = WsDecoder.alloc(rawByteArray);
    var msgCode = myDecoder.readInt();
    cc.log("msgCode=%d", msgCode);
    if (msgCode == NetEvent.ErrorCode) {
        var errcode = myDecoder.readInt();
        // cc.error("error:%d %s",errcode, i18n.t(errcode));
        // MyUiManager.OpenFloatTipPanel(new cc.Vec2(0, 130), i18n.t(errcode));

    }
    else {
        if (MyProtocols["get_" + msgCode] == null) {
            cc.error("proto:%d not defined!", msgCode);
        }
        else {
            var retObj = MyProtocols["get_" + msgCode].call(null, myDecoder);
            NetEventDispatcher.dispatchEvent(msgCode, retObj);
            // console.log('retObj:'+retObj)
            // EventNetManager.default.prototype.dispatchEvent(msgCode, retObj)
        }
    }
    myDecoder.free();
};

LejiSocket.prototype.sendMessage = function (byteArrayContent) {
    if (this._conn_status != 0) {
        cc.log("WebSocket instance wasn't ready...");
        this._cache_msg = byteArrayContent;
        NetEventDispatcher.dispatchEvent("NetWork-Error", this);
        return;
    }
    var flat = new Uint8Array(byteArrayContent);
    this._webSocket.send(flat);
};

LejiSocket.prototype.close = function () {
    if (this._webSocket.readyState === WebSocket.OPEN) {
        this._webSocket.close();
    }
};

LejiSocket.prototype.isConnected = function () {
    if (this._conn_status == 0) {
        return true;
    }
    return false;
};

LejiSocket.prototype.isError = function () {
    if (this._conn_status == 1 || this._conn_status == 2) {
        return true;
    }
    return false;
};

LejiSocket.prototype.reconnect = function () {
    if (this._conn_status != 1 && this._conn_status != 2 && this._webSocket != null) {
        this._webSocket.close();
    }
    this._webSocket = null;
    this.initWebSocket();
}

LejiSocket.prototype.clear = function () {
    this._webSocket = null;
    this._conn_status = -1;
    this._cache_msg = null;
}


module.exports = LejiSocket;