// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    editID: cc.EditBox = null;

    id
    // onLoad () {}

    start() {
        this.editID.node.on('editing-did-ended', (editBox: cc.EditBox) => {

            this.id = editBox.string
        }, this)
    }

    open() {
        this.node.active = true
        this.editID.string = ''
        this.id = ''

        
    }

    onInviteHandler() {
        if (!this.id) {
            ViewManager.instance.showToast(`请输入玩家ID`)
            return
        }
    }

    onChanelHandler() {
        this.node.active = false

    }

    // update (dt) {}
}
