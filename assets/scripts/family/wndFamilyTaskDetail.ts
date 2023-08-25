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
    labelTaskName: cc.Label = null;

    @property(cc.Label)
    labelTaskCont: cc.Label = null;

    @property(cc.Label)
    labelTaskAward: cc.Label = null;

    @property(cc.Label)
    labelCoin: cc.Label = null;

    @property(cc.Label)
    labelFood: cc.Label = null;

    @property({ type: cc.Label, displayName: '声望' })
    labelReputation: cc.Label = null;


    @property({ type: cc.Label, displayName: '贡献值' })
    labelContribute: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onClose() {

    }

    // update (dt) {}
}
