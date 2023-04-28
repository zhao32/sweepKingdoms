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
    typeFrames: cc.SpriteFrame[] = [];

    @property(cc.Label)
    nameDisplay: cc.Label = null;

    @property(cc.Label)
    tipDisplay: cc.Label = null;

    @property(cc.Sprite)
    bulidSprite: cc.Sprite = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {

    }

    // update (dt) {}
}
