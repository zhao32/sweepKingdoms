// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    editBox1: cc.EditBox = null;

    start() {

    }

    init() {
        this.editBox1.node.on('editing-did-ended', (editBox: cc.EditBox) => {

        }, this)
    }

    onSureHandler() {

    }

    onChanelHandler() {

    }

    // update (dt) {}
}
