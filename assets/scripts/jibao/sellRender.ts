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

    data

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this.data = data
        let keyEquip = Object.keys(DataManager.GameData.Equips)


        let itemData
        if (keyEquip.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.Equips[data.template_id]
        }

        let keySkillatList = Object.keys(DataManager.GameData.SkillStudy)
        if (keySkillatList.indexOf(String(data.template_id)) != -1) {
            itemData = DataManager.GameData.SkillStudy[data.template_id]
        }

        if (itemData) {
            this.nameLabel.string = itemData.name + `x${data.num}`
        }
    }

    doSellHandler() {
        DataManager.wndJB.showSellPanel(this.data)

    }

    // update (dt) {}
}
