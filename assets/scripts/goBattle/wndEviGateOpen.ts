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

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    posLabel: cc.Label = null;

    @property(cc.Label)
    lordLabel: cc.Label = null;

    @property(cc.Label)
    troopsLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Label)
    awardLabel: cc.Label = null;


    _data: any

    @property(cc.Label)
    titleLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data, state = DataManager.curMineDetailData.state) {
        this._data = data
        // NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)
        // console.log(`DataManager.curMineDetailData.att_base_info.id:` + DataManager.curMineDetailData.att_base_info.id)
        console.log('state:' + state)
        console.log(`DataManager.playData.id:` + DataManager.playData.id)
        this.node.getChildByName('btnFight').active = false
        this.node.getChildByName('btnDefine').active = true
        this.node.getChildByName('btnAtt').active = true
        if (state == 2) {
            this.node.getChildByName('btnDefine').getComponent(cc.Button).interactable = false
            this.node.getChildByName('btnAtt').getComponent(cc.Button).interactable = false
        } else {
            // debugger
            if (state == 1 && DataManager.curMineDetailData.att_base_info && DataManager.playData.id == DataManager.curMineDetailData.att_base_info.id) {
                this.node.getChildByName('btnFight').active = true
                this.node.getChildByName('btnDefine').active = false
                this.node.getChildByName('btnAtt').active = false
            } else {
                if (data.hold_player.country == DataManager.playData.nation_id) {
                    this.node.getChildByName('btnDefine').getComponent(cc.Button).interactable = true
                    this.node.getChildByName('btnAtt').getComponent(cc.Button).interactable = false
                } else {
                    this.node.getChildByName('btnDefine').getComponent(cc.Button).interactable = false
                    this.node.getChildByName('btnAtt').getComponent(cc.Button).interactable = true
                }
            }

        }



        this._data = data
        let name = DataManager.getName(data.hold_player)//DataManager.mineData[data.hold_player.group].name
        // this.nameLabel.string = data.hold_player.lv + '级' + name
        this.lordLabel.string = data.hold_player.nickname ? `领主：${data.hold_player.nickname}` : `领主：无`
        // this.awardLabel.string = `已产出：${data.hold_player.award}`
        this.titleLabel.string = name

        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)

    }

    // S2CMineEnemyDetail(data) {
    //     console.log('恶魔之门阵容返回')
    //     console.log(JSON.stringify(data))

    // }

    /**查看战场 */
    onDetailHandler() {
        console.log(`------查看战场--------`)
        // console.log(JSON.stringify(this._data.hold_player))
        ViewManager.instance.hideWnd(DataManager.curWndPath)

        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_COMPYARMY, ...[this._data.hold_player])
        // MyProtocols.send_C2SMineEviDetail(DataManager._loginSocket, this._data.hold_player.page, this._data.hold_player.idx, this._data.hold_player.country)
    }

    /**协助进攻 */
    onAttackHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUTDISPATCH, ...[this._data.hold_player, 'in', 1])
    }
    /**协助防守 */
    onDefineHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUTDISPATCH, ...[this._data.hold_player, 'in', 0])
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }


    doFightHandler() {
        DataManager.fightType = 3
        // debugger
        let myHeroData = null
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (DataManager.cardsList[i].id == DataManager.curMineDetailData.att_formation.a) {
                myHeroData = DataManager.cardsList[i]
            }
        }

        let mySoliders = []
        for (let i = 0; i < DataManager.curMineDetailData.att_soliderUsed.length; i++) {
            if (DataManager.curMineDetailData.att_soliderUsed[i].arm != 0) {
                mySoliders.push(DataManager.curMineDetailData.att_soliderUsed[i])
            }
        }
        let myData = {
            heroData: myHeroData,
            soliderList: []
        }

        let allNum = 0
        for (let i = 0; i < mySoliders.length; i++) {
            let data = mySoliders[i]
            let defineData = {
                arm: data.arm,
                count: data.count,
                fight: 0,
                defense: 0
            }
            if (data.count > 0) {
                myData.soliderList.push(defineData)
            }
            allNum += data.count
        }

        if (allNum == 0) {
            ViewManager.instance.showToast('您还没有上阵士兵')
            return
        }

        let soliderData = []
        for (let i = 0; i < DataManager.curMineDetailData.soliderUsed.length; i++) {
            if (DataManager.curMineDetailData.soliderUsed[i].arm != 0) {
                soliderData.push({
                    arm: DataManager.curMineDetailData.soliderUsed[i].arm,
                    count: DataManager.curMineDetailData.soliderUsed[i].count,
                    fight: 0,
                    defense: 0
                })
            }
        }
        if (soliderData.length == 0) {
            soliderData.push({
                arm: 1,
                count: 100,
                fight: 0,
                defense: 0
            })
        }

        let eHeroData = null
        if (DataManager.curMineDetailData.formation.a != 0) {
            for (let i = 0; i < DataManager.curMineDetailData.cards.length; i++) {
                if (DataManager.curMineDetailData.cards[i].id == DataManager.curMineDetailData.formation.a) {
                    eHeroData = DataManager.curMineDetailData.cards[i]
                }
            }
        }

        let otherData =
        {
            heroData: eHeroData,
            soliderList: soliderData
        }

        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_BATTLE, ...[myData, otherData, this._data])
    }

    onClose() {
        // NetEventDispatcher.removeListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)

    }

    // update (dt) {}
}
