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
        NetEventDispatcher.addListener(NetEvent.S2CFindMines, this.S2CFindMines.bind(this))
    }

    init() {

    }

    S2CFindMines(retObj) {
        console.log(`查找特殊矿返回：` + JSON.stringify(retObj))
        // retObj.mine_points
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FINDBACK, ...[retObj.mine_points])
    }

    // 102: {
    //     name: "重镇",
    // },
    // 103: {
    //     name: "名城",
    // },
    // 104: {
    //     name: "圣都",
    // },
    // 105: {
    //     name: "特殊",
    // },
    // 106: {
    //     name: "遗迹",
    // },



    onFindHandler(event, data) {
        console.log('data:' + data)
        MyProtocols.send_C2SFindMines(DataManager._loginSocket, data, DataManager.pageGoBattle.nation_id, 0, 0)
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }


    // update (dt) {}
}
