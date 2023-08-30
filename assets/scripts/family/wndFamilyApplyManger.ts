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
import familyApplyRender from "./familyApplyRender";
import familyInvitePanel from "./familyInvitePanel";

const { ccclass, property } = cc._decorator;


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Toggle)
    check: cc.Toggle = null;

    @property(cc.Prefab)
    pfb: cc.Prefab = null;

    @property(cc.Node)
    contect: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    _autoEnter: number

    start() {
        this.check.node.on(`toggle`, (target: cc.Toggle) => {
            if (target.isChecked == true) {
                this._autoEnter = 1
            } else {
                this._autoEnter = 0
            }
            console.log(`this._autoEnter:` + this._autoEnter)
        }, this)
    }

    init() {
        MyProtocols.send_C2SExamineFamilyList(DataManager._loginSocket)
        this._autoEnter = DataManager.familyDetail.autoEnter
        this.check.isChecked = DataManager.familyDetail.autoEnter == 1
        NetEventDispatcher.addListener(NetEvent.S2CFamilyAutoEnterChange, this.S2CFamilyAutoEnterChange, this)
        NetEventDispatcher.addListener(NetEvent.S2CFamilyInviteJion, this.S2CFamilyInviteJion, this)
        NetEventDispatcher.addListener(NetEvent.S2CExamineEnterFamily, this.S2CExamineEnterFamily, this)
        NetEventDispatcher.addListener(NetEvent.S2CExamineFamilyList, this.S2CExamineFamilyList, this)
    }

    S2CExamineFamilyList(retObj) {
        console.log(`申请列表返回：` + JSON.stringify(retObj))
        this.contect.removeAllChildren()
        for (let i = 0; i < retObj.applys.length; i++) {
            let render = cc.instantiate(this.pfb)
            render.parent = this.contect
            render.getComponent(familyApplyRender).init(retObj.applys[i]) 
        }
    }

    S2CExamineEnterFamily(retObj) {
        console.log(`入会申请返回：` + JSON.stringify(retObj))
        if (retObj.agree == 0) {
            ViewManager.instance.showToast(`已拒绝玩家${retObj.playerId}的申请`)
        } else if (retObj.agree == 1) {
            ViewManager.instance.showToast(`已同意玩家${retObj.playerId}的入会申请`)
        }
        MyProtocols.send_C2SExamineFamilyList(DataManager._loginSocket)
    }

    S2CFamilyInviteJion(retObj) {
        console.log(`邀请玩家成功` + JSON.stringify(retObj))

    }

    S2CFamilyAutoEnterChange(retObj) {
        console.log(`改变审核状态返回：` + JSON.stringify(retObj))
        // 改变审核状态返回：{"autoEnter":1}
        ViewManager.instance.showToast(`修改审核状态成功`)
        DataManager.familyDetail.autoEnter = this._autoEnter = retObj.autoEnter
        this.check.isChecked = DataManager.familyDetail.autoEnter == 1
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyAutoEnterChange, this.S2CFamilyAutoEnterChange, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyInviteJion, this.S2CFamilyInviteJion, this)
        NetEventDispatcher.removeListener(NetEvent.S2CExamineEnterFamily, this.S2CExamineEnterFamily, this)
        NetEventDispatcher.removeListener(NetEvent.S2CExamineFamilyList, this.S2CExamineFamilyList, this)
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onSaveHandler() {
        // ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
        console.log(`--this._autoEnter:` + this._autoEnter)
        MyProtocols.send_C2SFamilyAutoEnterChange(DataManager._loginSocket, this._autoEnter)
    }

    // familyInvitePanel
    onInviteHandler() {
        this.node.getChildByName(`familyInvitePanel`).getComponent(familyInvitePanel).open()
    }

    // update (dt) {}
}
