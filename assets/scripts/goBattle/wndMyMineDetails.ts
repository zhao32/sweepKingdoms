// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GetRewardPanel from "../mail/GetRewardPanel";
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
    generalLabel: cc.Label = null;


    @property(cc.Label)
    troopsLabel: cc.Label = null;

    @property(cc.Label)
    awardLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property({ type: cc.Prefab })
    getRewardPanel_prefab: cc.Prefab = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    _data

    _detailData

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

    /**列表数据 阵容详情数据*/
    init(data = this._data) {
        this._data = data
        // this._detailData = DataManager.curMineDetailData
        console.log('this._data:' + JSON.stringify(this._data))
        // let name = DataManager.mineData[data.group].name
        let name = DataManager.getName(data)
        // if (data.lv == 0) {
        //     this.nameLabel.string = `未建造建筑`
        // } else {
        //     this.nameLabel.string = data.lv + '级' + name
        // }

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

        if (!data.lv) {
            this.nameLabel.string = data.lv + '级' + name
        }

        this.lordLabel.string = `领主：${data.nickname}`
        this.awardLabel.string = `已产出：${DataManager.curMineDetailData.gains}`
        this.troopsLabel.string = `兵力：${data.fight}`
        this.posLabel.string = `坐标：` + DataManager.countyList[data.country] + `国 (${data.page + 1},${data.idx + 1})`


        if (DataManager.curMineDetailData.formation.a == 0) {
            this.generalLabel.string = `守将：无`
        } else {
            for (let i = 0; i < DataManager.cardsList.length; i++) {
                if (DataManager.cardsList[i].id == DataManager.curMineDetailData.formation.a) {
                    let general = DataManager.GameData.Cards[DataManager.cardsList[i].template_id]
                    if (general) {
                        this.generalLabel.string = `守将：${general.name}`
                    } else {
                        this.generalLabel.string = `守将：无`
                    }
                }
            }
        }

        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)

        NetEventDispatcher.addListener(NetEvent.S2CMineGetAward, this.S2CMineGetAward, this)

        NetEventDispatcher.addListener(NetEvent.S2CMineConstructionUp, this.S2CMineConstructionUp, this)

        if (data.bulidLv == 0) {
            this.node.getChildByName('btnBulid').active = true
            this.node.getChildByName('btnUpLevel').active = false
            this.node.getChildByName('btnRecruit').getComponent(cc.Button).interactable = false

        } else {
            this.node.getChildByName('btnBulid').active = false
            this.node.getChildByName('btnUpLevel').active = true
            this.node.getChildByName('btnRecruit').getComponent(cc.Button).interactable = true
        }

        // this.posLabel.string = `(${data.x},${data.y})`  //`(${data.x,data.y})`

        // : function (senderSocket, p_level_index, p_point_index) {
        // MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket,)

        // if(data.id){
        //     ResManager.loadItemIcon(`goBattle/icon1`,this.icon)
        // }else{
        //     ResManager.loadItemIcon(`goBattle/icon0`,this.icon)
        // }
    }

    S2CMineGetAward(retObj) {
        console.log(`领奖返回`)
        console.log(JSON.stringify(retObj))
        DataManager.curMineDetailData.gains = 0
        this.awardLabel.string = `已产出：${DataManager.curMineDetailData.gains}`


        if (retObj.gain.length > 0) {
            var rewardPanel = cc.instantiate(this.getRewardPanel_prefab);
            cc.Canvas.instance.node.addChild(rewardPanel);
            rewardPanel.getComponent(GetRewardPanel)._itemlist = retObj.gain
        } else {
            ViewManager.instance.showToast(`成功领取奖励`)
        }
    }

    /**升级返回 */
    S2CMineConstructionUp(data) {
        console.log(`升级建造返回`)
        console.log(JSON.stringify(data))
        this._data.bulidLv = data.lv
        if (data.lv == 1) {
            ViewManager.instance.showToast(`建筑建造成功`)
            this.node.getChildByName('btnBulid').active = false
            this.node.getChildByName('btnUpLevel').active = true
            this.node.getChildByName('btnRecruit').getComponent(cc.Button).interactable = true
        } else {
            ViewManager.instance.showToast(`建筑升级成功`)
        }

        let name = DataManager.mineData[this._data.group].name
        // this.nameLabel.string = this._data.lv + '级' + name

        if (this._data.group >= 101) {
            this.nameLabel.string = name
        } else {
            if (this._data.bulidLv == 0) {
                this.nameLabel.string = `未建造` + this._data.lv + '级' + name
            } else {
                let lvList = ["微型", "小型", "中型", "大型", "巨型"]
                this.nameLabel.string = this._data.lv + "级  " + lvList[this._data.bulidLv - 1] + name
            }
        }

    }

    onCloseHandler() {
        MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this._data.page, this._data.country)
        ViewManager.instance.hideWnd(DataManager.curWndPath)
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
    /**查看详情 */
    onDetailHutHandler() {
        console.log(`------查看详情--------`)
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUT, ...[this._data, this._detailData])
    }

    onHarvestHandler() {
        console.log(`---------收获----------`)
        console.log(`this._data:` + JSON.stringify(this._data))
        MyProtocols.send_C2SMineGetAward(DataManager._loginSocket, this._data.page, this._data.idx, this._data.country)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CMineGetAward, this.S2CMineGetAward, this)
        NetEventDispatcher.removeListener(NetEvent.S2CMineConstructionUp, this.S2CMineConstructionUp, this)
    }

    onBulidORUpHandler() {
        console.log(`this._data:` + JSON.stringify(this._data))
        MyProtocols.send_C2SMineConstructionUp(DataManager._loginSocket, this._data.page, this._data.idx, this._data.country, this._data.bulidLv)
    }

    // update (dt) {}
}
