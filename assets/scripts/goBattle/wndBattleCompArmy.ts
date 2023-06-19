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
import compHeroRender from "./compHeroRender";
import compSoliderRender from "./compSoliderRender";

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

    @property(cc.Prefab)
    heroPfb: cc.Prefab = null;

    @property(cc.Label)
    myNameLabel: cc.Label = null;

    @property(cc.Label)
    otherNameLabel: cc.Label = null;

    @property(cc.Label)
    myRankLabel: cc.Label = null;

    @property(cc.Label)
    otherRankLabel: cc.Label = null;


    myData
    eData


    myAllData
    eAllData

    enemyPlayerId
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

    S2CPkEnemyFormation(retObj) {
        console.log('------返回是否可以PK的信息---------')
        // console.log(JSON.stringify(retObj))

    }

    init(myData, eData) {
        // (senderSocket, p_rank_type, p_player_id)
        // console.error('rankType:'+ rankType)

        this.myData = myData
        this.eData = eData

        NetEventDispatcher.addListener(NetEvent.S2CRankPlayerDetail, this.S2CRankPlayerDetail.bind(this))
        NetEventDispatcher.addListener(NetEvent.S2CPkEnemyFormation, this.S2CPkEnemyFormation.bind(this))
        // MyProtocols.send_C2SRankPlayerDetail(DataManager._loginSocket, eData.rank_type, eData.playerId)
    }

    onCloseHanlder() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN)
    }

    // {"rank_type":4,"rank_player":{"playerId":9961,"nickname":"瘦弱的武都拳师","sexId":0,"icon":0,"head_frame":1,"level":46,"fight":2796,"vipLevel":0,"rank_change":0,"hero_count":0,"hero_stars":0,"win_count":0,"like_count":0},"item":[{"template_id":1,"num":2730},{"template_id":2,"num":2100},{"template_id":3,"num":0},{"template_id":4,"num":0},{"template_id":5,"num":0},{"template_id":6,"num":0},{"template_id":7,"num":0},{"template_id":8,"num":0},{"template_id":9,"num":0},{"template_id":10,"num":0},{"template_id":11,"num":0},{"template_id":12,"num":0},{"template_id":13,"num":0},{"template_id":14,"num":0},{"template_id":15,"num":0},{"template_id":16,"num":0},{"template_id":17,"num":0},{"template_id":18,"num":0},{"template_id":19,"num":0}],"cardlist":[{"template_id":1,"level":1,"exp":0,"grade":0,"unitLevel":0,"unitGrade":0,"unit_type":0,"maxhp":0,"atk":0,"def":0,"unitMaxhp":0,"unitAtk":0,"unitDef":0,"unitNum":2796,"fight":0,"equips":[],"runes":[0,0]}],"pkWinLoose":[]}
    S2CRankPlayerDetail(retObj) {
        console.log('--------------------1046--------------------')
        // console.log(JSON.stringify(retObj))
        this.myNameLabel.string = '攻方：' + DataManager.playData.name
        this.otherNameLabel.string = '守方：' + retObj.rank_player.nickname
        this.enemyPlayerId = retObj.rank_player.playerId

        let eSoliderList = []
        for (let i = 0; i < retObj.item.length; i++) {
            let data = retObj.item[i]
            if (data.num != 0) {
                eSoliderList.push({ arm: data.template_id, count: data.num })
            }
        }

        if (eSoliderList.length == 0) {
            eSoliderList.push({ arm: 1, count: 100 })
        }

        let card = []
        for (let i = 0; i < retObj.cardlist.length; i++) {
            card.push(retObj.cardlist[i].template_id)
        }


        this.otherContect.removeAllChildren()
        for (let i = 0; i < retObj.cardlist.length; i++) {
            if (retObj.cardlist[i].template_id != 0) {
                let item = cc.instantiate(this.heroPfb)
                item.parent = this.otherContect
                item.getComponent(compHeroRender).init(retObj.cardlist[i])
            }

        }

        for (let i = 0; i < eSoliderList.length; i++) {
            let item = cc.instantiate(this.armPfb)
            item.parent = this.otherContect
            item.getComponent(compSoliderRender).init(eSoliderList[i])

        }


        let myCards = []
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (DataManager.myBattleFiledConfig.card.indexOf(DataManager.cardsList[i].template_id) != -1) {
                myCards.push(DataManager.cardsList[i])
            }

        }
        this.myContect.removeAllChildren()
        for (let i = 0; i < myCards.length; i++) {
            let item = cc.instantiate(this.heroPfb)
            item.parent = this.myContect
            item.getComponent(compHeroRender).init(myCards[i])
        }

        for (let i = 0; i < DataManager.myBattleFiledConfig.soliders.length; i++) {
            let item = cc.instantiate(this.armPfb)
            item.parent = this.myContect
            item.getComponent(compSoliderRender).init(DataManager.myBattleFiledConfig.soliders[i])
        }

        // console.log("myCards:" + JSON.stringify(myCards))
        // console.log("soliders:" + JSON.stringify(DataManager.myBattleFiledConfig.soliders))

        let mySoliderList = []
        for (let i = 0; i < DataManager.myBattleFiledConfig.soliders.length; i++) {
            let data = {
                arm: DataManager.myBattleFiledConfig.soliders[i].arm,
                count: DataManager.myBattleFiledConfig.soliders[i].count,
                defense: 0,
                fight: 0
            }
            mySoliderList.push(data)
        }

        let enemySoliderList = []
        for (let i = 0; i < eSoliderList.length; i++) {
            let data = {
                arm: eSoliderList[i].arm,
                count: eSoliderList[i].count,
                defense: 0,
                fight: 0
            }
            enemySoliderList.push(data)
        }

        let myData = {
            player: this.myData,
            cards: myCards,
            soliders: mySoliderList
        }

        let enemyData = {
            player: this.eData,
            cards: retObj.cardlist,
            soliders: enemySoliderList
        }

        this.myAllData = myData
        this.eAllData = enemyData

        console.log('myData:' + JSON.stringify(myData))
        console.log('enemyData:' + JSON.stringify(enemyData))

    }

    doBattle() {
        //进行战斗
        console.log(`-----------进行挑战-----------`)
        MyProtocols.send_C2SPkEnemyFormation(DataManager._loginSocket, this.enemyPlayerId)
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_RESULT, ...[this.myAllData, this.eAllData])
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CRankPlayerDetail, this.S2CRankPlayerDetail.bind(this))
        NetEventDispatcher.removeListener(NetEvent.S2CPkEnemyFormation, this.S2CPkEnemyFormation.bind(this))
    }



    // update (dt) {}
}
