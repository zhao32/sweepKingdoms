// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AlertLayer from "../common/AlertLayer";
import { NetEvent } from "../net/NetEvent";
// import packManager from "../pack/packManager";
import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";
import runePutPanel from "./runePutPanel";

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

    _data

    start() {
        this.node.getChildByName('rune').on(cc.Node.EventType.TOUCH_END, () => {
            if (this._state == 1) {
                console.log(`获取符石列表`)
                console.log('RuneList:' + JSON.stringify(DataManager.instance.curRuneList))
                console.log('data:' + JSON.stringify(this._data))
                if (this._data.runePutup[this._idx] == 0) {
                    DataManager.wndHotelDetail.node.getChildByName('runePutPanel').getComponent(runePutPanel).open(this._heroid, this._idx)
                } else {
                    let self = this
                    var _alert_layer = cc.instantiate(DataManager.Main.AlertLayer);
                    cc.Canvas.instance.node.addChild(_alert_layer);
                    _alert_layer.getComponent(AlertLayer).init("是否卸载此符石？",
                        function () {
                            // MyProtocols.send_C2SCardTakeOffItem(DataManager._loginSocket, data.id, idx);//发送删除邮件数据请求
                            MyProtocols.send_C2SDumpRuneSlot(DataManager._loginSocket, self._heroid, self._idx)
                            _alert_layer.destroy();
                        });
                }

            }

        }, this)

    }



    init(state, idx, data) {
        // console.log(`data:` + JSON.stringify(data))
        this._data = data
        this._state = state
        this._heroid = data.id
        this._idx = idx
        console.log(`state:` + state)
        // ResManager.loadItemIcon(`hero/runePot${state}`, this.node.getChildByName('rune'))
        this.node.getChildByName('rune').getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[state]
        if (state == 0) {
            this.btnLabel.string = '开启'
            this.tipDisplay0.string = `未开启`
        } else if (state == 1) {
            this.btnLabel.string = '升级'
            this.tipDisplay0.string = `已开启 承载力${data.runeLevel[idx]}`
        }

        if (data.runeUnlock[idx - 1] && data.runeUnlock[idx - 1] > 0) {
            this.node.getChildByName(`btn2`).active = true
        } else {
            this.node.getChildByName(`btn2`).active = false
        }

        if (idx == 0) {
            this.node.getChildByName(`btn2`).active = true
            this.btnLabel.string = '升级'
        }

        if (data.runeLevel[idx] == 999) {
            this.node.getChildByName(`btn2`).getComponent(cc.Button).interactable = false
        }


        // if (data.runePutup[idx] < 1000) {
        //     this.node.getChildByName('Mask').children[0].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[data.runePutup[i]]
        // } else {
        //     let rune = this.node.getChildByName('cao1').children[i].children[0]
        //     rune.active = true
        //     console.log('data.runePutup[i]:' + data.runePutup[i])
        //     ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[data.runePutup[i]].icon}`, rune)
        // }
        let rune = this.node.getChildByName('Mask').children[0]
        if (data.runePutup[idx] > 1000) {
            rune.active = true
            console.log('data.runePutup[i]:' + data.runePutup[idx])
            ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[data.runePutup[idx]].icon}`, rune)
            this.tipDisplay1.string = DataManager.GameData.Runes[data.runePutup[idx]].name
        } else {
            rune.active = false
        }

    }

    doClick() {
        if (this._state == 0) {
            console.log(`请求开启石槽：` + this._heroid + '   ' + this._idx)
            // MyProtocols.send_C2SOpenRuneSlot(DataManager._loginSocket, this._heroid, this._idx)
            DataManager.wndHotelDetail.openRuneOpenPanel(this._data, this._idx)
        } else if (this._state == 1) {
            DataManager.wndHotelDetail.upRuneSoltPanel(this._data, this._idx)

        }

    }

    // update (dt) {}
}
