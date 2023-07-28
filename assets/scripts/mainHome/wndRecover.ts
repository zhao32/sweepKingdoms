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
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import renderBulid0 from "./renderBulid0";
import renderBulid1 from "./renderBulid1";
import renderReover from "./renderReover";

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

    @property(cc.Label)
    desLabel: cc.Label = null;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
    }

    showGroups() {

    }


    init() {
        // this.showGroups()
        let armList = []
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            if (DataManager.instance.itemsList[i].template_id < 30) {
                armList.push(DataManager.instance.itemsList[i])
            }
        }
        if (armList.length == 0) {
            this.desLabel.string = `暂无可复活士兵`
        } else {
            this.desLabel.string = ``
        }
        this.contect.removeAllChildren()
        for (let i = 0; i < armList.length; i++) {
            let render = cc.instantiate(this.renderPfb0)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }

            let soldierData = DataManager.GameData.Soldier[armList[i].template_id]
            render.getComponent(renderReover).init(soldierData, armList[i].num)
        }

        NetEventDispatcher.addListener(NetEvent.S2CRebirth, this.S2CRebirth, this)
    }

    onBackHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }

    onRecoverHandler() {
        MyProtocols.send_C2SRebirth(DataManager._loginSocket)
    }

    S2CRebirth(data) {
        // this.desLabel.string = `暂无可复活士兵`
        console.log('复活返回：' + JSON.stringify(data))
    }


    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CRebirth, this.S2CRebirth, this)
    }

    // update (dt) {}
}
