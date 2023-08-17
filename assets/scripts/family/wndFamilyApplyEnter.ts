// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: `家族名` })
    labelFamilyName: cc.Label = null;

    @property({ type: cc.Label, displayName: `家族ID` })
    labelFamilyID: cc.Label = null;

    @property({ type: cc.Label, displayName: `族长` })
    labelChief: cc.Label = null;

    
    @property({ type: cc.Node, displayName: `头像` })
    icon: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {

    }

    onSureHandler() {

    }

    onChanelHandler() {

    }

    // update (dt) {}
}
