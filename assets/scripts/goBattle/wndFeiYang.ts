// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import feiYangRender from "./feiYangRender";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    FYPfb: cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this.contect.removeAllChildren()
        for (let i = 0; i < data.length; i++) {
            let render = cc.instantiate(this.FYPfb)
            render.parent = this.contect
            render.getComponent(feiYangRender).init(data[i])

            render.on(cc.Node.EventType.TOUCH_END, () => {
                DataManager.pageGoBattle.selectIdx = data[i].hold_player.idx
                DataManager.pageGoBattle.curPageIdx = data[i].hold_player.page
                console.log(`查找第 ${data[i].hold_player.page} 页   第 ${data[i].hold_player.idx}个`)
                DataManager.pageGoBattle.changeCountryId(data[i].hold_player.country)

                MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, data[i].hold_player.page, DataManager.pageGoBattle.nation_id)
                ViewManager.instance.hideWnd(DataManager.curWndPath)
            }, this)
        }
    }
    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onClose() {

    }

    // update (dt) {}
}
