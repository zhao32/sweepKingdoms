// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import packManager from "../pack/packManager";
import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    btnLabel: cc.Label = null;

    @property(cc.Label)
    tipDisplay0: cc.Label = null;

    @property(cc.Label)
    tipDisplay1: cc.Label = null;

    @property({ type: cc.SpriteFrame, displayName: '石槽图' })
    runePotsFrame: cc.SpriteFrame[] = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    /**石槽状态 0 未解锁 1 已解锁*/
    _state: number

    _heroid: any

    _idx: number

    start() {

    }



    init(state, idx, heroid) {
        this._state = state
        this._heroid = heroid
        this._idx = idx
        console.log(`state:` + state)
        // ResManager.loadItemIcon(`hero/runePot${state}`, this.node.getChildByName('rune'))
        this.node.getChildByName('rune').getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[state]
        if (state == 0) {
            this.btnLabel.string = '开启'
            this.tipDisplay0.string = `未开启`
        } else if (state == 1) {
            this.btnLabel.string = '升级'
            this.tipDisplay0.string = `已开启`
        }

        this.node.getChildByName('rune').on(cc.Node.EventType.TOUCH_END, () => {
            if (state == 1) {
                console.log(`获取符石列表`)
                console.log('RuneList:' + JSON.stringify(packManager.getInstance().getRuneList()))
            }

        }, this)

    }

    doClick() {
        if (this._state == 0) {
            console.log(`请求开启石槽：` + this._heroid + '   ' + this._idx)
            MyProtocols.send_C2SOpenRuneSlot(DataManager._loginSocket, this._heroid, this._idx)
        } else if (this._state == 1) {
           
        }

    }

    // update (dt) {}
}
