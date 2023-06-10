// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.EditBox, displayName: '账户' })
    editAccount: cc.EditBox = null;

    strAccount
    // onLoad () {}

    start() {

    }

    init() {

        this.editAccount.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.strAccount = editBox.string
            Logger.log(editBox.string)
        }, this)
    }


    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onFindHandler(){ 
        console.log('-----查找----' + this.strAccount)
        if(!this.strAccount){ 
            ViewManager.instance.showToast('请输入查找账号')
            return
        }
    }


    // update (dt) {}
}
