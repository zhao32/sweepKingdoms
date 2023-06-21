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

    init(data, state) {
        console.log('filedData:' + JSON.stringify(data))
        this._data = data
        this.nameLabel.string = data.hold_player.lv + '级' + data.hold_player.nickname
        // this.posLabel.string = `(${data.x},${data.y})`  //`(${data.x,data.y})`

        this.node.getChildByName('btnAtt').active = (state == 0) ? false : true
        NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)
    }

    S2CMineEnemyDetail(retObj) {



        if (retObj.state == 0) {
            this.node.getChildByName('btnAtt').active = false
        } else if (retObj.state == 1) {
            this.node.getChildByName('btnAtt').active = true
        } else if (retObj.state == 2) {
            ViewManager.instance.hideWnd(DataManager.curWndPath)
            if (DataManager.playData.account_id == retObj.att_base_info.id) {
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
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, [defineData, this._data])

            } else if (DataManager.playData.account_id == retObj.base_info.id) {
                let soliderData = []
                for (let i = 0; i < retObj.att_soliderUsed.length; i++) {
                    if (retObj.att_soliderUsed[i].arm != 0) {
                        soliderData.push({
                            arm: retObj.att_soliderUsed[i].arm,
                            count: retObj.att_soliderUsed[i].count,
                            fight: 0,
                            defense: 0
                        })
                    }
                }
                let attData =
                {
                    cardId: retObj.att_formation.a,
                    soliders: soliderData
                }
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, [attData, this._data])
            } 

        }else if (retObj.state == 3) {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this._data, retObj.state])
        }
        
        // else {
        //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this._data, retObj.state])
        // }

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }

    onBattleHandler() {
        // MyProtocols.send_C2SMineBattleCalculate(DataManager._loginSocket, this._data.x, this._data.y, true, 10)
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        let defineData =
        {
            cardId: 0,
            soliders: [
                {
                    arm: 1,
                    count: 1000,
                    fight: 0,
                    defense: 0
                }
            ]
        }
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, ...[defineData, this._data])
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)

    }
    // update (dt) {}
}
