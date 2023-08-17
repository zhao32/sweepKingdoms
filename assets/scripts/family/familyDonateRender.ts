// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.ProgressBar, displayName: "贡献进度条" })
    proBar: cc.ProgressBar = null;


    @property({ type: cc.Label, displayName: "进度" })
    LabelPro: cc.Label = null;

    @property({ type: cc.Label, displayName: "捐献奖励" })
    LabelAward: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {

    }

    onContributeHandler() {

    }

    // update (dt) {}
}
