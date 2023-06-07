// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    myContect: cc.Node = null;

    @property(cc.Node)
    otherContect: cc.Node = null;

    @property(cc.Prefab)
    armPfb: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.myContect.removeAllChildren()
        for (let i = 0; i < 10; i++) {
            let arm = cc.instantiate(this.armPfb)
            arm.parent = this.myContect
        }
        
        this.otherContect.removeAllChildren()
        for (let i = 0; i < 10; i++) {
            let arm = cc.instantiate(this.armPfb)
            arm.parent = this.otherContect
        }
    }

    init(rankType, playerid) {
        // (senderSocket, p_rank_type, p_player_id)
        // console.error('rankType:'+ rankType)
        // console.error('playerid'+ playerid)

        MyProtocols.send_C2SRankPlayerDetail(DataManager._loginSocket, rankType, playerid)
        NetEventDispatcher.addListener(NetEvent.S2CRankPlayerDetail, this.S2CRankPlayerDetail.bind(this))
    }

    onClose() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLEFILED)
    }

    S2CRankPlayerDetail(retObj) {
        console.log('--------------------1046--------------------')
        console.log(JSON.stringify(retObj))

    }

    // update (dt) {}
}
