// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
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

    heroList

    start() {
        // NetEventDispatcher.addListener(NetEvent.S2CRankPlayerDetail, this.S2CRankPlayerDetail.bind(this))

    }

    init(heroList) {
        // MyProtocols.send_C2SRankPlayerDetail(DataManager._loginSocket, rankType, playerid)
        this.heroList = heroList
        this.contect.removeAllChildren()
        for (let i = 0; i < DataManager.battleSoliderConfig.length; i++) {
            let solider = cc.instantiate(this.soliderPfb)
            solider.parent = this.contect
            solider.getChildByName('nameLabel').getComponent(cc.Label).string = DataManager.GameData.Soldier[DataManager.battleSoliderConfig[i].arm].name
            solider.getChildByName('countLabel').getComponent(cc.Label).string = 'x' + DataManager.battleSoliderConfig[i].count
        }

        for (let i = 0; i < heroList.length; i++) {
            if (heroList[i] != 0) {
                let defaultData = DataManager.GameData.Cards[heroList[i]]
                ResManager.loadItemIcon(`hero/${defaultData.name}`, this.node.getChildByName('hero').getChildByName(`head${i}`))
                ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.node.getChildByName('hero').getChildByName(`bg${i}`))
            }

        }

    }

    onBackHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLEFILED)
    }

    onSetHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_TEAMSET, ...[this.heroList])
    }


    // S2CRankPlayerDetail(retObj) {
    //     console.log('--------------------1046--------------------')
    //     console.log(JSON.stringify(retObj))

    // }


    // update (dt) {}
}
