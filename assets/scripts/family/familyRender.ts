// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: "家族名称" })
    labelName: cc.Label = null;

    @property({ type: cc.Label, displayName: "家族人数" })
    labelCount: cc.Label = null;

    @property({ type: cc.Node, displayName: "头像" })
    icon: cc.Node = null;


    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onApplyHandler() {

    }

    start() {

    }

    init() {

    }

    // update (dt) {}
}
