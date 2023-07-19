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

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel1: cc.Label = null;

    @property(cc.Label)
    nameLabel2: cc.Label = null;

    @property(cc.Label)
    decLabel: cc.Label = null;

    @property(cc.Label)
    numLabel: cc.Label = null;

    @property(cc.Label)
    moneyLabel: cc.Label = null;

    @property(cc.Node)
    pic: cc.Node = null;

    num: number = 0

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CMallBuy, this.S2CMallBuy, this)
    }

    S2CMallBuy(data) {
        console.log('道具购买返回' + JSON.stringify(data))
        ViewManager.instance.showToast(`购买成功`)
    }

    // {"name":"人参","mods":{"stamina":10},"quality":3,"icon":"1019.png","des":"你发虚的身体迎风打了个哆嗦，又能挺枪再战5个回合。使用后增加10点耐力，竞技场挑战消耗耐力"}
    _idx
    init(data, idx) {
        this._idx = idx
        this.num = 0
        console.log(JSON.stringify(data))
        this.numLabel.string = "0"
        this.nameLabel1.string = this.nameLabel2.string = data.name
        this.decLabel.string = data.des
        this.moneyLabel.string = 'x' + data.price
        // ResManager.loadItemIcon(`UI/items/${data.icon}`, this.pic)
        ResManager.loadItemIcon(`UI/prop/${data.name}`, this.pic)


        // this.moneyLabel = 
    }

    onReduceOne() {
        if (this.num > 0) {
            this.num--
        }
        this.numLabel.string = `x${this.num}`
    }

    onPlusOne() {
        this.num++
        this.numLabel.string = `x${this.num}`
    }

    onPlusTen() {
        this.num += 10
        this.numLabel.string = `x${this.num}`

    }

    onReduceTen() {
        if (this.num >= 10) {
            this.num -= 10
        } else {
            this.num = 0
        }
        this.numLabel.string = `x${this.num}`
    }

    onBuyHandler() {
        if (this.num == 0) {
            ViewManager.instance.showToast(`请选择购买数量`)
            return
        }
        console.log(`this._idx:` + this._idx)
        MyProtocols.send_C2SMallBuy(DataManager._loginSocket, this._idx, this.num)
    }

    onHideHandler() {
        this.node.active = false

    }


    // update (dt) {}
}
