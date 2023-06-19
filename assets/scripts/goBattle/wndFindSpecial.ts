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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    init() {
        NetEventDispatcher.addListener(NetEvent.S2CFindMines, this.S2CFindMines,this)

    }

    S2CFindMines(retObj) {
        console.log(`查找特殊矿返回：` + JSON.stringify(retObj))

        let mineData = []
        for (let i = 0; i < retObj.mine_points.length; i++) {
            if (retObj.mine_points[i].hold_player) {
                mineData.push(retObj.mine_points[i])
            }
        }
        if (mineData.length == 0) {
            ViewManager.instance.showToast(`未查询到当前类型的矿场`)
            return
        }
        // retObj.mine_points
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FINDBACK, ...[mineData])
    }

    onFindHandler(event, data) {
        console.log('data:' + data)
        MyProtocols.send_C2SFindMines(DataManager._loginSocket, data, DataManager.pageGoBattle.nation_id, 0, 0)
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFindMines, this.S2CFindMines,this)
    }

    // update (dt) {}
}
