// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import familyMemberRender from "./familyMemberRender";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    pfb: cc.Prefab = null;

    @property({ type: cc.Label, displayName: "提示" })
    labelDes: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    
    init(data) {
        this.contect.removeAllChildren()
        for (let i = 0; i < data.length; i++) {
           let render = cc.instantiate(this.pfb)
           render.parent = this.contect
           render.getComponent(familyMemberRender).init(data[i])
            
        }

        this.labelDes.string = `现有成员${data.length}名，最多50名`

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onClose() {

    }

    // update (dt) {}
}
