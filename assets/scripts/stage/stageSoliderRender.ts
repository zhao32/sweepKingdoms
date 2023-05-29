// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Slider)
    slider: cc.Slider = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(idx) {
        this.nameLabel.string = `${DataManager.armList[idx]}兵 ${DataManager.playData.military_data[idx - 1]}`
    }

    // update (dt) {}
}
