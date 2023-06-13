// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _data: any

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CRankLike, this.S2CRankLike.bind(this))

        NetEventDispatcher.addListener(NetEvent.S2CArenaExchange, this.S2CArenaExchange.bind(this))

    }

    // let myData = {
    //     playerId: DataManager.playData.id,
    //     rank: retObj.my_rank,
    //     name: DataManager.playData.name,
    //     rank_type: retObj.rank_type,
    //     icon: 0
    // }

    init(data) {
        this._data = data
        ResManager.loadItemIcon(`hero/icon/${data.icon}`, this.head)
        this.rankLabel.string = `${data.rank}`;

        this.honerLabel.string = `现有荣耀值：${DataManager.playData.honor}`;

        let bonusData = [
            {
                "item": 5001,
                "gamemone": 75
            },
            {
                "item": 5002,
                "gamemone": 75
            },
            {
                "item": 5003,
                "gamemone": 75
            },
            {
                "item": 5004,
                "gamemone": 75
            }
        ]


        this.contect.removeAllChildren()
        for (let i = 0; i < bonusData.length; i++) {
            let render = cc.instantiate(this.exBonusPfb)
            render.parent = this.contect

            render.on(cc.Node.EventType.TOUCH_END, () => {
                console.log('---------点击兑换----------')
                this.ExchangeRune(bonusData[i].item, 50)
            }, this)
        }


    }

    btnExchange() {
        /**领取功勋值 */
        console.log('领取功勋值')
        MyProtocols.send_C2SRankLike(DataManager._loginSocket, 800)
    }

    S2CRankLike(data) {
        console.log(`领取功勋值返回`)
        console.log(JSON.stringify(data))
        this.honerLabel.string = String(DataManager.playData.honor) 

    }

    S2CArenaExchange(data) {
        console.log(`兑换符石返回`)
        console.log(JSON.stringify(data))

    }
    ExchangeRune(id, num) {

        console.log('id:'+id)
        console.log('num:'+num)
        MyProtocols.send_C2SArenaExchange(DataManager._loginSocket, id, num)
    }


    // update (dt) {}
}
