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
        this.nameLabel.string = `${DataManager.GameData.Soldier[idx].name} ${soliderNum}`
        ResManager.loadItemIcon(`soliderHead/${DataManager.GameData.Soldier[idx].name}`, this.node.getChildByName(`head`))
        
        let data = DataManager.GameData.Soldier[idx]
        let str = DataManager.getSoliderDes(data)
        this.node.getChildByName(`head`).on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
        }, this)
    }

    setSelectNum(select) {
        this.selectNum = select
        this.slider.progress = this.selectNum / this.allNum
        this.useLabel.string = `调动数量 ${this.selectNum}`
    }

    // update (dt) {}
}
