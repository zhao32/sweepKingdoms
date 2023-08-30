// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;
//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.ProgressBar, displayName: "贡献进度条" })
    proBar: cc.ProgressBar = null;

    @property({ type: cc.Label, displayName: "收集物品名称" })
    nameLabel: cc.Label = null;

    @property({ type: cc.Label, displayName: "进度" })
    LabelPro: cc.Label = null;

    @property({ type: cc.Label, displayName: "捐献奖励" })
    LabelAward: cc.Label = null;

    @property({ type: cc.Label, displayName: "捐献数量" })
    LabelBtn: cc.Label = null;

    _donateData

    armData
    type
    // LIFE-CYCLE CALLBACKS:
    donateIdx

    curDonte
    // onLoad () {}

    start() {

    }

    upPro(type, id, idx, num) {
        if (this.armData.type == type && this.armData.id == id && this.donateIdx == idx) {
            this.curDonte += num
            this.LabelPro.string = `${this.curDonte}/${this._donateData[1]}`
            this.proBar.progress = this.curDonte / this._donateData[1]
        }
    }

    init(donateData, type, armData, donateIdx, netData?: any) {
        this.type = type
        this._donateData = donateData
        this.armData = armData
        this.donateIdx = donateIdx
        // this.nameLabel.string = data.name
        // let awardName
        // if (data.awardType == 0) {
        //     awardName = `家族声望`
        // } else {
        //     awardName = `家族贡献度`
        // }
        this.curDonte = 0
        if (netData) {
            this.curDonte = netData.donatedNum
        }

        this.LabelAward.string = `每次捐献可获得声望：` + donateData[2]
        this.LabelPro.string = `${this.curDonte}/${donateData[1]}`
        this.LabelBtn.string = `捐献` + donateData[3]

        this.proBar.progress = this.curDonte / donateData[1]
        let donateItems = DataManager.GameData.Items[String(donateData[0])]
        console.log('donateItems:' + donateItems)
        if (donateItems) {
            this.nameLabel.string = donateItems.name
        }
        // this.LabelBtn.string = `捐献:${data.donateNum}`
    }

    onContributeHandler() {
        console.log(`type:` + this.armData.type)
        console.log(`id:` + this.armData.id)
        console.log(`this._donateData[3]:` + this._donateData[3])

        if (this.type == 1) {
            console.log(`兵种捐赠`)
            MyProtocols.send_C2SFamilyArmDonate(DataManager._loginSocket, this.armData.type, this.armData.id, this.donateIdx, this._donateData[3])
        } else {
            console.log(`效果捐赠`)
            MyProtocols.send_C2SFamilyEffDonate(DataManager._loginSocket, this.armData.type, this.armData.id, this.donateIdx, this._donateData[3])
        }
    }

    // update (dt) {}
}
