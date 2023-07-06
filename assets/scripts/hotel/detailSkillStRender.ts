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
    nameLabel: cc.Label = null;

    @property(cc.RichText)
    richLabel: cc.RichText = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    _data;
    _idx;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data, idx) {
        // "skills_equips":[{"id":0,"level":0,"type":2},{"id":0,"level":0,"type":1},{"id":0,"level":0,"type":2}]
        // this.nameLabel.string = data.name
        // this.richLabel.string = data.des
        this._data = data
        this._idx = idx

        if (data.type == 0) {
            ResManager.loadItemIcon(`skillats/红`, this.bg)
        } else if (data.type == 1) {
            ResManager.loadItemIcon(`skillats/黄`, this.bg)
        } else if (data.type == 2) {
            ResManager.loadItemIcon(`skillats/蓝`, this.bg)
        }

        this.node.getChildByName(`btnTeach`).active = data.id == 0
        if (data.id != 0) {
            let skillSt = DataManager.GameData.SkillStudy[data.id]
            ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.icon)
        }

        this.icon.on(cc.Node.EventType.TOUCH_END, () => {
            MyProtocols.send_C2SSKillStUp(DataManager._loginSocket, DataManager.wndHotelDetail._data.id, this._idx, this._data.id, this._data.level + 1)
        }, this)
    }

    onTeachHandler() {
        DataManager.wndHotelDetail.openSkillstPanel(this._data, this._idx)
    }

    // update (dt) {}
}
