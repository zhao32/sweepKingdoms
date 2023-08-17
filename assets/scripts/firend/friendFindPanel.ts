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

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.EditBox, displayName: '玩家id' })
    editID: cc.EditBox = null;

    @property({ type: cc.EditBox, displayName: '玩家昵称' })
    editName: cc.EditBox = null;

    @property({ type: cc.Toggle, displayName: '性别不限' })
    toggle1: cc.Toggle = null;

    @property({ type: cc.Toggle, displayName: '男' })
    toggle2: cc.Toggle = null;

    @property({ type: cc.Toggle, displayName: '女' })
    toggle3: cc.Toggle = null;

    playID: string = "0"

    playName: string = "0"

    sex: string = `-1`

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.editID.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.playID = editBox.textLabel.string
        }, this)

        this.editName.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.playName = editBox.textLabel.string
        }, this)

        this.toggle1.node.on(`toggle`, (target: cc.Toggle) => {
            if (target.isChecked) {
                this.sex = "-1"
            }
        }, this)

        this.toggle2.node.on(`toggle`, (target: cc.Toggle) => {
            if (target.isChecked) {
                this.sex = "0"
            }
        }, this)

        this.toggle3.node.on(`toggle`, (target: cc.Toggle) => {
            if (target.isChecked) {
                this.sex = "1"
            }
        }, this)
    }

    open() {
        this.node.active = true
        this.toggle1.isChecked = true
        this.editID.textLabel.string = ``
        this.editName.textLabel.string = ``

        this.playID = "0"

        this.playName = "0"
    
        this.sex = `-1`
    }


    onCloseHandler() {
        // ViewManager.instance.hideWnd(DataManager.curWndPath,true)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FIREND_ADD)
        this.node.active = false
    }

    onSearchHandler() {
        MyProtocols.send_C2SFriendsSearch(DataManager._loginSocket, this.playID, this.playName, this.sex, DataManager.playData.nation_id)
        this.node.active = false
    }

    onClose() {

    }

    // update (dt) {}
}
