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
    labelFName: cc.Label = null;

    @property(cc.Label)
    labelFID: cc.Label = null;

    @property(cc.Label)
    labelFBoss: cc.Label = null;

    @property(cc.Label)
    labelFExp: cc.Label = null;

    @property(cc.Label)
    labelFLv: cc.Label = null;

    @property(cc.Label)
    labelFKillNum: cc.Label = null;

    @property(cc.Label)
    labelFFight: cc.Label = null;

    @property({ type: cc.Label, displayName: "贡献值" })
    labelContribute: cc.Label = null;

    @property({ type: cc.Label, displayName: "声望" })
    labelReputation: cc.Label = null;

    @property({ type: cc.Label, displayName: "家族宗旨" })
    labelPurpose: cc.Label = null;

    @property({ type: cc.Label, displayName: "家族公告" })
    labelNotice: cc.Label = null;



    @property(cc.Node)
    icon: cc.Node = null;


    // onLoad () {}

    start() {

    }
    // {"familyID":12,"familyName":"aa","familyIcon":0,"familyNum":0,"familyLv":1,"familyExp":2,"familyKill":3,"familyFight":4,"contribution":5,"reputation":6,"aim":"家族说明","notice":"家族宗旨"}
    init() {
        this.labelContribute.string = `贡献值：` + DataManager.familyDetail.contribution
        this.labelFBoss
        // this.labelFExp.string = 
        this.labelFFight.string = `家族战力：` + DataManager.familyDetail.familyFight
        this.labelFID.string = `家族ID：` + DataManager.familyDetail.familyID
        this.labelFKillNum.string = `昨日家族击杀：` + DataManager.familyDetail.familyKill
        this.labelFLv.string = `家族等级：` + DataManager.familyDetail.familyLv
        this.labelFName.string = `家族名称：` + DataManager.familyDetail.familyName
        this.labelNotice.string = DataManager.familyDetail.notice
        this.labelPurpose.string = DataManager.familyDetail.aim//家族宗旨：
        this.labelReputation.string = `家族声望：` + DataManager.familyDetail.reputation

        if (DataManager.playData.account_id == DataManager.familyDetail.familyChiefID) {//我是族长
            this.node.getChildByName(`mangerNode`).active = true
        } else {
            this.node.getChildByName(`mangerNode`).active = false
        }

        NetEventDispatcher.addListener(NetEvent.S2CFamilyLog, this.S2CFamilyLog, this)
        NetEventDispatcher.addListener(NetEvent.S2CFamilyMember, this.S2CFamilyMember, this)

        
    }

    S2CFamilyLog(retObj) {
        console.log(`家族日志：` + JSON.stringify(retObj))
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_LOG)
    }
    S2CFamilyMember(retObj) {
        console.log(`成员列表` + JSON.stringify(retObj))
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_MEMBER)
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_FAMILY_DETAIL, true)
    }

    onMemberHandler() {
        MyProtocols.send_C2SFamilyMember(DataManager._loginSocket)
        // ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_MEMBER)
    }

    onLogHandler() {
        MyProtocols.send_C2SFamilyLog(DataManager._loginSocket)
        // ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_LOG)
    }

    onMangerHanlder() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_OFFICE)
    }

    /**修改主旨 公告 */
    onModifyHanlder() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_OFFICE)
    }
    onChatHandler() {
        //  ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_MEMBER)
    }

    onTaskHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_TASK)
    }

    onMarketHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_MARKET)
    }

    onBarraksHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_BARRACKS)
    }

    onEffectHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_EFFECT)
    }

    onClose() {

    }

    // update (dt) {}
}
