// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

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


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data, idx) {
        // "skills_equips":[{"id":0,"level":0,"type":2},{"id":0,"level":0,"type":1},{"id":0,"level":0,"type":2}]
        // this.nameLabel.string = data.name
        // this.richLabel.string = data.des

        if (data.type == 0) {
            ResManager.loadItemIcon(`skillats/红`, this.bg)
        } else if (data.type == 1) {
            ResManager.loadItemIcon(`skillats/黄`, this.bg)
        } else if (data.type == 2) {
            ResManager.loadItemIcon(`skillats/蓝`, this.bg)
        }

        this.node.getChildByName(`btnTeach`).active = data.id == 0
    }

    onTeachHandler() {
        DataManager.wndHotelDetail.openSkillstPanel()


    }

    // update (dt) {}
}
