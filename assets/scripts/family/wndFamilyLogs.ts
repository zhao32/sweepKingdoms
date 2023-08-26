// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import familyLogRender from "./familyLogRender";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    pfb: cc.Prefab = null;

  
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // [{"Player1Id":10001,"Player1Id2":0,"Action":2,"time":1693038782,"icon":0},{"Player1Id":10001,"Player1Id2":0,"Action":2,"time":1693038797,"icon":0}]
    init(logs) {
        this.contect.removeAllChildren()
        for (let i = 0; i < logs.length; i++) {
            let render = cc.instantiate(this.pfb)
            render.parent = this.contect
            render.getComponent(familyLogRender).init(logs[i])
            
        }

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)

    }

    onClose() {

    }

    // update (dt) {}
}
