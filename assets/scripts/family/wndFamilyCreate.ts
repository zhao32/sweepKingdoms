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

    @property(cc.EditBox)
    editName: cc.EditBox = null;

    familyName: string

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {
        this.editName.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.familyName = editBox.textLabel.string
        }, this)

        NetEventDispatcher.addListener(NetEvent.S2CCreaterFamily, this.S2CCreaterFamily, this)
    

    }

    S2CCreaterFamily(retObj){
        console.log(`创建家族返回` + JSON.stringify(retObj)) 
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onSureHandler() {
        if (!this.familyName) {
            ViewManager.instance.showToast(`请输入家族名称`)
            return
        }
        MyProtocols.send_C2SCreaterFamily(DataManager._loginSocket, this.familyName)
    }

    onChanelHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILYS)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CCreaterFamily, this.S2CCreaterFamily, this)

    }





    // update (dt) {}
}
