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

    init(data) {
        this._data = data
        let name = DataManager.mineData[data.hold_player.group].name
        this.nameLabel.string = data.hold_player.lv + '级' + name
        this.lordLabel.string = `领主：${data.hold_player.nickname}`
        // this.posLabel.string = `(${data.x},${data.y})`  //`(${data.x,data.y})`
        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)
        this.titleLabel.string = DataManager.mineData[data.hold_player.group].name

        // : function (senderSocket, p_level_index, p_point_index) {
        // MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket,)

        // if(data.hold_player.id){
        //     ResManager.loadItemIcon(`goBattle/icon1`,this.icon)
        // }else{
        //     ResManager.loadItemIcon(`goBattle/icon0`,this.icon)
        // }
        NetEventDispatcher.addListener(NetEvent.S2CEviGate, this.S2CEviGate, this)
        this.node.getChildByName(`btnOpen`).active = DataManager.curMineDetailData.state == 0
        if (DataManager.curMineDetailData.state == 0) {
            this.node.getChildByName(`btnOpen`).active = true
            this.node.getChildByName(`btnIn`).active = false
            this.node.getChildByName(`btnOut`).active = false
        } else {
            this.node.getChildByName(`btnOpen`).active = false
            this.node.getChildByName(`btnIn`).active = true
            this.node.getChildByName(`btnOut`).active = true
        }

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
    }

    onCloseOpHandler() {
        this.node.getChildByName(`openPanel`).active = false
    }

    onOpenEviHandler() {
        MyProtocols.send_C2SEviGate(DataManager._loginSocket, this._data.hold_player.page, this._data.hold_player.idx, this._data.hold_player.country)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CEviGate, this.S2CEviGate, this)

    }

    S2CEviGate(data) {
        console.log(JSON.stringify(`开启恶魔之门返回` + JSON.stringify(data)))
        DataManager.curMineDetailData.state = data.state

        this.node.getChildByName(`btnOpen`).active = false
        this.node.getChildByName(`btnIn`).active = true
        this.node.getChildByName(`btnOut`).active = true

    }

    /**调兵驻防 */
    ondispatchArmyHandler() {
        console.log(`------调兵驻防--------`)
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUTDISPATCH, ...[this._data.hold_player, 'in'])
    }

    /**撤回主城 */
    onRevokeHandler() {
        console.log(`------撤回主城--------`)
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUTDISPATCH, ...[this._data.hold_player, 'out'])
    }


    // update (dt) {}
}
