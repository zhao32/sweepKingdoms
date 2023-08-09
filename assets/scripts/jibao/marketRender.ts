// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    ownerLabel: cc.Label = null;

    @property(cc.Label)
    priceLabel: cc.Label = null;

    @property(cc.Label)
    priceAllLabel: cc.Label = null;

    data
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        // retObj.bussize_item[i].itemid = myDecoder.readInt();
        // retObj.bussize_item[i].template_id = myDecoder.readInt();
        // retObj.bussize_item[i].num = myDecoder.readInt();
        // retObj.bussize_item[i].playerid = myDecoder.readInt();

        this.data = data
        this.ownerLabel.string = `拥有者：${data.playerid}`

        let keyEquip = Object.keys(DataManager.GameData.Equips)

        let itemData
        if (keyEquip.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.Equips[data.template_id]
        }

        if (itemData) {
            this.nameLabel.string = itemData.name + `x${data.num}`
        }

        this.priceLabel.string = `单价：x${data.price}`
        this.priceAllLabel.string = `总价：x${data.price * data.num}`
    }

    doBuyHandler() {
        DataManager.wndJB.showBuyPanel(this.data)
    }

    // update (dt) {}
}
