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

    @property(cc.Label)
    useLabel: cc.Label = null;

    @property(cc.Slider)
    slider: cc.Slider = null;

    allNum: number = 0

    selectNum: number = 0

    idx: number = 0

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // this.slider.on

    }

    onSlider() {
        this.selectNum = Math.floor(this.slider.progress * this.allNum)
        this.useLabel.string = `调动数量 ${this.selectNum}`
    }

    getSelectNum() {
        // return [this.idx, this.selectNum]
        return { arm: this.idx, count: this.selectNum }
    }

    init(idx, soliderNum) {
        this.idx = idx
        this.allNum = soliderNum
        this.nameLabel.string = `${DataManager.armList[idx]}兵 ${DataManager.playData.military_data[idx - 1]}`

        ResManager.loadItemIcon(`soliderHead/${DataManager.armList[idx]}兵`, this.node.getChildByName(`head`))
    }

    // update (dt) {}
}
