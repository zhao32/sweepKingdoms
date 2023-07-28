// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

var NormalItemsId = {
    '1450': 0,
    '1453': 1,
    '1451': 2,
    '1455': 3,
    '1452': 4,
    '1454': 5,
};

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    itemName: cc.Label = null

    @property(cc.Sprite)
    pic: cc.Sprite = null

    @property(cc.Label)
    count: cc.Label = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    initData(data) {
        // var itemData= DataManager.GameData.goods[data.itemId]//ItemsConfigMgr.processItemCfg(data.itemId);

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




        let keyEquip = Object.keys(DataManager.GameData.Equips)

        let template_id = String(data.template_id)

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
            ResManager.loadItemIcon(`UI/prop/${itemData.name}`, this.pic.node)
        }

        if (keyCardFrag.indexOf(template_id) != -1) {
            
            let fragData = DataManager.GameData.CardFrags[data.template_id]
            ResManager.loadItemIcon(`hero/icon/${fragData.name.slice(0, -2)}`, this.pic.node)
            // ResManager.loadItemIcon(`hero/debrisBg${fragData.quality - 1}`, this.node)
        }

        if (keyBonus.indexOf(template_id) != -1) {
          
            let bonusData = DataManager.GameData.bonus[template_id]
            ResManager.loadItemIcon(`UI/bonus/${bonusData.name}`, this.pic.node)
        }

        if (keyStudy.indexOf(template_id) != -1) {
          
            let skillSt = DataManager.GameData.SkillStudy[template_id]
            ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.pic.node)
        }

        this.count.string = "x" + data.num;
        this.pic.node.active = true;


        // if (this._isNormalItem(data.template_id)) {
        //     // var MailPanelManager = require("MailPanelManager");
        //     this.pic.node.active = true;
        //     // this.pic.spriteFrame=MailPanelManager.getInstance().moneySprFrame[NormalItemsId[data.itemId]];
        // } else {
        //     if (itemData != null) {
        //         this.itemName.node.active = true;
        //         this.itemName.string = itemData.name;
        //         // var itemNameColor=ColorUtil.getColorByQuality(itemData.quality);
        //         // this.itemName.node.color=itemNameColor;
        //     }
        // }

    }

    _isNormalItem(itemId) {
        // for(var i=0;i<NormalItemsId.length;i++){
        //     if(itemId==NormalItemsId[i]){
        //         return true;
        //     }
        // }
        // return false;
        if (NormalItemsId[itemId] !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    // update (dt) {}
}
