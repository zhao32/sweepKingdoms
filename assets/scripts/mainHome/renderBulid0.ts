// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.SpriteFrame)
    groupFrame: cc.SpriteFrame[] = [];

    @property(cc.Label)
    groupDisplay: cc.Label = null;

    @property(cc.Label)
    tipDisplay: cc.Label = null;

    @property(cc.Sprite)
    groupSprite: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }


    // group: '基础设施',
    // describe: '基础建筑设施，为主城提升人口、仓储、城防等收益',
    // frameIdx: 0

    init(data) {
        this.groupSprite.spriteFrame = this.groupFrame[data.frameIdx]
        this.groupDisplay.string = data.group
        this.tipDisplay.string = data.describe
    }
    // update (dt) {}
}
