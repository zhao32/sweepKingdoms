// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.EditBox, displayName: '坐标X' })
    editPosX: cc.EditBox = null;

    @property({ type: cc.EditBox, displayName: '坐标Y' })
    editPosY: cc.EditBox = null;

    PosX: string = ''

    PosY: string = ''


    // onLoad () {}

    start() {
        this.editPosX.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.PosX = editBox.string;
            Logger.log(editBox.string)
        }, this)

        this.editPosY.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.PosY = editBox.string;
            Logger.log(editBox.string)
        }, this)
    }

    init() {

    }

    onFindHandler() {
        console.log('-----查找----' + this.PosX + '  ' + this.PosY)
        if (!this.PosX || !this.PosY) {
            ViewManager.instance.showToast('请输入完整的坐标')
            return
        }
        DataManager.pageGoBattle.selectIdx = parseInt(this.PosY)
        DataManager.pageGoBattle.curPageIdx = parseInt(this.PosX)

        MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.PosX, DataManager.pageGoBattle.nation_id)
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onClose() {

    }
    // update (dt) {}
}
