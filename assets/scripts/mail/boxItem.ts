// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    countLabel: cc.Label = null;

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property(cc.Node)
    light: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        if (data.cnt) {
            let itemData = DataManager.GameData.goods[data.itemId]
            this.countLabel.string = `x${data.cnt}`
            if (itemData) ResManager.loadItemIcon(`UI/items/${itemData.icon}`, this.sprite.node)
        } else if (data.num) {
            // {"template_id":10007,"bagId":3,"num":30}
            this.countLabel.string = `x${data.num}`

            let itemData
            /**礼包 */
            let keyGiftList = Object.keys(DataManager.GameData.Boxes)
            /**消耗品 */
            let keyConsList = Object.keys(DataManager.GameData.Consumes)

            let keyStoneList = Object.keys(DataManager.GameData.MineStone)

            let keyStudy = Object.keys(DataManager.GameData.SkillStudy)

            let keyBonus = Object.keys(DataManager.GameData.bonus)

            let keyItem = Object.keys(DataManager.GameData.Items)

            let keyCardFrag = Object.keys(DataManager.GameData.CardFrags)

            let keyRune = Object.keys(DataManager.GameData.Runes)



            let keyEquip = Object.keys(DataManager.GameData.Equips)

           let template_id =String(data.template_id) 
           
            if (keyGiftList.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.Boxes[template_id]
            }

            if (keyConsList.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.Consumes[template_id]
            }

            if (keyEquip.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.Equips[template_id]
            }

            if (keyStoneList.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.MineStone[template_id]
            }

            if (keyItem.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.Items[template_id]
            }

            if (itemData) {
                ResManager.loadItemIcon(`UI/prop/${itemData.name}`, this.sprite.node)
            }

            if (keyCardFrag.indexOf(template_id) != -1) {
                let fragData = DataManager.GameData.CardFrags[data.template_id]
                ResManager.loadItemIcon(`hero/icon/${fragData.name.slice(0, -2)}`, this.sprite.node)
                // ResManager.loadItemIcon(`hero/debrisBg${fragData.quality - 1}`, this.node)
            }

            if (keyBonus.indexOf(template_id) != -1) {
                let bonusData = DataManager.GameData.bonus[template_id]
                ResManager.loadItemIcon(`UI/bonus/${bonusData.name}`, this.sprite.node)
            }

            if (keyStudy.indexOf(template_id) != -1) {
                let skillSt = DataManager.GameData.SkillStudy[template_id]
                ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.sprite.node)
            }

            if (keyRune.indexOf(template_id) != -1) {
                let rune = DataManager.GameData.Runes[template_id]
                ResManager.loadItemIcon(`Rune/${rune.icon}`, this.sprite.node)
            }

           
        }
    }

    // update (dt) {}
}
