// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    labelName: cc.Label = null;

    @property(cc.Label)
    labelFamily: cc.Label = null;

    @property(cc.Label)
    labelNation: cc.Label = null;

    @property(cc.Label)
    labelLevel: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;
  
    _data
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    init(data) {
        this._data = data
        this.labelName.string = `姓名：${data.fiend_name}`
        this.labelFamily.string = `家族：${data.fiend_Guild}`
        this.labelLevel.string = `LV:${data.fiend_Lv}`
        this.labelNation.string = `国籍：${DataManager.countyList[data.fiend_Contry]}`

        if (data.fiend_Head == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.head)
        } else if (data.fiend_Head == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.head)
        } else {
            let defaultData = DataManager.GameData.Cards[data.fiend_Head]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        }
    }


    // update (dt) {}
}
