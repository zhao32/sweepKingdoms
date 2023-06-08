// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
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

    _selectNum

    idx: number = 0

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // this.slider.on

    }

    onSlider() {
        let count = 0
        let myCount = 0
        for (let i = 0; i < this.node.parent.children.length; i++) {
            let item = this.node.parent.children[i]
            count += item.getComponent("soliderRender").getSelectNum().count
            if (item.uuid == this.node.uuid) {
                myCount = item.getComponent("soliderRender").getSelectNum().count
            }
        }

        if (count > 150000000 && this.slider.progress > this.selectNum / this.allNum) {
            let selectNum = 150000000 - (count - myCount)
            // selectNum = Math.max(0, selectNum)
            this.slider.progress = Math.max(selectNum / this.allNum, 0)
            ViewManager.instance.showToast('已招满500r人')
            this.useLabel.string = `调动数量 ${Math.max(0, selectNum)}`
        } else {
            this.selectNum = Math.floor(this.slider.progress * this.allNum)
            this.useLabel.string = `调动数量 ${Math.max(0, this.selectNum)}`
        }

    }

    getSelectNum() {
        // return [this.idx, this.selectNum]
        return { arm: this.idx, count: this.selectNum }
    }

    getCheckSelectNum() {
        // return [this.idx, this.selectNum]
        this._selectNum = Math.min(this.selectNum, this._selectNum)
        this._selectNum = Math.max(0, this._selectNum)
        return { arm: this.idx, count: this._selectNum }
    }

    init(idx, soliderNum) {
        this.idx = idx
        this.allNum = soliderNum
        this.nameLabel.string = `${DataManager.GameData.Soldier[idx].name} ${DataManager.playData.military_data[idx - 1]}`
        ResManager.loadItemIcon(`soliderHead/${DataManager.GameData.Soldier[idx].name}`, this.node.getChildByName(`head`))
    }

    // update (dt) {}
}
