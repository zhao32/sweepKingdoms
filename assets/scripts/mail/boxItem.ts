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
        let itemData = DataManager.GameData.Consumes[data.itemId]
        if (itemData) ResManager.loadItemIcon(`UI/items/${itemData.icon}`, this.sprite.node)
        this.countLabel.string = `x${data.cnt}`
    }

    // update (dt) {}
}
