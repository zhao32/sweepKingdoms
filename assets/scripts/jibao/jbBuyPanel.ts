// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    descLabel: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    data

    start() {

    }

    init(data) {
        this.data = data
        this.node.active = true
        let keyEquip = Object.keys(DataManager.GameData.Equips)

        let itemData
        if (keyEquip.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.Equips[data.template_id]
        }

        if (itemData) {
            this.descLabel.string = `你是否愿意花费 ${data.price}元宝 购买${itemData.name} x${data.num}`
        }

    }

    onBuyHandler() {

        // retObj.bussize_item[i].itemid = myDecoder.readInt();
        // retObj.bussize_item[i].template_id = myDecoder.readInt();
        // retObj.bussize_item[i].num = myDecoder.readInt();
        // retObj.bussize_item[i].playerid = myDecoder.readInt();
        console.log(`this.data.id:` + this.data.id + '  ' + "this.data.template_id:" + this.data.template_id + "   " + "this.data.num:" + this.data.num + "   " + "this.data.price:" + this.data.price + `  playerid:` + this.data.playerid)
        MyProtocols.send_C2SBussizeBuy(DataManager._loginSocket, this.data.id, this.data.template_id, this.data.num, this.data.price, this.data.playerid)
    }

    onCloseHandler() {
        this.node.active = false

    }


    // update (dt) {}
}
