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
import hotelJinhuaRender from "./hotelJinhuaRender";
import hotelRecruitRender from "./hotelRecruitRender";
import renderHun from "./renderHun";
import renderReciruitResult1 from "./renderReciruitResult1";

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    renderPfb: cc.Prefab = null;

    @property(cc.Prefab)
    renderResultPfb0: cc.Prefab = null;

    @property(cc.Prefab)
    renderResultPfb10: cc.Prefab = null;

    @property(cc.Prefab)
    renderResultPfb11: cc.Prefab = null;


    @property(cc.Label)
    titleDisplay: cc.Label = null;

    @property(cc.Label)
    goldDisplay: cc.Label = null;

    @property(cc.Label)
    honorDisplay: cc.Label = null;

    @property(cc.ScrollView)
    scrollview: cc.ScrollView = null;


    showType: number = 0 // 0 招募 1 招募结果
    recruitData = [
        {
            idx: 0,
            name: '元宝招募一次',
            price: 280,
            describe: '必出名将以上的将领及对应将魂',
        },
        {
            idx: 1,
            name: '元宝招募十次',
            price: 2520,
            describe: '招募十次，价格八折'
        },
        {
            idx: 2,
            name: '功勋招募一次',
            price: 4000,
            describe: '可以招募到大将，名将及以上'
        },
        {
            idx: 3,
            name: '功勋招募十次',
            price: 35200,
            describe: '招募十次，价格八折，可以招募到大将，名将及以上'
        }
    ]

    start() {

    }

    S2CPubBuy(retObj) {
        console.log('酒馆招募返回' + JSON.stringify(retObj))
        this.goldDisplay.string = String(DataManager.playData.goldMoney)
        this.honorDisplay.string = String(DataManager.playData.honor)

        // this.showIntragroup(retObj.cards)
        let fragList = []
        let keys = Object.keys(DataManager.GameData.CardFrags)
        for (let i = 0; i < retObj.cards.length; i++) {
            if (keys.indexOf(String(retObj.cards[i].template_id)) != -1) {
                fragList.push(retObj.cards[i])
            }
        }

        console.log('keys:' + JSON.stringify(keys))
        console.log('fragList:' + JSON.stringify(fragList))

        for (let i = 0; i < fragList.length; i++) {
            let render = cc.instantiate(this.renderResultPfb10)
            render.parent = this.contect
            if (this.contect.children.length < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }

            render.getComponent(renderHun).init(fragList[i])
            render.getChildByName("btnComp").active = false
        }
    }


    S2CPubView(retObj) {
        console.log('retObj:' + JSON.stringify(retObj))
    }

    showGroups() {
        this.showType = 0
        this.scrollview.scrollToTop()
        this.contect.removeAllChildren()
        for (let i = 0; i < this.recruitData.length; i++) {
            let render = cc.instantiate(this.renderPfb)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            render.getComponent(hotelRecruitRender).init(this.recruitData[i]);
            render.on(cc.Node.EventType.TOUCH_END, () => {
                // this.showIntragroup()
                this.contect.removeAllChildren()
                this.showType = 1

                MyProtocols.send_C2SPubBuy(DataManager._loginSocket, i)

            }, this)
        }
        this.titleDisplay.string = '将领招募'
    }

    showIntragroup(cards) {
        this.showType = 1
        this.contect.y = 0
        this.contect.removeAllChildren()
        for (let i = 0; i < cards.length; i++) {
            let render = cc.instantiate(this.renderResultPfb0)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            render.getComponent(renderReciruitResult1).init(cards[i])
        }
        this.titleDisplay.string = '招募结果'
    }

    init() {
        this.showGroups()
        this.goldDisplay.string = String(DataManager.playData.goldMoney)
        this.honorDisplay.string = String(DataManager.playData.honor)

        MyProtocols.send_C2SPubView(DataManager._loginSocket);

        NetEventDispatcher.addListener(NetEvent.S2CPubView, this.S2CPubView, this)
        NetEventDispatcher.addListener(NetEvent.S2CPubBuy, this.S2CPubBuy, this)
        NetEventDispatcher.addListener(NetEvent.PushAddCard, this.PushAddCard, this)

    }

    onCloseHandler() {
        if (this.showType == 0) {
            console.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath)
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL)
        } else if (this.showType == 1) {
            this.showGroups()
        }
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CPubView, this.S2CPubView, this)
        NetEventDispatcher.removeListener(NetEvent.S2CPubBuy, this.S2CPubBuy, this)
        NetEventDispatcher.removeListener(NetEvent.PushAddCard, this.PushAddCard, this)
    }

    PushAddCard(retObj) {
        console.log('将表增加:' + JSON.stringify(retObj))
        if (retObj.card_info.num != 0 && this.showType == 1) {
            let render = cc.instantiate(this.renderResultPfb11)
            render.getComponent(hotelJinhuaRender).init(retObj.card_info)

            render.parent = this.contect
            if (this.contect.children.length < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * this.contect.children.length)
            }
        }
    }
    // update (dt) {}
}
