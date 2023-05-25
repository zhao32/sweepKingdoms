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

    @property({ type: cc.Label, displayName: '名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '描述' })
    describeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '价格' })
    priceDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '战力' })
    powerDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '购买条件' })
    premiseDisplay: cc.Label = null;

    @property(cc.Sprite)
    soldierSprite: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        console.error(JSON.stringify(data))
        this.nameDisplay.string = data.name
        this.describeDisplay.string = data.describe
        if (data.state == 0) {
            this.premiseDisplay.string = '招募条件'
            this.node.getChildByName('price').active = false

        } else if (data.state == 1) {
            this.premiseDisplay.string = ''
            this.node.getChildByName('price').active = true
            this.priceDisplay.string = `x${data.price}`
        }

        ResManager.loadItemIcon(`soliderHead/${data.name}`,this.soldierSprite.node)

    }

    // update (dt) {}
}
