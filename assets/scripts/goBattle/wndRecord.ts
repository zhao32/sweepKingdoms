// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import GameUtil from "../utils/Manager/GameUtil";
import ViewManager from "../utils/Manager/ViewManager";

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
    renderPfb0: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // {"target_player_id":0,"target_player_name":"","is_positive":true,"is_success":1,"mine_point":70023,"type":1,"add_time":0,"gain":[10000,1]}
        this.node.getChildByName(`panel`).children[0].on(cc.Node.EventType.TOUCH_END, () => {
            this.node.getChildByName(`panel`).active = false
            this.node.getChildByName(`scrollView`).active = true
            this.contect.removeAllChildren()
            for (let i = 0; i < this.attList.length; i++) {
                let item = cc.instantiate(this.renderPfb0)
                item.parent = this.contect

                let str = `进攻` + this.attList[i].mine_point + '矿'
                str += this.attList[i].is_success == 1 ? '胜利，获取' : "失败，损失"
                str += this.attList[i].gain.length > 0 ? `金币${this.attList[i].gain[0]}` : "金币0"
                item.getChildByName('str').getComponent(cc.Label).string = str
            }
        }, this)

        this.node.getChildByName(`panel`).children[1].on(cc.Node.EventType.TOUCH_END, () => {
            this.node.getChildByName(`panel`).active = false
            this.node.getChildByName(`scrollView`).active = true
            this.contect.removeAllChildren()
            for (let i = 0; i < this.defineList.length; i++) {
                let item = cc.instantiate(this.renderPfb0)
                item.parent = this.contect

                let str ='防御'+ this.defineList[i].target_player_name+ `进攻我的` + this.attList[i].mine_point + '矿'
                str += this.attList[i].is_success == 1 ? '胜利，获取' : "失败，损失"
                str += this.attList[i].gain.length > 0 ? `金币${this.attList[i].gain[0]}` : "金币0"
                item.getChildByName('str').getComponent(cc.Label).string = str

            }
        }, this)
    }

    init() {
        MyProtocols.send_C2SMineHistory(DataManager._loginSocket)
        NetEventDispatcher.addListener(NetEvent.S2CMineHistory, this.S2CMineHistory, this)

        this.node.getChildByName(`panel`).active = true
        this.node.getChildByName(`scrollView`).active = false

    }

    attList = []

    defineList = []

    S2CMineHistory(data) {
        console.log('日志返回：' + JSON.stringify(data))
        for (let i = 0; i < data.records.length; i++) {
            if (data.records[i].type == 1) {
                this.attList.push(data.records[i])
            } else {
                this.defineList.push(data.records[i])
            }
        }
        data.records
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CMineHistory, this.S2CMineHistory, this)

    }

    // update (dt) {}
}
