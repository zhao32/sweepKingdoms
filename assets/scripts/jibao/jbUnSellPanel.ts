// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const {ccclass, property} = cc._decorator;

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

    start () {

    }

    init(data){ 

        this.data = data
        let keyEquip = Object.keys(DataManager.GameData.Equips)

        let itemData
        if (keyEquip.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.Equips[data.template_id]
        }

        if (itemData) {
            this.descLabel.string = `你是否要下架 ${itemData.name} x${data.num}` 
        }

    }

    onUnSellHandler() {

        // retObj.bussize_item[i].itemid = myDecoder.readInt();
        // retObj.bussize_item[i].template_id = myDecoder.readInt();
        // retObj.bussize_item[i].num = myDecoder.readInt();
        // retObj.bussize_item[i].playerid = myDecoder.readInt();
        MyProtocols.send_C2SBussizeOff(DataManager._loginSocket, this.data.itemid, this.data.template_id, this.data.num)

    }

    onCloseHandler() {
        this.node.active = false

    }


    // update (dt) {}
}
