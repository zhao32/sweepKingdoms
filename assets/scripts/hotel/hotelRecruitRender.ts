// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    describeDisplay: cc.Label = null;

    @property(cc.Label)
    nameDisplay: cc.Label = null;

    @property(cc.Label)
    priceDisplay: cc.Label = null;

    @property(cc.Sprite)
    iconSprite: cc.Sprite = null;

    @property(cc.Sprite)
    priceSprite: cc.Sprite = null;

    @property(cc.SpriteFrame)
    priceIconFrame: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    iconFrame: cc.SpriteFrame[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this.describeDisplay.string = data.describe
        this.nameDisplay.string = data.name
        this.iconSprite.spriteFrame = this.iconFrame[data.idx]
        this.priceDisplay.string = `x${data.price}`
        this.priceSprite.spriteFrame = this.priceIconFrame[data.idx]
    }

    // update (dt) {}
}
