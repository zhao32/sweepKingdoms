// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

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

    init() {

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_FAMILY_DETAIL, true)
    }

    onMemberHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_MEMBER)
    }

    onLogHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_LOG)
    }

    onMangerHanlder() {
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
