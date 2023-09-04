// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(skillSt) {
        this.nameLabel.string = skillSt.name

        if (skillSt.type == 1) {
            ResManager.loadItemIcon(`skillats/红`, this.bg)
        } else if (skillSt.type == 2) {
            ResManager.loadItemIcon(`skillats/黄`, this.bg)
        } else if (skillSt.type == 3) {
            ResManager.loadItemIcon(`skillats/蓝`, this.bg)
        }
        ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.icon)

    }

    // update (dt) {}
}
