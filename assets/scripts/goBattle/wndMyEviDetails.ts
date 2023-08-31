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
import openEviPanel from "./openEviPanel";

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

    @property(cc.Label)
    titleLabel: cc.Label = null;


    @property(cc.Node)
    icon: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    _data

    start() {

    }

    // {
    // 	"hold_player": {
    // 		"id": 0,
    // 		"nickname": "",
    // 		"level": 0,
    // 		"icon": 0,
    // 		"head_frame_id": 0,
    // 		"fight": 0,
    // 		"cd_time": 0,
    // 		"group": 0,
    // 		"lv": 0
    // 	}
    // }

    init(data = this._data) {
        this._data = data
        // let name = DataManager.mineData[data.group].name
        console.log(JSON.stringify(data))

        let name: string
        if (this._data.group == 106) {
            if (this._data.country == 1) {
                //华夏遗迹
                name = '华夏遗迹'
            } else if (this._data.country == 4) {
                //蓬莱遗迹
                name = '蓬莱遗迹'
            } else if (this._data.country == 6) {
                //归墟遗迹
                name = '归墟遗迹'
            }
        } else if (this._data.group == 105) {
            if (this._data.country == 2) {
                //上古战场
                name = "上古战场"
            } else if (this._data.country == 7) {
                //财神庙
                name = "财神庙"
            }
        } else {
            name = DataManager.mineData[this._data.group].name
        }
        // this.nameLabel.string = data.lv + '级' + name
        if (data.group >= 101) {
            this.nameLabel.string = name
        } else {
            if (data.bulidLv == 0) {
                this.nameLabel.string = `未建造` + data.lv + '级' + name
            } else {
                let lvList = ["微型", "小型", "中型", "大型", "巨型"]
                this.nameLabel.string = data.lv + "级 " + lvList[data.bulidLv - 1] + name
            }
        }


        // if (!data.lv) {
        //     this.nameLabel.string = data.lv + '级' + name
        // }

        this.troopsLabel.string = `兵力：${data.fight}`
        this.lordLabel.string = `领主：${data.nickname}`
        // this.posLabel.string = `(${data.x},${data.y})`  //`(${data.x,data.y})`
        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)
        this.titleLabel.string = DataManager.mineData[data.group].name
        // this.posLabel.string = `坐标：` + DataManager.countyList[data.country] + '国'
        this.posLabel.string = `坐标：` + DataManager.countyList[data.country] + '国' + ` ` + `(` + data.page + `,` + data.idx + `)`

        // : function (senderSocket, p_level_index, p_point_index) {
        // MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket,)

        // if(data.id){
        //     ResManager.loadItemIcon(`goBattle/icon1`,this.icon)
        // }else{
        //     ResManager.loadItemIcon(`goBattle/icon0`,this.icon)
        // }
        NetEventDispatcher.addListener(NetEvent.S2CEviGate, this.S2CEviGate, this)
        this.node.getChildByName(`btnOpen`).active = DataManager.curMineDetailData.state == 0
        if (DataManager.curMineDetailData.state == 0) {
            this.node.getChildByName(`btnOpen`).active = true
            this.node.getChildByName(`btnIn`).active = true
            this.node.getChildByName(`btnOut`).active = false

            this.node.getChildByName(`btnDetail`).active = false
            this.node.getChildByName(`btnUp`).active = true


        } else if (DataManager.curMineDetailData.state == 2) {
            this.node.getChildByName(`btnOpen`).active = false
            this.node.getChildByName(`btnIn`).active = false
            this.node.getChildByName(`btnOut`).active = false

            this.node.getChildByName(`btnDetail`).active = true
            this.node.getChildByName(`btnUp`).active = false
        } else {
            this.node.getChildByName(`btnOpen`).active = false
            this.node.getChildByName(`btnIn`).active = true
            this.node.getChildByName(`btnOut`).active = true

            this.node.getChildByName(`btnDetail`).active = true
            this.node.getChildByName(`btnUp`).active = false
        }

        if (DataManager.curMineDetailData.state == 1) {
            this.node.getChildByName(`btnFight`).active = true
        } else {
            this.node.getChildByName(`btnFight`).active = false
        }

    }

    onDetailHandler() {
        console.log(`------查看战场--------`)
        // console.log(JSON.stringify(this._data))
        ViewManager.instance.hideWnd(DataManager.curWndPath)

        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_COMPYARMY, ...[this._data])
        // MyProtocols.send_C2SMineEviDetail(DataManager._loginSocket, this._data.page, this._data.idx, this._data.country)
    }

    doFightHandler() {
        console.log('curMineDetailData:' + JSON.stringify(DataManager.curMineDetailData))
        DataManager.fightType = 4

        let myHeroData
        let cardid = DataManager.curMineDetailData.formation.a
        console.log('cardid:' + cardid)
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (DataManager.cardsList[i].id == cardid) {
                myHeroData = DataManager.cardsList[i]
            }
        }

        let mySoliders = []


        let myData = {
            heroData: myHeroData,
            soliderList: []
        }

        if (!myHeroData) {
            ViewManager.instance.showToast(`请选择领队将领`)
            return
        }

        for (let i = 0; i < DataManager.curMineDetailData.soliderUse.length; i++) {
            if (DataManager.curMineDetailData.soliderUse[i].arm != 0) {
                mySoliders.push(DataManager.curMineDetailData.soliderUse[i])
            }
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

        // for (let i = 0; i < retObj.cards.length; i++) {
        //     workKeyList.push(retObj.cards[i].id)
        // }

        // console.log('DataManager.cardsList:', JSON.stringify(DataManager.cardsList))

        let soliderData = []
        let soliders = DataManager.mineData[this._data.group].soliders
        // let soliders = DataManager.curMineDetailData.att_soliderUsed

        for (let i = 0; i < soliders.length; i++) {
            if (soliders[i].arm != 0) {
                soliderData.push({
                    arm: soliders[i].arm,
                    count: soliders[i].count,
                    fight: 0,
                    defense: 0
                })
            }
        }
        if (soliders.length == 0) {
            soliderData.push({
                arm: 1,
                count: 100,
                fight: 0,
                defense: 0
            })
        }

        let otherData =
        {
            heroData: null,
            soliderList: soliderData
        }

        console.log(`this.myHeroData:` + JSON.stringify(myHeroData))
        MyProtocols.send_C2SEviGate(DataManager._loginSocket, this._data.page, this._data.idx, this._data.country, 1)

        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_BATTLE, ...[myData, otherData, this._data])

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onSetHandler() {
        console.log(`我的驻扎`)
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUT, ...[this._data])
    }

    onOpenHandler() {
        this.node.getChildByName(`openPanel`).active = true
        this.node.getChildByName(`openPanel`).getComponent(openEviPanel).init(this._data)

    }

    onCloseOpHandler() {
        this.node.getChildByName(`openPanel`).active = false
    }

    onOpenEviHandler() {
        MyProtocols.send_C2SEviGate(DataManager._loginSocket, this._data.page, this._data.idx, this._data.country)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CEviGate, this.S2CEviGate, this)

    }

    S2CEviGate(data) {
        console.log(`开启恶魔之门返回` + JSON.stringify(JSON.stringify(data)))
        DataManager.curMineDetailData.state = data.state
        // this.init(this._data)
        this.node.getChildByName(`btnOpen`).active = false
        this.node.getChildByName(`btnIn`).active = true
        this.node.getChildByName(`btnOut`).active = true
        this.node.getChildByName(`openPanel`).active = false



        this.node.getChildByName(`btnOpen`).active = DataManager.curMineDetailData.state == 0
        if (DataManager.curMineDetailData.state == 0) {
            this.node.getChildByName(`btnOpen`).active = true
            this.node.getChildByName(`btnIn`).active = false
            this.node.getChildByName(`btnOut`).active = false

            this.node.getChildByName(`btnDetail`).active = false
            this.node.getChildByName(`btnUp`).active = true


        } else if (DataManager.curMineDetailData.state == 2) {
            this.node.getChildByName(`btnOpen`).active = false
            this.node.getChildByName(`btnIn`).active = false
            this.node.getChildByName(`btnOut`).active = false

            this.node.getChildByName(`btnDetail`).active = true
            this.node.getChildByName(`btnUp`).active = false
        } else {
            this.node.getChildByName(`btnOpen`).active = false
            this.node.getChildByName(`btnIn`).active = true
            this.node.getChildByName(`btnOut`).active = true

            this.node.getChildByName(`btnDetail`).active = true
            this.node.getChildByName(`btnUp`).active = false
        }

        if (DataManager.curMineDetailData.state == 1) {
            this.node.getChildByName(`btnFight`).active = true
        } else {
            this.node.getChildByName(`btnFight`).active = false
        }


    }

    /**调兵驻防 */
    ondispatchArmyHandler() {
        console.log(`------调兵驻防--------`)
        let _from = DataManager.curWndPath
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUTDISPATCH, ...[this._data, 'in', null, _from])
    }

    /**撤回主城 */
    onRevokeHandler() {
        console.log(`------撤回主城--------`)
        let _from = DataManager.curWndPath
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUTDISPATCH, ...[this._data, 'out', null, _from])
    }


    // update (dt) {}
}
