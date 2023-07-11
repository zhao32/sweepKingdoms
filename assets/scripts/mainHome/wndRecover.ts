// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";
import renderBulid0 from "./renderBulid0";
import renderBulid1 from "./renderBulid1";

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
    renderPfb0: cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    showGroups() {

    }


    init() {
        // this.showGroups()
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            if (DataManager.instance.itemsList[i].id) {

            }
        }
        this.contect.removeAllChildren()
        for (let i = 0; i < 3; i++) {
            let render = cc.instantiate(this.renderPfb0)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            // render.getComponent(renderBulid0).init(this.groupsData[i])
        }

        NetEventDispatcher.addListener(NetEvent.S2CRebirth, this.S2CRebirth, this)

    }

    onBackHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }

    onRecoverHandler(){ 
        MyProtocols.send_C2SRebirth(DataManager._loginSocket)

    }

    S2CRebirth(data) {
        console.log('复活返回：' + JSON.stringify(data))
    }


    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CRebirth, this.S2CRebirth, this)
    }

    // update (dt) {}
}
