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

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    soliderPfb: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // NetEventDispatcher.addListener(NetEvent.S2CRankPlayerDetail, this.S2CRankPlayerDetail.bind(this))

    }

    init(rankType,playerid) {
        console.error('rankType:'+ rankType)
        console.error('playerid'+ playerid)

        // MyProtocols.send_C2SRankPlayerDetail(DataManager._loginSocket, rankType, playerid)

        this.contect.removeAllChildren()
        for (let i = 0; i < DataManager.battleSoliderConfig.length; i++) {
            let solider = cc.instantiate(this.soliderPfb)
            solider.parent = this.contect

        }
    }

    onBackHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLEFILED)
    }

    onSetHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_TEAMSET)

    }

    
    // S2CRankPlayerDetail(retObj) {
    //     console.log('--------------------1046--------------------')
    //     console.log(JSON.stringify(retObj))

    // }


    // update (dt) {}
}
