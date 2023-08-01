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


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: '强化属性' })
    attributeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '等级' })
    gradeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '百分比' })
    percentDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '强化增加' })
    plusDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '单价' })
    priceDisplay: cc.Label = null;

    @property({ type: cc.Sprite, displayName: '消耗晶元图片' })
    pearlSprite: cc.Sprite = null;

    @property({ type: cc.ProgressBar })
    proBar: cc.ProgressBar = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    data
    start() {

    }

    init(data) {
        console.log(`data:`+JSON.stringify(data))
        // console.log(`type:`+ JSON.stringify(DataManager.GameData.soliderStren[`${data.type}`]) )
        this.data = data
        this.gradeDisplay.string = `LV:` + data.lv
        this.attributeDisplay.string = data.name + `  +${DataManager.GameData.soliderStren[`${data.type}`].plus[`${data.lv}`]}%`

        this.priceDisplay.string = `x` + DataManager.GameData.soliderStren["coast"][data.lv]
        this.proBar.progress = data.lv / 30
        this.percentDisplay.string = `${this.data.lv}/30`
        if (this.data.lv == 30) {
            this.node.getChildByName('btnStren').getComponent(cc.Button).interactable = false
        }
        let stone = DataManager.GameData.soliderStren[data.type].stone
        ResManager.loadItemIcon(`UI/stone/${stone}`, this.pearlSprite.node)

    }

    onStrengthHandler() {
        let key = DataManager.GameData.soliderStren[this.data.type].stone
        let num = 0
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            if (key == DataManager.instance.itemsList[i].template_id) {
                num = DataManager.instance.itemsList[i].num
            }
        }
        if (num < DataManager.GameData.soliderStren["coast"][this.data.lv]) {
            ViewManager.instance.showToast(`所需升级矿石不足`)
            return
        }

        // { idx: data.idx, type: 1, name: "挥砍攻击" }
        MyProtocols.send_C2SSoliderStren(DataManager._loginSocket, this.data.lv + 1, this.data.idx, this.data.type)


    }

    onClose() {


    }

    updataLv(lv) {
        this.gradeDisplay.string = `LV:` + lv
        this.data.lv = lv
        this.priceDisplay.string = `x` + DataManager.GameData.soliderStren["coast"][this.data.lv]
        this.proBar.progress = this.data.lv / 30
        this.percentDisplay.string = `${this.data.lv}/30`
        if (this.data.lv == 30) {
            this.node.getChildByName('btnStren').getComponent(cc.Button).interactable = false
        }
        this.attributeDisplay.string = this.data.name + `  +${DataManager.GameData.soliderStren[`${this.data.type}`].plus[`${lv}`]}%`


    }

    // update (dt) {}
}
