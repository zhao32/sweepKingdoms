// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import compHeroRender from "../battleFiled/compHeroRender";
import compSoliderRender from "../battleFiled/compSoliderRender";
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
    attContect: cc.Node = null;

    @property(cc.Node)
    definContect: cc.Node = null;

    @property(cc.Prefab)
    armPfb: cc.Prefab = null;

    @property(cc.Prefab)
    heroPfb: cc.Prefab = null;

    @property(cc.Label)
    attNameLabel: cc.Label = null;

    @property(cc.Label)
    defineNameLabel: cc.Label = null;

    @property(cc.Label)
    attFightLabel: cc.Label = null;

    @property(cc.Label)
    defineFightLabel: cc.Label = null;

    @property(cc.Label)
    attSupportLabel: cc.Label = null;

    @property(cc.Label)
    defineSupportLabel: cc.Label = null;


    myData
    eData


    myAllData
    eAllData

    enemyPlayerId
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // this.myContect.removeAllChildren()
        // for (let i = 0; i < 10; i++) {
        //     let arm = cc.instantiate(this.armPfb)
        //     arm.parent = this.myContect
        // }

        // this.otherContect.removeAllChildren()
        // for (let i = 0; i < 10; i++) {
        //     let arm = cc.instantiate(this.armPfb)
        //     arm.parent = this.otherContect
        // }



    }

    S2CPkEnemyFormation(retObj) {
        console.log('------返回是否可以PK的信息---------')
        // console.log(JSON.stringify(retObj))

    }

    definSoliders = []

    attSoliders = []

    S2CMineEnemyDetail(retObj) {

        let attSoliderNum = 0
        let definSoliderNum = 0

        this.attContect.removeAllChildren()
        this.definContect.removeAllChildren()

        this.definSoliders = []
        this.attSoliders = []


        if (retObj.base_info) {
            this.defineNameLabel.string = retObj.base_info.nickname ? `守方:${retObj.base_info.nickname}` : `守方:无`
            this.defineFightLabel.string = `主战：${retObj.base_info.fight}`

        }

        if (retObj.att_base_info) {
            this.attNameLabel.string = retObj.att_base_info.nickname ? `攻方:${retObj.att_base_info.nickname}` : `攻方:无`
            this.attFightLabel.string = `主战：${retObj.att_base_info.fight}`

        }

        console.log(`请求恶魔之门阵容返回`)
        console.log(JSON.stringify(retObj))
        // debugger;
        if (retObj.formation) {
            if (retObj.formation.a != 0) {
                let heroItem = cc.instantiate(this.heroPfb)
                heroItem.parent = this.definContect
                let cardData
                // for (let i = 0; i < DataManager.cardsList.length; i++) {
                //     if (DataManager.cardsList[i].template_id == retObj.formation.a) {
                //         cardData = DataManager.cardsList[i]
                //     }

                // }
                heroItem.getComponent(compHeroRender).init(retObj.cards[0])
            }
        }

        if (retObj.soliderUsed) {
            for (let i = 0; i < retObj.soliderUsed.length; i++) {
                if (retObj.soliderUsed[i].arm != 0) {
                    this.definSoliders.push(retObj.soliderUsed[i])
                }
            }
        }


        if (retObj.att_formation) {
            if (retObj.att_formation.a != 0) {
                let heroItem = cc.instantiate(this.heroPfb)
                heroItem.parent = this.attContect
                // let cardData
                // for (let i = 0; i < DataManager.cardsList.length; i++) {
                //     if (DataManager.cardsList[i].template_id == retObj.formation.a) {
                //         cardData = DataManager.cardsList[i]
                //     }

                // }
                heroItem.getComponent(compHeroRender).init(retObj.att_cards[0])
            }
        }

        if (retObj.att_soliderUsed) {
            for (let i = 0; i < retObj.att_soliderUsed.length; i++) {
                if (retObj.att_soliderUsed[i].arm != 0) {
                    this.attSoliders.push(retObj.att_soliderUsed[i])
                }
            }
        }

        for (let i = 0; i < this.attSoliders.length; i++) {
            let soliderItem = cc.instantiate(this.armPfb)
            soliderItem.parent = this.attContect
            soliderItem.getComponent(compSoliderRender).init(this.attSoliders[i])
            attSoliderNum += this.attSoliders[i].count
        }

        for (let i = 0; i < this.definSoliders.length; i++) {
            let soliderItem = cc.instantiate(this.armPfb)
            soliderItem.parent = this.definContect
            soliderItem.getComponent(compSoliderRender).init(this.definSoliders[i])
            definSoliderNum += this.definSoliders[i].count

        }

        if (retObj.base_info) {
            definSoliderNum -= retObj.base_info.fight
        }
        if (retObj.att_base_info) {
            attSoliderNum -= retObj.att_base_info.fight
        }
        this.defineSupportLabel.string = `援军：${definSoliderNum}`
        this.attSupportLabel.string = `援军：${attSoliderNum}`


    }

    init(data) {
        // (senderSocket, p_rank_type, p_player_id)
        // console.error('rankType:'+ rankType)

        // this.myData = myData
        // this.eData = eData
        console.log("data:" + JSON.stringify(data))
        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.page, data.idx, data.country)
        NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)

        // NetEventDispatcher.addListener(NetEvent.S2CRankPlayerDetail, this.S2CRankPlayerDetail,this)
        // NetEventDispatcher.addListener(NetEvent.S2CPkEnemyFormation, this.S2CPkEnemyFormation,this)
        // MyProtocols.send_C2SRankPlayerDetail(DataManager._loginSocket, eData.rank_type, eData.playerId)
    }

    onCloseHanlder() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN)
    }

    // {"rank_type":4,"rank_player":{"playerId":9961,"nickname":"瘦弱的武都拳师","sexId":0,"icon":0,"head_frame":1,"level":46,"fight":2796,"vipLevel":0,"rank_change":0,"hero_count":0,"hero_stars":0,"win_count":0,"like_count":0},"item":[{"template_id":1,"num":2730},{"template_id":2,"num":2100},{"template_id":3,"num":0},{"template_id":4,"num":0},{"template_id":5,"num":0},{"template_id":6,"num":0},{"template_id":7,"num":0},{"template_id":8,"num":0},{"template_id":9,"num":0},{"template_id":10,"num":0},{"template_id":11,"num":0},{"template_id":12,"num":0},{"template_id":13,"num":0},{"template_id":14,"num":0},{"template_id":15,"num":0},{"template_id":16,"num":0},{"template_id":17,"num":0},{"template_id":18,"num":0},{"template_id":19,"num":0}],"cardlist":[{"template_id":1,"level":1,"exp":0,"grade":0,"unitLevel":0,"grade":0,"unit_type":0,"maxhp":0,"atk":0,"def":0,"unitMaxhp":0,"unitAtk":0,"unitDef":0,"unitNum":2796,"fight":0,"equips":[],"runes":[0,0]}],"pkWinLoose":[]}
    // S2CRankPlayerDetail(retObj) {
    //     console.log('--------------------1046--------------------')
    //     // console.log(JSON.stringify(retObj))
    //     this.myNameLabel.string = '攻方：' + DataManager.playData.name
    //     this.otherNameLabel.string = '守方：' + retObj.rank_player.nickname
    //     this.enemyPlayerId = retObj.rank_player.playerId

    //     let eSoliderList = []
    //     for (let i = 0; i < retObj.item.length; i++) {
    //         let data = retObj.item[i]
    //         if (data.num != 0) {
    //             eSoliderList.push({ arm: data.template_id, count: data.num })
    //         }
    //     }

    //     if (eSoliderList.length == 0) {
    //         eSoliderList.push({ arm: 1, count: 100 })
    //     }

    //     let card = []
    //     for (let i = 0; i < retObj.cardlist.length; i++) {
    //         card.push(retObj.cardlist[i].template_id)
    //     }


    //     this.otherContect.removeAllChildren()
    //     for (let i = 0; i < retObj.cardlist.length; i++) {
    //         if (retObj.cardlist[i].template_id != 0) {
    //             let item = cc.instantiate(this.heroPfb)
    //             item.parent = this.otherContect
    //             item.getComponent(compHeroRender).init(retObj.cardlist[i])
    //         }

    //     }

    //     for (let i = 0; i < eSoliderList.length; i++) {
    //         let item = cc.instantiate(this.armPfb)
    //         item.parent = this.otherContect
    //         item.getComponent(compSoliderRender).init(eSoliderList[i])

    //     }


    //     let myCards = []
    //     for (let i = 0; i < DataManager.cardsList.length; i++) {
    //         if (DataManager.myBattleFiledConfig.card.indexOf(DataManager.cardsList[i].template_id) != -1) {
    //             myCards.push(DataManager.cardsList[i])
    //         }

    //     }
    //     this.myContect.removeAllChildren()
    //     for (let i = 0; i < myCards.length; i++) {
    //         let item = cc.instantiate(this.heroPfb)
    //         item.parent = this.myContect
    //         item.getComponent(compHeroRender).init(myCards[i])
    //     }

    //     for (let i = 0; i < DataManager.myBattleFiledConfig.soliders.length; i++) {
    //         let item = cc.instantiate(this.armPfb)
    //         item.parent = this.myContect
    //         item.getComponent(compSoliderRender).init(DataManager.myBattleFiledConfig.soliders[i])
    //     }

    //     // console.log("myCards:" + JSON.stringify(myCards))
    //     // console.log("soliders:" + JSON.stringify(DataManager.myBattleFiledConfig.soliders))

    //     let mySoliderList = []
    //     for (let i = 0; i < DataManager.myBattleFiledConfig.soliders.length; i++) {
    //         let data = {
    //             arm: DataManager.myBattleFiledConfig.soliders[i].arm,
    //             count: DataManager.myBattleFiledConfig.soliders[i].count,
    //             defense: 0,
    //             fight: 0
    //         }
    //         mySoliderList.push(data)
    //     }

    //     let enemySoliderList = []
    //     for (let i = 0; i < eSoliderList.length; i++) {
    //         let data = {
    //             arm: eSoliderList[i].arm,
    //             count: eSoliderList[i].count,
    //             defense: 0,
    //             fight: 0
    //         }
    //         enemySoliderList.push(data)
    //     }

    //     let myData = {
    //         player: this.myData,
    //         cards: myCards,
    //         soliders: mySoliderList
    //     }

    //     let enemyData = {
    //         player: this.eData,
    //         cards: retObj.cardlist,
    //         soliders: enemySoliderList
    //     }

    //     this.myAllData = myData
    //     this.eAllData = enemyData

    //     console.log('myData:' + JSON.stringify(myData))
    //     console.log('enemyData:' + JSON.stringify(enemyData))

    // }

    doBattle() {
        //进行战斗
        console.log(`-----------进行挑战-----------`)
        MyProtocols.send_C2SPkEnemyFormation(DataManager._loginSocket, this.enemyPlayerId)
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_RESULT, ...[this.myAllData, this.eAllData])
    }

    onClose() {
        // NetEventDispatcher.removeListener(NetEvent.S2CRankPlayerDetail, this.S2CRankPlayerDetail,this)
        NetEventDispatcher.removeListener(NetEvent.S2CPkEnemyFormation, this.S2CPkEnemyFormation, this)
        NetEventDispatcher.removeListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)
    }



    // update (dt) {}
}
