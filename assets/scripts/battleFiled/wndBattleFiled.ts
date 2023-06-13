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
import filedBounsArea from "./filedBounsArea";

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

        NetEventDispatcher.addListener(NetEvent.S2CRankView, this.S2CRankView.bind(this))

        if (DataManager.myBattleFiledConfig.soliders.length == 0) {
            for (let i = 0; i < 5; i++) {
                // if (DataManager.playData.military_data[i] != 0) {
                let data = {
                    arm: i + 1,
                    count: 30000,//DataManager.playData.military_data[i],
                    countAll: 100000//DataManager.playData.military_data[i],
                }
                DataManager.myBattleFiledConfig.soliders.push(data)
                // }
            }
        }
        this.scrollView.active = true
        this.bonusArea.active = false
        console.log('-----------------------------')
        this.contect.removeAllChildren()
        MyProtocols.send_C2SRankView(DataManager._loginSocket, 4)

        // let retObj = { "my_rank": 0, "my_rank change": 0, "rank_type": 2, "items": [{ "playerId": 9935, "nickname": "相心的官读知", "sexid": 1, "icon": 1, "head_frame": 1, "level": 48, "fight": 9889, "viplevel": 0, "rank_change": 8, "hero count": 8, "hero_stars": 8, "win_count": 8, "like_count": 8, "card": [1, 2, 3] }, { "playerId": 9952, "nickname": "伏义的巴都力", "sexid": 0, "icon": 8, "head_frame": 1, "level": 78, "fight": 2395, "viplevel": 0, "rankchange": 0, "hero_count": 0, "hero_stars": 0, "win count": 0, "like count": 0, "card": [4, 5, 6] }, { "playerId": 5798, "nickname": "我的测试", "sexid": 0, "icon": 8, "head_frame": 1, "level": 78, "fight": 2395, "viplevel": 0, "rankchange": 0, "hero_count": 0, "hero_stars": 0, "win count": 0, "like count": 0, "card": [1, 11, 15] }], "today_my_like_players": [], "pkwinLoose": [] }
        // this.S2CRankView(retObj)
    }

    S2CRankView(retObj) {
        console.log(`巅峰战场列表返回`)
        console.log(JSON.stringify(retObj))

        let myData = {
            playerId: DataManager.playData.id,
            rank: retObj.my_rank,
            name: DataManager.playData.name,
            rank_type: retObj.rank_type,
            icon: 0
        }

        let ePlayerData = {
            playerId: 0,
            rank: 0,
            name: '',
            rank_type: retObj.rank_type,
            icon: 0
        }

        this.contect.removeAllChildren()
        this.scrollView.getComponent(cc.ScrollView).scrollToTop()
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

            if (retObj.items[i].playerId == DataManager.playData.id) {
                DataManager.myBattleFiledConfig.card = retObj.items[i].card
                myData.icon = retObj.items[i].icon
                console.log(`-------点击我的-----------`)
                render.on(cc.Node.EventType.TOUCH_END, () => {
                    ViewManager.instance.hideWnd(EnumManager.viewPath.WND_BATTLEFILED)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_MYTEAM, ...[retObj.items[i].card])
                    NetEventDispatcher.removeListener(NetEvent.S2CRankView, this.S2CRankView.bind(this))
                }, this)
            } else {
                render.on(cc.Node.EventType.TOUCH_END, () => {
                    ePlayerData.name = retObj.items[i].nickname
                    ePlayerData.playerId = retObj.items[i].playerId
                    ePlayerData.rank = i + 1
                    ePlayerData.icon = retObj.items[i].icon

                    ViewManager.instance.hideWnd(EnumManager.viewPath.WND_BATTLEFILED)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_COMPARMY, ...[myData, ePlayerData])
                    NetEventDispatcher.removeListener(NetEvent.S2CRankView, this.S2CRankView.bind(this))
                }, this)
            }
        }
        this.node.getChildByName('bounsArea').getComponent(filedBounsArea).init(myData)
    }

    getBonus() {

    }

    onClose() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        DataManager.myBattleFiledConfig.soliders = []
        DataManager.myBattleFiledConfig.card = []
        NetEventDispatcher.removeListener(NetEvent.S2CRankView, this.S2CRankView.bind(this))
    }

    // update (dt) {}
}
