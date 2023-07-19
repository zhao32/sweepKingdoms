// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    moneyLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;



    // @property(cc.Label)
    // moneyLabel: cc.Label = null;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this.nameLabel.string = data.name
        this.moneyLabel.string = 'x' + data.price
        // ResManager.loadItemIcon(`UI/items/${data.icon}`, this.icon)
        ResManager.loadItemIcon(`UI/prop/${data.name}`, this.icon)

    }

    // update (dt) {}
}
