// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Sprite, displayName: '士兵图片' })
    soliderFrame: cc.Sprite = null;

    @property({ type: cc.Label, displayName: '士兵名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '强化属性' })
    attributeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '强化条件' })
    premiseDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '战力' })
    powerDisplay: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {

    }

    // update (dt) {}
}
