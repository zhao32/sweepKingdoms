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

    @property({ type: cc.Label, displayName: "贡献值" })
    labelContribute: cc.Label = null;

    @property({ type: cc.Label, displayName: "声望" })
    labelReputation: cc.Label = null;

    @property({ type: cc.Label, displayName: "金币" })
    labelCoin: cc.Label = null;

    @property({ type: cc.Label, displayName: "元宝" })
    labelGold: cc.Label = null;

    @property({ type: cc.Node})
    contect: cc.Node = null;

    @property({ type: cc.Prefab})
    pfb: cc.Prefab = null;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }


    init() {

    }

    onRefreshHandler1() {

    }

    onRefreshHandler2() {

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onClose() {

    }

    // update (dt) {}
}
