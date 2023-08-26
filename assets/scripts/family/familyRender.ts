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

    @property({ type: cc.Label, displayName: "家族名称" })
    labelName: cc.Label = null;

    @property({ type: cc.Label, displayName: "家族人数" })
    labelCount: cc.Label = null;

    @property({ type: cc.Node, displayName: "头像" })
    icon: cc.Node = null;


    @property
    text: string = 'hello';
    _data

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onApplyHandler() {
        // console.log(`playerid:`+DataManager.playData.id)
        console.log(`familyID:`+this._data.familyID)

        MyProtocols.send_C2SApplyEnterFamily(DataManager._loginSocket, this._data.familyID)
    }

    start() {

    }
    // {"familyID":10,"familyName":"家族名称","familyIcon":10002,"familyLv":0,"num":""}
    init(data) {
        this._data = data
        this.labelName.string = `家族名称:` + data.familyName
        this.labelCount.string = `家族人数:` + data.num
    }

    // update (dt) {}
}
