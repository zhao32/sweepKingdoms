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
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

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

    init(data, state = DataManager.curMineDetailData.state) {
        console.log('filedData:' + JSON.stringify(data))
        this._data = data
        this.nameLabel.string = data.lv + '级' + data.nickname
        // this.posLabel.string = `(${data.x},${data.y})`  //`(${data.x,data.y})`

        // this.node.getChildByName('btnAtt').active = (state == 0) ? false : true


        // NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)
        // MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, this._data.page, this._data.idx, this._data.country)
        let name = DataManager.getName(data)
        this.initDetailData(DataManager.curMineDetailData)
        this.titleLabel.string = name//DataManager.mineData[data.group].name
        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)

    }

    initDetailData(retObj) {
        console.log(JSON.stringify(retObj))
        console.log(retObj.formation.a)
        // debugger
        if (retObj.state == 1 || retObj.state == 2) {
            this.node.getChildByName('btnAtt').active = false
        } else if (retObj.state == 0) {
            this.node.getChildByName('btnAtt').active = true
            ViewManager.instance.hideWnd(DataManager.curWndPath)
            let soliderData = []
            for (let i = 0; i < retObj.soliderUsed.length; i++) {
                if (retObj.soliderUsed[i].arm != 0) {
                    soliderData.push({
                        arm: retObj.soliderUsed[i].arm,
                        count: retObj.soliderUsed[i].count,
                        fight: 0,
                        defense: 0
                    })
                }
            }
            let defineData =
            {
                cardId: retObj.formation.a,
                soliders: soliderData
            }
            console.log('this._data:' + JSON.stringify(this._data))
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, ...[defineData, this._data, false])

        }


        // else if (retObj.state == 2) {
        //     ViewManager.instance.hideWnd(DataManager.curWndPath)
        //     if (DataManager.playData.account_id == retObj.att_base_info.id) {
        //         let soliderData = []
        //         for (let i = 0; i < retObj.soliderUsed.length; i++) {
        //             if (retObj.soliderUsed[i].arm != 0) {
        //                 soliderData.push({
        //                     arm: retObj.soliderUsed[i].arm,
        //                     count: retObj.soliderUsed[i].count,
        //                     fight: 0,
        //                     defense: 0
        //                 })
        //             }
        //         }
        //         let defineData =
        //         {
        //             cardId: retObj.formation.a,
        //             soliders: soliderData
        //         }
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, ...[defineData, this._data, true])

        //     } else if (DataManager.playData.account_id == retObj.base_info.id) {
        //         let soliderData = []
        //         for (let i = 0; i < retObj.att_soliderUsed.length; i++) {
        //             if (retObj.att_soliderUsed[i].arm != 0) {
        //                 soliderData.push({
        //                     arm: retObj.att_soliderUsed[i].arm,
        //                     count: retObj.att_soliderUsed[i].count,
        //                     fight: 0,
        //                     defense: 0
        //                 })
        //             }
        //         }
        //         let attData =
        //         {
        //             cardId: retObj.att_formation.a,
        //             soliders: soliderData
        //         }
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, ...[attData, this._data, true])
        //     }

        // } else if (retObj.state == 3) {
        //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this._data, retObj.state])
        // }

        // else {
        //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this._data, retObj.state])
        // }

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }

    onBattleHandler() {
        this.initDetailData(DataManager.curMineDetailData)
        // MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, this._data.page, this._data.idx, this._data.country)
        // ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        // let defineData =
        // {
        //     cardId: 0,
        //     soliders: [
        //         {
        //             arm: 1,
        //             count: 1000,
        //             fight: 0,
        //             defense: 0
        //         }
        //     ]
        // }
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, ...[defineData, this._data])
    }

    onClose() {
        // NetEventDispatcher.removeListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)

    }
    // update (dt) {}
}
