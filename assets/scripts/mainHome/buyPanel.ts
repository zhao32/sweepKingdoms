// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";

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
    }

    init() {
        this.numLabel.string = "0"
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
        MyProtocols.send_C2SMallBuy(DataManager._loginSocket, 0, this.num)
    }

    onHideHandler() {
        this.node.active = false

    }


    // update (dt) {}
}
