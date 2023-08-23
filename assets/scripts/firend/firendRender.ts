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
    labelName: cc.Label = null;

    @property(cc.Label)
    labelFamily: cc.Label = null;

    @property(cc.Label)
    labelNation: cc.Label = null;

    @property(cc.Label)
    labelLevel: cc.Label = null;

    @property(cc.Label)
    labelBtn: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    _type

    _data
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    /**type 1 好友 2 敌人 */
    init(data, type) {
        this._data = data
        this.labelName.string = `姓名：${data.fiend_name}`
        this.labelFamily.string = `家族：${data.fiend_Guild}`
        this.labelLevel.string = `LV:${data.fiend_Lv}`
        this.labelNation.string = `国籍：${DataManager.countyList[data.fiend_Contry]}`
        this._type = type
        if (data.fiend_Head == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.head)
        } else if (data.fiend_Head == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.head)
        } else {
            let defaultData = DataManager.GameData.Cards[data.fiend_Head]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        }

        if (type == 1) {
            this.labelBtn.string = `聊天`
        } else {
            this.labelBtn.string = `删除`
        }
    }

    onBtnHandler() {
        if (this._type == 1) {//聊天

        } else {//删除

        }
    }


    // update (dt) {}
}
