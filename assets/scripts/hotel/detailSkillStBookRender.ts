// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

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


    // data;
    pos;

    skillId:number

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data, pos) {
        let skillSt = DataManager.GameData.SkillStudy[data.template_id]

        this.skillId =data.template_id
        console.log(`data:` + JSON.stringify(data))
        // this.data = data
        this.pos = pos
        this.nameLabel.string = skillSt.name + ' x'+ data.num
        this.richLabel.string = skillSt.des

        if (skillSt.type == 1) {
            ResManager.loadItemIcon(`skillats/红`, this.bg)
        } else if (skillSt.type == 2) {
            ResManager.loadItemIcon(`skillats/黄`, this.bg)
        } else if (skillSt.type == 3) {
            ResManager.loadItemIcon(`skillats/蓝`, this.bg)
        }
        ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.icon)
    }

    onTeachHandler() {
        console.log('this.skillId:'+this.skillId)
        DataManager.wndHotelDetail.node.getChildByName('skillstPanel').active = false
        MyProtocols.send_C2SSKillTeach(DataManager._loginSocket, DataManager.wndHotelDetail._card.id, this.pos, this.skillId)
    }

    // update (dt) {}
}
