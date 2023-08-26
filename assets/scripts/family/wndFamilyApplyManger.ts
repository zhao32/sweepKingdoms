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

    @property(cc.Toggle)
    check: cc.Toggle = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    _autoEnter: boolean

    start() {
        this.check.node.on(`toggle`, (target: cc.Toggle) => {
            this._autoEnter = target.isChecked
        }, this)
    }

    init() {
        this.check.isChecked = DataManager.familyDetail.autoEnter
    }

    onClose() {

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onSaveHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    // update (dt) {}
}
