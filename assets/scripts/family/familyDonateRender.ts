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

    _data

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this._data = data
        this.nameLabel.string = data.name
        let awardName
        if (data.awardType == 0) {
            awardName = `家族声望`
        } else {
            awardName = `家族贡献度`
        }
        this.LabelAward.string = `每次捐献可获得：` + awardName+ `x${data.awardNum}`
        this.LabelBtn.string = `捐献:${data.donateNum}`
    }

    onContributeHandler() {
        MyProtocols.send_C2SFamilyTaskSend(DataManager._loginSocket,this._data.id,this._data.donateNum)
    }

    // update (dt) {}
}
