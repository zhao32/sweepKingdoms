// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    _data: any

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this._data = data
        NetEventDispatcher.addListener(NetEvent.S2CMineEviDetail, this.S2CMineEviDetail.bind(this))


    }

    S2CMineEviDetail(data) {
        console.log('恶魔之门阵容返回')
        console.log(JSON.stringify(data))

    }

    /**查看战场 */
    onDetailHandler() {

        MyProtocols.send_C2SMineEviDetail(DataManager._loginSocket, this._data.page, this._data.idx, this._data.country)

    }

    /**协助进攻 */
    onAttackHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUTDISPATCH, ...[this._data, 'out', 1])

    }
    /**协助防守 */
    onDefineHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUTDISPATCH, ...[this._data, 'out', 0])
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CMineEviDetail, this.S2CMineEviDetail.bind(this))

    }

    // update (dt) {}
}
