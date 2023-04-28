// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    jinhuaPfb: cc.Prefab = null;

    @property(cc.Prefab)
    qianghuaPfb: cc.Prefab = null;

    @property(cc.Prefab)
    chuanchengPfb: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _from:string

    start() {

    }

    init(from,idx) {
        this.contect.removeAllChildren()
        for (let i = 0; i < 10; i++) {
            let pfb = cc.instantiate(this.jinhuaPfb)
            pfb.parent = this.contect
        }
        this._from = from

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        if(this._from){
            ViewManager.instance.showWnd(this._from)
 
        }
    }

    // update (dt) {}
}
