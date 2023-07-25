// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    decLablel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _idx;
    _data;

    start() {

    }

    /**元宝升级 */
    onUpHandler1() {
        this.onCloseHandler()
        MyProtocols.send_C2SRuneLevelup(DataManager._loginSocket, DataManager.wndHotelDetail._data.id, this._idx, 0)
    }

    /**功勋升级 */
    onUpHandler2() {
        this.onCloseHandler()
        MyProtocols.send_C2SRuneLevelup(DataManager._loginSocket, DataManager.wndHotelDetail._data.id, this._idx, 1)
    }

    onCloseHandler() {
        this.node.active = false
    }

    init(data, idx) {
        this._data = data
        this._idx = idx
    }

    // update (dt) {}
}
