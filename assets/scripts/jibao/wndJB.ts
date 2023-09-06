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


    @property(cc.Toggle)
    rypeToggle1: cc.Toggle = null;

    @property(cc.Toggle)
    rypeToggle2: cc.Toggle = null;

    @property(cc.Toggle)
    rypeToggle3: cc.Toggle = null;

    @property(cc.Label)
    pageLabel: cc.Label = null;

    curPage = 1
    /**全部 装备 技能 将魂 */
    type = 1
    /**集市 寄售 上架中 */
    classType = 1

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

    upType() {
        if (this.classType == 1) {

        } else if (this.classType == 2) {
            this.contect.removeAllChildren()
            if (this.type == 1) {
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

                /**技能 */
                let keySkillatList = Object.keys(DataManager.GameData.SkillStudy)
                for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
                    let template_id = DataManager.instance.itemsList[i].template_id.toString()
                    if (DataManager.instance.itemsList[i].bagId == 3) {
                        if (keySkillatList.indexOf(template_id.toString()) != -1) {
                            let item = cc.instantiate(this.sellPfb)
                            item.parent = this.contect
                            item.getComponent(sellRender).init(DataManager.instance.itemsList[i])
                        }
                    }
                }


            } else if (this.type == 2) {
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


            } else if (this.type == 3) {
                /**技能 */
                let keySkillatList = Object.keys(DataManager.GameData.SkillStudy)
                for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
                    let template_id = DataManager.instance.itemsList[i].template_id.toString()
                    if (DataManager.instance.itemsList[i].bagId == 3) {
                        if (keySkillatList.indexOf(template_id.toString()) != -1) {
                            let item = cc.instantiate(this.sellPfb)
                            item.parent = this.contect
                            item.getComponent(sellRender).init(DataManager.instance.itemsList[i])
                        }
                    }
                }

                // let keyFlagList = Object.keys(DataManager.GameData.CardFrags)

                // for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
                //     let template_id = DataManager.instance.itemsList[i].template_id.toString()
                //     if (DataManager.instance.itemsList[i].bagId == 3) {
                //         if (keyFlagList.indexOf(template_id.toString()) != -1) {
                //             let item = cc.instantiate(this.sellPfb)
                //             item.parent = this.contect
                //             item.getComponent(sellRender).init(DataManager.instance.itemsList[i])
                //         }
                //     }
                // }

            } else if (this.type == 4) {
                // let fragList = []
                let keys = Object.keys(DataManager.GameData.CardFrags)
                for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
                    if (keys.indexOf(String(DataManager.instance.itemsList[i].template_id)) != -1) {
                        // fragList.push(DataManager.instance.itemsList[i])
                        let item = cc.instantiate(this.sellPfb)
                        item.parent = this.contect
                        item.getComponent(sellRender).init(DataManager.instance.itemsList[i])
                    }
                }
            }

        } else if (this.classType == 3) {

        }

    }

    init() {
        this.type = 1

        this.contect.removeAllChildren()
        MyProtocols.send_C2SBussizeListAll(DataManager._loginSocket, this.curPage, 5)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeList, this.S2CBussizeList, this)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeListAll, this.S2CBussizeListAll, this)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeSave, this.S2CBussizeSave, this)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeBuy, this.S2CBussizeBuy, this)
        NetEventDispatcher.addListener(NetEvent.S2CBussizeOff, this.S2CBussizeOff, this)
        EventManager.getInstance().registerListener(EventManager.UPDATE_MAINHOME_INFO, this, this.updateInfo.bind(this))


        this.goldLabel.string = String(DataManager.playData.goldMoney)
        this.node.getChildByName(`page`).active = true

        this.rypeToggle1.node.on(`toggle`, () => {
            this.type = 1
            this.upType()
        }, this)

        this.rypeToggle2.node.on(`toggle`, () => {
            this.type = 2
            this.upType()
        }, this)

        this.rypeToggle3.node.on(`toggle`, () => {
            this.type = 3
            this.upType()
        }, this)

        this.toggle1.node.on(`toggle`, () => {
            this.classType = 1
            this.node.getChildByName(`page`).active = true
            this.contect.removeAllChildren()
            MyProtocols.send_C2SBussizeListAll(DataManager._loginSocket, this.curPage, 5)
        }, this)

        this.toggle2.node.on(`toggle`, () => {
            this.classType = 2
            this.node.getChildByName(`page`).active = false
            this.upType()
            // this.contect.removeAllChildren()
            // /**装备 */
            // let keyEquipList = Object.keys(DataManager.GameData.Equips)
            // /**技能 */
            // let keySkillatList = Object.keys(DataManager.GameData.SkillStudy)

            // for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            //     let template_id = DataManager.instance.itemsList[i].template_id.toString()
            //     if (DataManager.instance.itemsList[i].bagId == 1) {
            //         if (keyEquipList.indexOf(template_id.toString()) != -1 && template_id != "1000" && template_id != "1001") {
            //             let item = cc.instantiate(this.sellPfb)
            //             item.parent = this.contect
            //             item.getComponent(sellRender).init(DataManager.instance.itemsList[i])
            //         }
            //     }
            // }

            // for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            //     let template_id = DataManager.instance.itemsList[i].template_id.toString()
            //     if (DataManager.instance.itemsList[i].bagId == 3) {
            //         if (keySkillatList.indexOf(template_id.toString()) != -1) {
            //             let item = cc.instantiate(this.sellPfb)
            //             item.parent = this.contect
            //             item.getComponent(sellRender).init(DataManager.instance.itemsList[i])
            //         }
            //     }
            // }
        }, this)

        this.toggle3.node.on(`toggle`, () => {
            this.classType = 3
            this.node.getChildByName(`page`).active = false
            this.contect.removeAllChildren()
            MyProtocols.send_C2SBussizeList(DataManager._loginSocket)
        }, this)
    }

    prePage() {
        if (this.curPage <= 1) {
            ViewManager.instance.showToast(`已到首页`)
            return
        }
        // this.curPage--
        // this.pageLabel.string = `第${this.curPage}页`
        MyProtocols.send_C2SBussizeListAll(DataManager._loginSocket, this.curPage - 1, 5)
    }

    nextPage() {
        // this.curPage++
        // this.pageLabel.string = `第${this.curPage}页`
        MyProtocols.send_C2SBussizeListAll(DataManager._loginSocket, this.curPage + 1, 5)
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
        if (data.bussize_item.length == 0) {
            // if (this.curPage > 1) this.curPage--
            // this.pageLabel.string = `第${this.curPage}页`
            ViewManager.instance.showToast(`没有更多了`)
            return
        }
        this.curPage = data.page
        this.pageLabel.string = `第${this.curPage}页`
        this.contect.removeAllChildren()
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
        let keySkillatList = Object.keys(DataManager.GameData.SkillStudy)

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

        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            let template_id = DataManager.instance.itemsList[i].template_id.toString()
            if (DataManager.instance.itemsList[i].bagId == 3) {
                if (keySkillatList.indexOf(template_id.toString()) != -1) {
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
        MyProtocols.send_C2SBussizeListAll(DataManager._loginSocket, this.curPage, 5)
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
