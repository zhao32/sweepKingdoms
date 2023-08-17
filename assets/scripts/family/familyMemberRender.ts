// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: "昵称" })
    labelName: cc.Label = null;

    @property({ type: cc.Label, displayName: "职务" })
    labelDuties: cc.Label = null;

    @property({ type: cc.Label, displayName: "贡献度" })
    labelContribute: cc.Label = null;

    @property({ type: cc.Label, displayName: "级别" })
    labelLv: cc.Label = null;

    @property({ type: cc.Label, displayName: "声望" })
    labelReputation: cc.Label = null;

    @property({ type: cc.Node, displayName: "头像" })
    icon: cc.Node = null;




    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {

    }

    // update (dt) {}
}
