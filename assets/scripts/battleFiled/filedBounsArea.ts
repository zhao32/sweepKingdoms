// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import runeExRender from "./runeExRender";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    exBonusPfb: cc.Prefab = null;

    @property(cc.Label)
    rankLabel: cc.Label = null;

    @property(cc.Label)
    honerLabel: cc.Label = null;

    @property(cc.Label)
    honerProLabel: cc.Label = null;

    @property(cc.ProgressBar)
    proBar: cc.ProgressBar = null;

    getHoner: number = 0

    schFun: Function

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _data: any

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CRankLike, this.S2CRankLike,this)
        NetEventDispatcher.addListener(NetEvent.S2CArenaExchange, this.S2CArenaExchange,this)


        // S2CArenaExchangeList
    }

    // let myData = {
    //     playerId: DataManager.playData.id,
    //     rank: retObj.my_rank,
    //     name: DataManager.playData.name,
    //     rank_type: retObj.rank_type,
    //     icon: 0,
    //     last_time: retObj.last_time,
    //     myHonerBouns:0
    // }
    S2CArenaExchangeList(data) {
        console.log('请求兑换列表返回')
        console.log(JSON.stringify(data))

    }

    init(data) {
        NetEventDispatcher.addListener(NetEvent.S2CArenaExchangeList, this.S2CArenaExchangeList,this)
        this.unschedule(this.schFun)

        this._data = data
        // ResManager.loadItemIcon(`hero/icon/${data.icon}`, this.head)

        if (data.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.head)
        } else if (data.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.head)
        } else {
            let defaultData = DataManager.GameData.Cards[data.icon]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        }


        this.rankLabel.string = `${data.rank}`;

        this.honerLabel.string = `现有荣耀值：${DataManager.playData.honor}`;

        let secend = DataManager.instance.getDateDis(data.last_time, new Date().getTime())
        let preHoner = data.myHonerBouns / 10 / 60
        this.getHoner = Math.min(50000, preHoner * secend)

        // if (this.getHoner == 50000) {
        //     this.honerProLabel.string = `${this.getHoner}/50000`
        // } else {
        //     this.schFun = () => {
        //         this.getHoner += preHoner
        //         this.getHoner = Math.min(50000, this.getHoner)
        //         if (this.getHoner == 50000) {
        //             this.unschedule(this.schFun)
        //         }
        //         this.honerProLabel.string = `${this.getHoner}/50000`
        //     }
        //     this.schedule(this.schFun,1)
        // }

        this.honerProLabel.string = `${Math.floor(this.getHoner)}/50000`
        this.proBar.progress = Math.floor(this.getHoner) / 50000

        this.schFun = () => {
            this.getHoner += preHoner
            this.getHoner = Math.min(50000, this.getHoner)
            if (this.getHoner == 50000) {
                this.unschedule(this.schFun)
            }
            this.honerProLabel.string = `${Math.floor(this.getHoner)}/50000`
            this.proBar.progress = Math.floor(this.getHoner) / 50000
        }
        this.schedule(this.schFun, 1)

        console.log('getHoner:' + this.getHoner)

        // DataManager. 
        let bonusData = [
            {
                "item": 5001,
                "name": "暴击符石",
                "gamemone": 75,
                icon:'sy_runeicon_00',
            },
            {
                "item": 5002,
                "name": "致命符石",
                "gamemone": 75,
                icon:'sy_runeicon_10',

            },
            {
                "item": 5003,
                "name": "坚毅符石",
                "gamemone": 75,
                icon:'sy_runeicon_20',
            },
            {
                "item": 5004,
                "name": "韧性符石",
                "gamemone": 75,
                icon:'sy_runeicon_30',
            }
        ]


        this.contect.removeAllChildren()
        for (let i = 0; i < bonusData.length; i++) {
            let render = cc.instantiate(this.exBonusPfb)
            render.parent = this.contect
            render.getComponent(runeExRender).init(bonusData[i])

            // render.on(cc.Node.EventType.TOUCH_END, () => {
            //     console.log('---------点击兑换----------')
            // }, this)
        }


    }

    btnExchange() {
        /**领取功勋值 */
        console.log('领取功勋值')
        MyProtocols.send_C2SRankLike(DataManager._loginSocket, this.getHoner)
    }

    S2CRankLike(data) {
        console.log(`领取功勋值返回`)
        console.log(JSON.stringify(data))
        this.getHoner = 0
        this.proBar.progress = 0
        this.honerProLabel.string = `${Math.floor(this.getHoner)}/50000`
        this.honerLabel.string = '现有荣耀值：' + String(DataManager.playData.honor)

    }

    S2CArenaExchange(data) {
        console.log(`兑换符石返回`)
        console.log(JSON.stringify(data))
        // {"slot_index":5003,"buy_count":1,"rewards":{"item_template_id":5003,"item_count":50}}
        ViewManager.instance.showToast(`兑换符石成功`)
        this.honerLabel.string = `现有荣耀值：${DataManager.playData.honor}`;

    }


    // update (dt) {}
}
