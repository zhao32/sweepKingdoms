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

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    recoverLabel: cc.Label = null;

    @property(cc.Slider)
    slider: cc.Slider = null;

    allNum: number = 0

    selectNum: number = 0

    idx: number = 0


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    onSlider() {
        this.selectNum = Math.floor(this.slider.progress * this.allNum)
        this.recoverLabel.string = `复活数量 ${this.selectNum}`
    }


    init(data, count) {
        this.recoverLabel.string = `复活数量 ${this.selectNum}`

        ResManager.loadItemIcon(`soliderHead/${data.name}`, this.head)
        this.nameLabel.string = `${data.name} x${count}`
        
        this.idx = data.idx
        this.allNum = count

    }

    getSelectNum() {
        // return [this.idx, this.selectNum]
        return { template_id: this.idx, num: this.selectNum }
    }

    // update (dt) {}
}
