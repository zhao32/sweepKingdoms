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

    used: number

    type: string
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // this.slider.on

    }

    onSlider() {
        this.selectNum = Math.floor(this.slider.progress * this.allNum)
        // this.useLabel.string = `调动兵力 ${this.selectNum}/已调兵力 ${this.used}`

        if (this.used != undefined) {
            if (this.type == 'in') {
                this.useLabel.string = `调动兵力 ${this.selectNum}/已有兵力 ${this.used}`
            } else if (this.type == 'out') {
                this.useLabel.string = `调动兵力 ${this.selectNum}/主城兵力 ${this.used}`
            } else {
                this.useLabel.string = `调动兵力 ${this.selectNum}/已有兵力 ${this.used}`
            }
        } else {
            this.useLabel.string = `调动兵力 ${this.selectNum}`
        }
    }

    getSelectNum() {
        // return [this.idx, this.selectNum]
        let used = 0
        if (this.used) {
            used = this.used
        }
        this.nameLabel.string = `${DataManager.GameData.Soldier[this.idx].name} ${this.allNum - this.selectNum}`
        if (this.type == 'out') {
            return { arm: this.idx, count: this.selectNum }
        } else {
            return { arm: this.idx, count: this.selectNum + used }
        }
    }

    init(idx, soliderNum, used?: number, type?: string, cardData?: any) {
        this.type = type
        this.used = used
        this.idx = idx
        this.allNum = soliderNum
        this.nameLabel.string = `${DataManager.GameData.Soldier[idx].name} ${soliderNum}`
        ResManager.loadItemIcon(`soliderHead/${DataManager.GameData.Soldier[idx].name}`, this.node.getChildByName(`head`))
        if (used != undefined) {
            if (this.type == 'in') {
                this.useLabel.string = `调动兵力 ${this.selectNum}/已有兵力 ${used}`
            } else if (this.type == 'out') {
                this.useLabel.string = `调动兵力 ${this.selectNum}/主城兵力 ${used}`
            } else {
                this.useLabel.string = `调动兵力 ${this.selectNum}/已有兵力 ${used}`
            }
        } else {
            this.useLabel.string = `调动兵力 ${this.selectNum}`
        }

        let data = DataManager.GameData.Soldier[idx]
        let str = DataManager.getSoliderDes(data)
        this.node.getChildByName(`head`).on(cc.Node.EventType.TOUCH_END, () => {
            // ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
            console.log(`cardData:`+JSON.stringify(cardData))
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_SOLIDER, ...[data, cardData])

        }, this)
    }

    setSelectNum(select) {
        this.selectNum = select
        this.slider.progress = this.selectNum / this.allNum
        this.useLabel.string = `调动兵力 ${this.selectNum}`
    }

    // update (dt) {}
}
