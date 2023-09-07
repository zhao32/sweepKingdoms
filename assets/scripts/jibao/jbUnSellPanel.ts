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
        this.node.active = true
        this.data = data
        let itemData

        let keyItem = Object.keys(DataManager.GameData.Items)
        if (keyItem.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.Items[data.template_id]
        }

        let keyRune = Object.keys(DataManager.GameData.Runes)
        if (keyRune.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.Runes[data.template_id]
        }

        let keyEquip = Object.keys(DataManager.GameData.Equips)

        if (keyEquip.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.Equips[data.template_id]
        }

        let keySkillatList = Object.keys(DataManager.GameData.SkillStudy)
        if (keySkillatList.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.SkillStudy[data.template_id]
        }
        let keyFlagList = Object.keys(DataManager.GameData.CardFrags)
        if (keyFlagList.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.CardFrags[data.template_id]
            // ResManager.loadItemIcon(`hero/icon/${itemData.name.slice(0, -2)}`, this.sprite.node)
            // ResManager.loadItemIcon(`hero/heroHeadBg${itemData.quality - 1}`, this.node)

            // ResManager.loadItemIcon(`hero/debrisBg${fragData.quality - 1}`, this.node)
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
        console.log(`this.data.id:` + this.data.id + '  ' + "this.data.template_id:" + this.data.template_id + "   " + "this.data.num:" + this.data.num)
        MyProtocols.send_C2SBussizeOff(DataManager._loginSocket, this.data.id, this.data.template_id, this.data.num)

    }

    onCloseHandler() {
        this.node.active = false

    }


    // update (dt) {}
}
