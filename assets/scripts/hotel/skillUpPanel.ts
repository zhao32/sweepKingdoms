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
    lvLablel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _idx;
    _data;

    start() {

    }

    onUpHandler() {
        this.onCloseHandler()
        MyProtocols.send_C2SSKillStUp(DataManager._loginSocket, DataManager.wndHotelDetail._data.id, this._idx, this._data.id, this._data.level + 1)

    }

    onCloseHandler() {
        this.node.active = false
    }

    init(data, idx) {
        this._data = data
        this._idx = idx
        this.lvLablel.string = `LV${data.level}   --->   LV${data.level + 1}`

        let skillSt = DataManager.GameData.SkillStudy[data.id]
        ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.icon)
    }

    // update (dt) {}
}
