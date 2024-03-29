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

    // heroList

    start() {
        // NetEventDispatcher.addListener(NetEvent.S2CRankPlayerDetail, this.S2CRankPlayerDetail,this)

    }

    init() {
        // MyProtocols.send_C2SRankPlayerDetail(DataManager._loginSocket, rankType, playerid)
        // this.heroList = heroList
        this.contect.removeAllChildren()
        for (let i = 0; i < DataManager.myBattleFiledConfig.soliderList.length; i++) {
            let soliderData = DataManager.myBattleFiledConfig.soliderList[i]
            let cardData = DataManager.myBattleFiledConfig.card[i]
            let solider = cc.instantiate(this.soliderPfb)
            solider.parent = this.contect
            let name = DataManager.GameData.Soldier[soliderData.arm].name
            solider.getChildByName('nameLabel').getComponent(cc.Label).string = name
            solider.getChildByName('countLabel').getComponent(cc.Label).string = 'x' + soliderData.count

            ResManager.loadItemIcon(`soliderHead/${name}`, solider.getChildByName('iocn'))


            let str = DataManager.getSoliderDes(DataManager.GameData.Soldier[soliderData.arm])
            solider.getChildByName(`equipBg`).on(cc.Node.EventType.TOUCH_END, () => {
                // ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
                ViewManager.instance.showNote(EnumManager.viewPath.NOTE_SOLIDER, ...[DataManager.GameData.Soldier[soliderData.arm], cardData])


            }, this)
        }

        // for (let i = 0; i < DataManager.myBattleFiledConfig.card.length; i++) {
        //     if (DataManager.myBattleFiledConfig.card[i] != 0) {
        //         let defaultData = DataManager.GameData.Cards[DataManager.myBattleFiledConfig.card[i]]
        //         ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.node.getChildByName('hero').getChildByName(`head${i}`))
        //         ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.node.getChildByName('hero').getChildByName(`bg${i}`))
        //     }
        // }
        console.log(' DataManager.myBattleFiledConfig.card:' + JSON.stringify(DataManager.myBattleFiledConfig.card))
        for (let i = 0; i < DataManager.myBattleFiledConfig.card.length; i++) {
            for (let j = 0; j < DataManager.cardsList.length; j++) {
                if (DataManager.myBattleFiledConfig.card[i] == DataManager.cardsList[j].id) {
                    let tmpId = DataManager.cardsList[j].template_id
                    let defaultData = DataManager.GameData.Cards[tmpId]
                    ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.node.getChildByName('hero').getChildByName(`head${i}`))
                    ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.node.getChildByName('hero').getChildByName(`bg${i}`))
                }
            }
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

    onClose() {

    }


    // S2CRankPlayerDetail(retObj) {
    //     console.log('--------------------1046--------------------')
    //     console.log(JSON.stringify(retObj))

    // }


    // update (dt) {}
}
