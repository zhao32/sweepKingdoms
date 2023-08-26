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
        }, this)
    }

    init() {
        this._autoEnter = DataManager.familyDetail.autoEnter
        this.check.isChecked = DataManager.familyDetail.autoEnter == 1
        NetEventDispatcher.addListener(NetEvent.S2CCreaterFamily, this.S2CFamilyAutoEnterChange, this)
    }

    S2CFamilyAutoEnterChange(retObj) {
        console.log(`改变审核状态返回：` + JSON.stringify(retObj))
        DataManager.familyDetail.autoEnter = this._autoEnter = retObj.autoEnter
        this.check.isChecked = DataManager.familyDetail.autoEnter == 1
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CCreaterFamily, this.S2CFamilyAutoEnterChange, this)
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onSaveHandler() {
        // ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
        MyProtocols.send_C2SFamilyAutoEnterChange(DataManager._loginSocket, this._autoEnter)
    }

    // familyInvitePanel
    onInviteHandler() {
        this.node.getChildByName(`familyInvitePanel`).getComponent(familyInvitePanel).open()
    }

    // update (dt) {}
}
