// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EventManager from "../utils/Manager/EventManager";
import ViewManager from "../utils/Manager/ViewManager";
import jbBuyPanel from "./jbBuyPanel";
import jbSellPanel from "./jbSellPanel";
import jbUnSellPanel from "./jbUnSellPanel";
import marketRender from "./marketRender";
import sellRender from "./sellRender";
import unSellRender from "./unSellRender";

const { ccclass, property } = cc._decorator;


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    goldLabel: cc.Label = null;

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    marketPfb: cc.Prefab = null;

    @property(cc.Prefab)
    sellPfb: cc.Prefab = null;

    @property(cc.Prefab)
    unSellPfb: cc.Prefab = null;

    @property(cc.Toggle)
    toggle1: cc.Toggle = null;

    @property(cc.Toggle)
    toggle2: cc.Toggle = null;

    @property(cc.Toggle)
    toggle3: cc.Toggle = null;




    start() {
        DataManager.wndJB = this
        this.node.getChildByName(`jbSellPanel`).active = false
        this.node.getChildByName(`jbBuyPanel`).active = false
        this.node.getChildByName(`jbUnSellPanel`).active = false
    }

    showSellPanel(data) {
        this.node.getChildByName(`jbSellPanel`).getComponent(jbSellPanel).init(data)
    }

    showBuyPanel(data) {
        this.node.getChildByName(`jbBuyPanel`).getComponent(jbBuyPanel).init(data)
    }

    showUnSellPanel(data) {
        this.node.getChildByName(`jbUnSellPanel`).getComponent(jbUnSellPanel).init(data)
    }

    updateInfo() {
        this.goldLabel.string = String(DataManager.playData.goldMoney)
    }

    init() {
        this.contect.removeAllChildren()
        MyProtocols.send_C2SBussizeListAll(DataManager._loginSocket, 1, 10)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeList, this.S2CBussizeList, this)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeListAll, this.S2CBussizeListAll, this)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeSave, this.S2CBussizeSave, this)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeBuy, this.S2CBussizeBuy, this)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeOff, this.S2CBussizeOff, this)
        EventManager.getInstance().registerListener(EventManager.UPDATE_MAINHOME_INFO, this, this.updateInfo.bind(this))


        this.goldLabel.string = String(DataManager.playData.goldMoney)


        this.toggle1.node.on(`toggle`, () => {
            this.contect.removeAllChildren()
            MyProtocols.send_C2SBussizeListAll(DataManager._loginSocket, 1, 10)
        }, this)

        this.toggle2.node.on(`toggle`, () => {
            this.contect.removeAllChildren()
            /**装备 */
            let keyEquipList = Object.keys(DataManager.GameData.Equips)
            for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
                let template_id = DataManager.instance.itemsList[i].template_id.toString()
                if (DataManager.instance.itemsList[i].bagId == 1) {
                    if (keyEquipList.indexOf(template_id.toString()) != -1 && template_id != "1000" && template_id != "1001") {
                        let item = cc.instantiate(this.sellPfb)
                        item.parent = this.contect
                        item.getComponent(sellRender).init(DataManager.instance.itemsList[i])
                    }
                }
            }
        }, this)

        this.toggle3.node.on(`toggle`, () => {
            this.contect.removeAllChildren()
            MyProtocols.send_C2SBussizeList(DataManager._loginSocket)
        }, this)

    }

    S2CBussizeList(data) {
        console.log('我的售卖列表返回：' + JSON.stringify(data))
        for (let i = 0; i < data.bussize_item.length; i++) {
            let item = cc.instantiate(this.unSellPfb)
            item.parent = this.contect
            item.getComponent(unSellRender).init(data.bussize_item[i])

        }
    }

    S2CBussizeListAll(data) {
        console.log('商店列表返回：' + JSON.stringify(data))
        for (let i = 0; i < data.bussize_item.length; i++) {
            let item = cc.instantiate(this.marketPfb)
            item.parent = this.contect
            item.getComponent(marketRender).init(data.bussize_item[i])

        }
    }

    S2CBussizeSave(data) {
        console.log('上架返回返回：' + JSON.stringify(data))
        ViewManager.instance.showToast(`上架成功`)
        this.node.getChildByName(`jbSellPanel`).active = false


        this.contect.removeAllChildren()
        let keyEquipList = Object.keys(DataManager.GameData.Equips)
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            let template_id = DataManager.instance.itemsList[i].template_id.toString()
            if (DataManager.instance.itemsList[i].bagId == 1) {
                if (keyEquipList.indexOf(template_id.toString()) != -1 && template_id != "1000" && template_id != "1001") {
                    let item = cc.instantiate(this.sellPfb)
                    item.parent = this.contect
                    item.getComponent(sellRender).init(DataManager.instance.itemsList[i])
                }
            }
        }
    }

    S2CBussizeBuy(data) {
        console.log('购买成功返回：' + JSON.stringify(data))
        ViewManager.instance.showToast(`购买成功`)
        this.node.getChildByName(`jbBuyPanel`).active = false

        this.contect.removeAllChildren()
        MyProtocols.send_C2SBussizeListAll(DataManager._loginSocket, 1, 10)
    }

    S2CBussizeOff(data) {
        console.log('下架成功返回：' + JSON.stringify(data))
        ViewManager.instance.showToast(`下架成功`)
        this.node.getChildByName(`jbUnSellPanel`).active = false

        this.contect.removeAllChildren()
        MyProtocols.send_C2SBussizeList(DataManager._loginSocket)
    }

    onClose() {

        NetEventDispatcher.removeListener(NetEvent.S2CBussizeList, this.S2CBussizeList, this)
        NetEventDispatcher.removeListener(NetEvent.S2CBussizeListAll, this.S2CBussizeListAll, this)
        NetEventDispatcher.removeListener(NetEvent.S2CBussizeSave, this.S2CBussizeSave, this)
        NetEventDispatcher.removeListener(NetEvent.S2CBussizeBuy, this.S2CBussizeBuy, this)
        NetEventDispatcher.removeListener(NetEvent.S2CBussizeOff, this.S2CBussizeOff, this)
        EventManager.getInstance().unRegisterListener(EventManager.UPDATE_MAINHOME_INFO, this)

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)


    }

    // update (dt) {}
}
