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
    labelFLV: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    @property({ type: cc.EditBox, displayName: '宗旨' })
    editBox1: cc.EditBox = null;

    @property({ type: cc.EditBox, displayName: '公告' })
    editBox2: cc.EditBox = null;

    // onLoad () {}

    start() {
        this.editBox1.node.on('editing-did-ended', (editBox: cc.EditBox) => {
        }, this)

        this.editBox2.node.on('editing-did-ended', (editBox: cc.EditBox) => {
        }, this)
    }


    init() {

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)

    }

    onSaveHandler() {

    }

    onClose() {

    }

    // update (dt) {}
}
