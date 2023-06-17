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
    }

    S2CFindMines(retObj) {
        console.log(`查找玩家矿返回：` + JSON.stringify(retObj))

        let mineData = []
        for (let i = 0; i < retObj.mine_points.length; i++) {
            if (retObj.mine_points[i].hold_player) {
                mineData.push(retObj.mine_points[i])
            }
        }
        if (mineData.length == 0) {
            ViewManager.instance.showToast(`未查询到当前类型的矿场`)
            return
        }
        // retObj.mine_points
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FINDBACK, ...[mineData])
    }

    init() {

        this.editAccount.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.strAccount = editBox.string
            Logger.log(editBox.string)
        }, this)
        NetEventDispatcher.addListener(NetEvent.S2CFindMines, this.S2CFindMines.bind(this))

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

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFindMines, this.S2CFindMines.bind(this))

    }


    // update (dt) {}
}
