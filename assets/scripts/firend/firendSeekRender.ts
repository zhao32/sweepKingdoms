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
    labelDisPlay1: cc.Label = null;

    @property(cc.Label)
    labelDisPlay2: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this.labelDisPlay1.string = data.group
        this.labelDisPlay2.string = data.describe
        ResManager.loadItemIcon(`firend/firendIcon${data.frameIdx}`, this.icon)
    }

    // update (dt) {}
}
