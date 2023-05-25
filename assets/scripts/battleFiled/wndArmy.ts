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

    @property(cc.Node)
    contect0: cc.Node = null;

    @property(cc.Node)
    contect1: cc.Node = null;

    @property(cc.Prefab)
    armPfb: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        for (let i = 0; i < 10; i++) {
            let arm = cc.instantiate(this.armPfb)
            arm.parent = this.contect0

        }

        for (let i = 0; i < 10; i++) {
            let arm = cc.instantiate(this.armPfb)
            arm.parent = this.contect1

        }
    }

    init() {


    }

    onClose() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLEFILED)
    }

    // update (dt) {}
}
