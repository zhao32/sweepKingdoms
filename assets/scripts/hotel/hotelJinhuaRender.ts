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

    @property({ type: cc.Label, displayName: '状态' })
    stateDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '状态' })
    gradeDisplay: cc.Label = null;

    @property({ type: cc.ProgressBar, displayName: '体力条' })
    proBar: cc.Label = null;

    @property({ type: cc.Sprite, displayName: '头像' })
    headSprite: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {

    }

    // update (dt) {}
}
