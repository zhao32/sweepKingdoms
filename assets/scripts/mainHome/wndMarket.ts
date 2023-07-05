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
import buyPanel from "./buyPanel";
import marketItem from "./marketItem";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.ToggleContainer })
    ToggleContainer: cc.ToggleContainer = null;

    @property({ type: cc.Node })
    contect: cc.Node = null;

    @property({ type: cc.Prefab })
    itemPfb: cc.Prefab = null;

    @property({ type: cc.Label, displayName: '金币' })
    labelCoin: cc.Label = null;

    @property({ type: cc.Label, displayName: '元宝' })
    labelGold: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let ToggleList = this.ToggleContainer.getComponentsInChildren(cc.Toggle)
        ToggleList[0].isChecked = true
        for (let i = 0; i < ToggleList.length; i++) {
            ToggleList[i].node.on('toggle', (event: cc.Toggle) => {
                if (event.isChecked == true) {
                    console.log('选中' + i)
                    this.contect.removeAllChildren()

                }
            }, this)
        }
        MyProtocols.send_C2SMallList(DataManager._loginSocket)
    }

    setPanelInfo(data) {

    }

    init() {
        NetEventDispatcher.addListener(NetEvent.S2CMallList, this.S2CMallList, this)
        this.labelCoin.string = String(DataManager.playData.coinMoney)
        this.labelGold.string = String(DataManager.playData.goldMoney)
        this.node.getChildByName(`buyPanel`).active = false
    }

    S2CMallList(data) {
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

        for (let i = 0; i < Object.keys(DataManager.GameData.Consumes).length; i++) {
            let id = Object.keys(DataManager.GameData.Consumes)[i]
            let item = cc.instantiate(this.itemPfb)
            item.parent = this.contect
            item.getComponent(marketItem).init(DataManager.GameData.Consumes[id])
            item.on(cc.Node.EventType.TOUCH_END, () => {
                this.node.getChildByName(`buyPanel`).active = true
                this.node.getChildByName(`buyPanel`).getComponent(buyPanel).init(DataManager.GameData.Consumes[id], i)
            }, this)
        }
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }


    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CMallList, this.S2CMallList, this)

    }

    // update (dt) {}
}
