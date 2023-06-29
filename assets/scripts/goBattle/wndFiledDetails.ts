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


    @property
    text: string = 'hello';

    isClick: boolean = false

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    _data

    start() {

    }


    S2CMineEnemyDetail(retObj) {
        console.log(`DataManager.curWndPath:` + DataManager.curWndPath)
        if (this.isClick == false) return
        console.log(`------aa---准备攻打敌方 矿场-----------`)
        console.log(JSON.stringify(retObj))
        // {"level_index":0,"point_index":0,"base_info":{"id":0,"nickname":"","level":0,"icon":0,"head_frame_id":1,"fight":0,"cd_time":0},"formation":{"fid":0,"formationId":0,"forward":0,"flip":0,"a":0,"b":0,"c":0},"soliderUsed":[],"soliderUse":[{"arm":0,"count":1000},{"arm":1,"count":1000},{"arm":2,"count":1000}],"cards":[],"exclude_cards":[],"rand_key":2923001863557120}
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
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        let defineData =
        {
            cardId: retObj.formation.a,
            soliders: soliderData
        }
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, ...[defineData, this._data])

    }
    init(data) {
        console.log('filedData:' + JSON.stringify(data))
        this._data = data
        let name = DataManager.mineData[data.hold_player.group].name
        this.nameLabel.string = data.hold_player.lv + '级' + name
        this.lordLabel.string = data.hold_player.nickname ? `领主：${data.hold_player.nickname}` : `领主：无`
        this.awardLabel.string = `已产出：${data.hold_player.award}`

        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)
        NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onBattleHandler() {
        this.isClick = true
        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, this._data.hold_player.page, this._data.hold_player.idx, this._data.hold_player.country)
    }

    onClose() {
        console.log(`----------关闭窗口-----------`)
        this.isClick = false
        NetEventDispatcher.removeListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)
    }


    // update (dt) {}
}
