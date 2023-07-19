// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

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
        var itemData= DataManager.GameData.goods[data.itemId]//ItemsConfigMgr.processItemCfg(data.itemId);
        this.count.string="x"+data.cnt;
        if(this._isNormalItem(data.itemId)){
            // var MailPanelManager = require("MailPanelManager");
            this.pic.node.active=true;
            // this.pic.spriteFrame=MailPanelManager.getInstance().moneySprFrame[NormalItemsId[data.itemId]];
        }else{
            if(itemData != null){
                this.itemName.node.active=true;
                this.itemName.string=itemData.name;
                // var itemNameColor=ColorUtil.getColorByQuality(itemData.quality);
                // this.itemName.node.color=itemNameColor;
            }
        }

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
