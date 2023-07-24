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
            this.countLabel.string = `x${data.num}`

            let itemData
            /**礼包 */
            let keyGiftList = Object.keys(DataManager.GameData.Boxes)
            /**消耗品 */
            let keyConsList = Object.keys(DataManager.GameData.Consumes)

            let keyStoneList = Object.keys(DataManager.GameData.MineStone)

            let keyStudy = Object.keys(DataManager.GameData.SkillStudy)



            let keyEquip = Object.keys(DataManager.GameData.Equips)


            if (keyGiftList.indexOf(data.template_id) != -1) {
                itemData = DataManager.GameData.Boxes[data.template_id]
            }

            if (keyConsList.indexOf(data.template_id) != -1) {
                itemData = DataManager.GameData.Consumes[data.template_id]
            }

            if (keyEquip.indexOf(data.template_id) != -1) {
                itemData = DataManager.GameData.Equips[data.template_id]
            }

            if (keyStoneList.indexOf(data.template_id) != -1) {
                itemData = DataManager.GameData.MineStone[data.template_id]
            }

            if (keyStudy.indexOf(data.template_id) != -1) {
                let skillSt = DataManager.GameData.SkillStudy[data.template_id]
                ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.sprite.node)
            }

            if (itemData) {
                ResManager.loadItemIcon(`UI/prop/${itemData.name}`, this.sprite.node)
            }
        }
    }

    // update (dt) {}
}
