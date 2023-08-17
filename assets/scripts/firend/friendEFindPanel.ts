// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.EditBox, displayName: '玩家id' })
    editID: cc.EditBox = null;
    // LIFE-CYCLE CALLBACKS:

    playID

    // onLoad () {}

    start() {
        this.editID.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.playID = editBox.textLabel.string
        }, this)

    }

    open() {
        this.node.active = true
        this.playID = null
        this.editID.string  = ``
    }

    onCloseHandler() {
        this.node.active = false

    }

    onSearchHandler() {
        if (!this.playID) {
            ViewManager.instance.showToast(`请输入要添加的仇人ID`)
            return
        }
        console.log()
        MyProtocols.send_C2SBlackFriendAdd(DataManager._loginSocket, this.playID)
        this.node.active = false


    }

    onClose() {

    }

    // update (dt) {}
}
