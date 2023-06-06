// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import EventManager from "../utils/Manager/EventManager";
import ViewManager from "../utils/Manager/ViewManager";
import battleRender from "./battleRender";

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
    renderPfb: cc.Prefab = null;

    @property(cc.Node)
    bonusArea: cc.Node = null;

    @property(cc.Node)
    scrollView: cc.Node = null;

    @property(cc.Toggle)
    toggle0: cc.Toggle = null;

    @property(cc.Toggle)
    toggle1: cc.Toggle = null;

    @property(cc.ProgressBar)
    proExploit: cc.ProgressBar = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        console.log('11111111111111111111')
        // this.contect.removeAllChildren()
        // for (let i = 0; i < 5; i++) {
        //     let render = cc.instantiate(this.renderPfb)
        //     render.parent = this.contect

        //     if (i < 5) {
        //         render.x = 1000
        //         this.scheduleOnce(() => {
        //             render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
        //         }, 0.3 * i)
        //     }
        //     render.on(cc.Node.EventType.TOUCH_END, () => {
        //         ViewManager.instance.hideWnd(EnumManager.viewPath.WND_BATTLEFILED)
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_ARMY)
        //     }, this)
        // }

        this.toggle0.node.on('toggle', () => {
            this.scrollView.active = true
            this.bonusArea.active = false
        }, this)

        this.toggle1.node.on('toggle', () => {
            this.scrollView.active = false
            this.bonusArea.active = true
        }, this)
    }

    init() {
        this.scrollView.active = true
        this.bonusArea.active = false
        console.log('-----------------------------')
        MyProtocols.send_C2SRankView(DataManager._loginSocket, 1)
        NetEventDispatcher.addListener(NetEvent.S2CRankView, this.S2CRankView.bind(this))
    }

    S2CRankView(retObj) {
        console.log(`巅峰战场列表返回`)
        console.log(JSON.stringify(retObj))

        this.contect.removeAllChildren()
        for (let i = 0; i < retObj.items.length; i++) {
            let render = cc.instantiate(this.renderPfb)
            render.parent = this.contect
            render.getComponent(battleRender).init(retObj.items[i], i + 1)

            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
                }, 0.3 * i)
            }
            render.on(cc.Node.EventType.TOUCH_END, () => {
                ViewManager.instance.hideWnd(EnumManager.viewPath.WND_BATTLEFILED)
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_ARMY,...[retObj.rank_type,retObj.items[i].playerId])
            }, this)

        }

    }

    getBonus() {

    }

    onClose() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    // update (dt) {}
}
