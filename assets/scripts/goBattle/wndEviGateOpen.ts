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
        if (state == 2) {
            this.node.getChildByName('btnDefine').getComponent(cc.Button).interactable = false
            this.node.getChildByName('btnAtt').getComponent(cc.Button).interactable = false
        } else {
            if (data.hold_player.country == DataManager.playData.nation_id) {
                this.node.getChildByName('btnDefine').getComponent(cc.Button).interactable = true
                this.node.getChildByName('btnAtt').getComponent(cc.Button).interactable = false
            } else {
                this.node.getChildByName('btnDefine').getComponent(cc.Button).interactable = false
                this.node.getChildByName('btnAtt').getComponent(cc.Button).interactable = true
            }
        }

        this.titleLabel.string = DataManager.mineData[data.hold_player.group].name


        this._data = data
        // let name = DataManager.mineData[data.hold_player.group].name
        // this.nameLabel.string = data.hold_player.lv + '级' + name
        this.lordLabel.string = data.hold_player.nickname ? `领主：${data.hold_player.nickname}` : `领主：无`
        // this.awardLabel.string = `已产出：${data.hold_player.award}`

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

    onClose() {
        // NetEventDispatcher.removeListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)

    }

    // update (dt) {}
}
