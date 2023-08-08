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

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.EditBox, displayName: '数量' })
    editNum: cc.EditBox = null;

    @property({ type: cc.EditBox, displayName: '单价' })
    editPrice: cc.EditBox = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    num

    price

    data

    // onLoad () {}

    start() {

    }

    init(data) {
        this.node.active = true

        let keyEquip = Object.keys(DataManager.GameData.Equips)

        let itemData
        if (keyEquip.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.Equips[data.template_id]
        }
        if (itemData) {
            this.nameLabel.string = itemData.name + `x${data.num}`
        }

        this.data = data
        this.editNum.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.num = parseInt(editBox.textLabel.string)
        }, this)

        this.editPrice.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.price = parseInt(editBox.textLabel.string)
        }, this)

        this.editNum.string = ''
        this.editPrice.string = ''
        this.num = 0
        this.price = 0

    }

    onSellHandler() {
        if (!this.num) {
            ViewManager.instance.showToast(`请输入卖出数量`)
            return
        }

        if (!this.price) {
            ViewManager.instance.showToast(`请输入单价`)
            return
        }

        if (this.num > this.data.num) {
            ViewManager.instance.showToast(`卖出数量不可大于拥有数量`)
            return
        }


        MyProtocols.send_C2SBussizeSave(DataManager._loginSocket, this.data.uuid, this.data.template_id, this.num, this.price)
    }

    onCloseHandler() {
        this.node.active = false

    }

    // update (dt) {}
}
