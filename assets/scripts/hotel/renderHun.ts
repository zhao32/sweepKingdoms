// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    @property(cc.Label)
    disLabel: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    data

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this.data = data
        let fragData = DataManager.GameData.CardFrags[data.template_id]
        ResManager.loadItemIcon(`hero/icon/${fragData.name.slice(0,-2)}`, this.head)
        ResManager.loadItemIcon(`hero/debrisBg${fragData.quality - 1}`, this.headBg)

        this.disLabel.string = fragData.des
        this.nameLabel.string = fragData.name + ` x${data.num}`
    }

    onCompHandler() {
        // let fragData = DataManager.GameData.CardFrags[this.data.template_id]

        MyProtocols.send_C2SCardCompose(DataManager._loginSocket, this.data.template_id)
    }

    // update (dt) {}
}
