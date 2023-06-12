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

    @property(cc.Label)
    rankLabel: cc.Label = null;

    @property(cc.Label)
    honerLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _data: any

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CRankLike, this.S2CRankLike.bind(this))
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


    }

    btnExchange() {
        /**领取功勋值 */
        console.log('领取功勋值')
        MyProtocols.send_C2SRankLike(DataManager._loginSocket, this._data)
    }

    S2CRankLike(data){
        console.log(`领取功勋值返回`)
        console.log(JSON.stringify(data))

    }

    // update (dt) {}
}
