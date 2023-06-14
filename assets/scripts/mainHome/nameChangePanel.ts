// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { getRandHeroName } from "../login/SelectRoleInfo";
import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import EventManager from "../utils/Manager/EventManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {
    @property({ type: cc.EditBox, displayName: '名字' })
    editBox: cc.EditBox = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    strName: string = ''

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CChangeName, this.S2CChangeName.bind(this))
    }

    S2CChangeName(data) {
        console.log(`修改名字返回`)
        ViewManager.instance.showToast(`更改名字成功`)
        console.log(JSON.stringify(data))
        // {"name":"不羁的白马贵族"}
        DataManager.playData.name = data.name

        EventManager.getInstance().sendListener(EventManager.UPDATE_MAINHOME_INFO)
        this.node.active = false
    }

    open() {
        this.strName = ''
        this.editBox.string = ''
        this.editBox.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.strName = editBox.textLabel.string
        }, this)
    }

    onCancel() {
        this.node.active = false
    }

    onChange() {
        if (!this.strName) {
            ViewManager.instance.showToast(`请选择名称`)
            return
        }
        MyProtocols.send_C2SChangeName(DataManager._loginSocket, this.strName)
    }


    selectNameHander() {
        let strName = getRandHeroName()
        this.editBox.string = strName
        this.strName = strName
    }

    // update (dt) {}
}
