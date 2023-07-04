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
    awardLabel: cc.Label = null;




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
        this.awardLabel.string = `已产出：${data.hold_player.award}`

        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)

        NetEventDispatcher.addListener(NetEvent.S2CMineGetAward, this.S2CMineGetAward, this)

        NetEventDispatcher.addListener(NetEvent.S2CMineConstructionUp, this.S2CMineConstructionUp, this)

        if (data.hold_player.lv == 0) {
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

        // if(data.hold_player.id){
        //     ResManager.loadItemIcon(`goBattle/icon1`,this.icon)
        // }else{
        //     ResManager.loadItemIcon(`goBattle/icon0`,this.icon)
        // }
    }

    S2CMineGetAward(data) {
        console.log(`领奖返回`)
        console.log(JSON.stringify(data))
    }

    /**升级返回 */
    S2CMineConstructionUp(data) {
        console.log(`升级建造返回`)
        console.log(JSON.stringify(data))
        this._data.hold_player.lv = data.lv
        
        let name = DataManager.mineData[this._data.hold_player.group].name
        this.nameLabel.string = this._data.hold_player.lv + '级' + name

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
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
    /**查看详情 */
    onDetailHutHandler() {
        console.log(`------查看详情--------`)
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUT, ...[this._data.hold_player])
    }

    onHarvestHandler() {
        console.log(`---------收获----------`)
        MyProtocols.send_C2SMineGetAward(DataManager._loginSocket, this._data.page, this._data.idx, this._data.country)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CMineGetAward, this.S2CMineGetAward, this)
        NetEventDispatcher.removeListener(NetEvent.S2CMineConstructionUp, this.S2CMineConstructionUp, this)
    }

    onBulidORUpHandler() {
        console.log(`this._data:`+JSON.stringify(this._data))
        MyProtocols.send_C2SMineConstructionUp(DataManager._loginSocket, this._data.hold_player.page, this._data.hold_player.idx, this._data.hold_player.country, this._data.hold_player.lv)
    }

    // update (dt) {}
}
