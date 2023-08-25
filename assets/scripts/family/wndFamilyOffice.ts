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

    aimStr: string

    noticeStr: string

    // onLoad () {}

    start() {
        this.editBox1.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.aimStr = editBox.string
        }, this)

        this.editBox2.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.noticeStr = editBox.string
        }, this)
    }


    init() {
        this.editBox1.string = this.aimStr = ``
        this.editBox2.string = this.noticeStr = ''

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)

    }

    onSaveHandler() {
        if (!this.aimStr && !this.noticeStr){
            ViewManager.instance.showToast(`请输入家族宗旨或家族提示`)
            return
        }



    }

    onClose() {

    }

    // update (dt) {}
}
