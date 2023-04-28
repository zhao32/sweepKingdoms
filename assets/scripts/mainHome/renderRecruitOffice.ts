// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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

    init() {

    }

    // update (dt) {}
}
