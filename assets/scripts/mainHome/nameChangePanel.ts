// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { getRandHeroName } from "../login/SelectRoleInfo";
import ViewManager from "../utils/Manager/ViewManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property({ type: cc.EditBox, displayName: '名字' })
    editBox: cc.EditBox = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    strName: string = ''

    start () {

    }

    open(){ 
        this.strName = ''
        this.editBox.string = ''
        this.editBox.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.strName = editBox.textLabel.string
        }, this)
    }

    onCancel() {
        this.node.active = false
    }

    onChange() {
        if (!this.strName) {
            ViewManager.instance.showToast(`请选择名称`)
            return
        }
    }

    
    selectNameHander() {
        let strName = getRandHeroName()
        this.editBox.string = strName
        this.strName = strName
    }

    // update (dt) {}
}
