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
        this.editBox1.string = DataManager.familyDetail.aim
        this.editBox2.string = DataManager.familyDetail.notice
        this.labelFBoss.string = `族长：${DataManager.familyDetail.familyChiefName}`
        this.labelFLV.string = `LV:${DataManager.familyDetail.familyLv}`
        this.labelFName.string = `家族名称：${DataManager.familyDetail.familyName}`
        this.labelFID.string = `家族ID：${DataManager.familyDetail.familyID}`
        NetEventDispatcher.addListener(NetEvent.S2CFamilyNoticeChange, this.S2CFamilyNoticeChange, this)
        NetEventDispatcher.addListener(NetEvent.S2CFamilyAimChange, this.S2CFamilyAimChange, this)
    }

    S2CFamilyNoticeChange(retObj){
        console.log(`修改公告返回：` + JSON.stringify(retObj))
        ViewManager.instance.showToast(`家族公告修改成功`)
        DataManager.familyDetail.notice = retObj.familyNotice
        this.editBox1.string = DataManager.familyDetail.notice
    }

    S2CFamilyAimChange(retObj){
        console.log(`修改主旨返回：` + JSON.stringify(retObj))
        ViewManager.instance.showToast(`家族主旨修改成功`)
        DataManager.familyDetail.aim = retObj.aim
        this.editBox2.string = DataManager.familyDetail.aim

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)

    }

    onSaveHandler() {
        if (!this.aimStr && !this.noticeStr) {
            ViewManager.instance.showToast(`请输入家族宗旨或家族提示`)
            return
        }

        if (this.noticeStr) {
            MyProtocols.send_C2SFamilyNoticeChange(DataManager._loginSocket, this.noticeStr)
        }

        if (this.aimStr) {
            MyProtocols.send_C2SFamilyAimChange(DataManager._loginSocket, this.aimStr)
        }
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyNoticeChange, this.S2CFamilyNoticeChange, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyAimChange, this.S2CFamilyAimChange, this)
    }

    // update (dt) {}
}
