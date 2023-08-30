// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import marketItem from "../mainHome/marketItem";
import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import familyMallBuyPanel from "./familyMallBuyPanel";
import familyMarketItem from "./familyMarketItem";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: "贡献值" })
    labelContribute: cc.Label = null;

    @property({ type: cc.Label, displayName: "声望" })
    labelReputation: cc.Label = null;

    @property({ type: cc.Label, displayName: "金币" })
    labelCoin: cc.Label = null;

    @property({ type: cc.Label, displayName: "元宝" })
    labelGold: cc.Label = null;

    @property({ type: cc.Node })
    contect: cc.Node = null;

    @property({ type: cc.Prefab })
    pfb: cc.Prefab = null;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }


    init() {
        MyProtocols.send_C2SFamilyMallList(DataManager._loginSocket)
        NetEventDispatcher.addListener(NetEvent.S2CFamilyMallList, this.S2CFamilyMallList, this)
        NetEventDispatcher.addListener(NetEvent.S2CFamilyRefreshMall, this.S2CFamilyMallList, this)

        this.labelReputation.string = DataManager.familyDetail.reputation.toString()
        this.labelContribute.string = DataManager.familyDetail.contribution.toString()
        this.labelCoin.string = DataManager.playData.coinMoney
        this.labelGold.string = DataManager.playData.goldMoney
    }

    S2CFamilyMallList(data) {
        console.log(`商场数据返回`)
        console.log(JSON.stringify(data))
        this.contect.removeAllChildren()
        //{"items":[],"packs":[]}
        // for (let i = 0; i < data.packs.length; i++) {
        //     let item = cc.instantiate(this.itemPfb)
        //     item.parent = this.contect

        //     item.on(cc.Node.EventType.TOUCH_END, () => {

        //     }, this)
        // }


        let keyItems = Object.keys(DataManager.GameData.familyGoods)
        console.log(`` + keyItems)

        for (let i = 0; i < data.items.length; i++) {
            console.log(data.items[i].itemTemplateId)
            if (keyItems.indexOf(String(data.items[i].itemTemplateId)) != -1) {
                console.log(`-------`)
                let id = data.items[i].itemTemplateId
                let item = cc.instantiate(this.pfb)
                item.parent = this.contect
                item.getComponent(familyMarketItem).init(DataManager.GameData.familyGoods[id],data.items[i])
                item.on(cc.Node.EventType.TOUCH_END, () => {
                    this.node.getChildByName(`buyPanel`).active = true
                    this.node.getChildByName(`buyPanel`).getComponent(familyMallBuyPanel).init(DataManager.GameData.familyGoods[id], i)
                }, this)
            }

        }

        // for (let i = 0; i < Object.keys(DataManager.GameData.familyGoods).length; i++) {
        //     console.log(i)

        // }
    }

    onRefreshHandler1() {
        MyProtocols.send_C2SFamilyRefreshMall(DataManager._loginSocket, 1)

    }

    onRefreshHandler2() {
        MyProtocols.send_C2SFamilyRefreshMall(DataManager._loginSocket, 2)

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyMallList, this.S2CFamilyMallList, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyRefreshMall, this.S2CFamilyMallList, this)
    }

    // update (dt) {}
}
