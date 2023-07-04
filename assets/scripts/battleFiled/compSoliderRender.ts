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

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Label)
    label0: cc.Label = null;

    @property(cc.Label)
    label1: cc.Label = null;

    start() {

    }

    init(data) {
        // console.log('data:'+ JSON.stringify(data))
        // debugger
        this.label0.string = DataManager.GameData.Soldier[data.arm].name
        this.label1.string = 'x' + data.count

        ResManager.loadItemIcon(`soliderHead/${DataManager.GameData.Soldier[data.arm].name}`, this.icon)
    }

    // update (dt) {}
}
