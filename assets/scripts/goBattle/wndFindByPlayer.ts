// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.EditBox, displayName: '账户' })
    editAccount: cc.EditBox = null;

    strAccount
    // onLoad () {}

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CFindMines, this.S2CFindMines.bind(this))
    }

    S2CFindMines(retObj) {
        console.log(`查找玩家矿返回：` + JSON.stringify(retObj))
        // retObj.mine_points
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FINDBACK, ...[retObj.mine_points])
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
        MyProtocols.send_C2SFindMines(DataManager._loginSocket, 110, DataManager.pageGoBattle.nation_id, this.strAccount, 0)

    }


    // update (dt) {}
}
