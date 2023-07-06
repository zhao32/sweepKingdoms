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


    data;
    pos;

    skillId:number

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data, pos, template_id) {
        this.skillId = template_id
        console.log(`data:` + JSON.stringify(data))
        this.data = data
        this.pos = pos
        this.nameLabel.string = data.name
        this.richLabel.string = data.des

        if (data.type == 0) {
            ResManager.loadItemIcon(`skillats/红`, this.bg)
        } else if (data.type == 1) {
            ResManager.loadItemIcon(`skillats/黄`, this.bg)
        } else if (data.type == 2) {
            ResManager.loadItemIcon(`skillats/蓝`, this.bg)
        }
        ResManager.loadItemIcon(`skillats/${data.name}`, this.icon)
    }

    onTeachHandler() {
        console.log('this.skillId:'+this.skillId)
        MyProtocols.send_C2SSKillTeach(DataManager._loginSocket, DataManager.wndHotelDetail._data.id, this.pos, this.skillId)
    }

    // update (dt) {}
}
