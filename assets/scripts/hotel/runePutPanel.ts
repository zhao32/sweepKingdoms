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

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    runePfb: cc.Prefab = null;

    @property(cc.Label)
    noteDisplay: cc.Label = null;


    _idx: number

    _selectRuneId: number

    _cardId

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CRunePutup, this.S2CRunePutup, this)
    }

    protected onDestroy(): void {
        NetEventDispatcher.removeListener(NetEvent.S2CRunePutup, this.S2CRunePutup, this)
    }

    S2CRunePutup(data) {
        console.log(`石符安装返回`)
        console.log(JSON.stringify(data))
        ViewManager.instance.showToast(`安装石符成功`)
        // {"card_id":1,"pos_index":1,"rune_id":5001,"rune_level":0,"back_items":[],"fight":2796}
        // {"card_id":153434,"pos_index":1,"rune_id":5009,"rune_level":0,"back_items":[],"fight":1914}

        for (let i = 0; i < DataManager.instance.curRuneList.length; i++) {
            let item = this.contect.children[i]
            ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].icon}`, item.getChildByName(`icon`))
            item.getChildByName('count').getComponent(cc.Label).string = 'x' + DataManager.instance.curRuneList[i].num
            let lv = parseInt(DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].quality) + 1
            item.getChildByName('level').getComponent(cc.Label).string = 'lv:' + lv
        }
        // this._data.runePutup[this._idx] = data.rune_id
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if(DataManager.cardsList[i].id == this._cardId){
                DataManager.cardsList[i].runePutup[this._idx] = data.rune_id
            }
        }
        this.onCloseHandler()

    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    // {"uuid":"","template_id":5001,"enhance_level":0,"stars":0,"num":452,"bagId":4,"hpEx":0,"atkEx":0,"defEx":0,"attrEx":[],"unitAttr":{"id":0,"num":0},"exp":0}
    open(cardId, idx) {
        this._cardId = cardId
        // this._cardId = data.id
        this._idx = idx
        this.node.active = true
        // this.selectName = 0
        this.noteDisplay.string = ''
        // console.log('_cardId:'+ data.id)


        DataManager.instance.curRuneList = []
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            if (DataManager.instance.itemsList[i].template_id >= 5001 && DataManager.instance.itemsList[i].template_id <= 5040) {
                DataManager.instance.curRuneList.push(DataManager.instance.itemsList[i])
            }
        }

        this.contect.removeAllChildren()
        for (let i = 0; i < DataManager.instance.curRuneList.length; i++) {
            let item = cc.instantiate(this.runePfb)
            item.parent = this.contect
            ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].icon}`, item.getChildByName(`icon`))
            item.getChildByName('count').getComponent(cc.Label).string = 'x' + DataManager.instance.curRuneList[i].num
            let lv = parseInt(DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].quality) + 1

            item.getChildByName('level').getComponent(cc.Label).string = 'lv:' + lv
            item.getChildByName('count').color = cc.Color.WHITE
            item.getChildByName('level').color = cc.Color.WHITE

            item.getChildByName('light').active = false

            item.on(cc.Node.EventType.TOUCH_END, () => {
                for (let j = 0; j < this.contect.children.length; j++) {
                    let icon = this.contect.children[j]
                    icon.getChildByName('light').active = false
                    icon.getChildByName('count').color = cc.Color.WHITE
                    icon.getChildByName('level').color = cc.Color.WHITE
                }
                item.getChildByName('light').active = true

                item.getChildByName('count').color = cc.Color.YELLOW
                item.getChildByName('level').color = cc.Color.YELLOW
                this.noteDisplay.string = DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].name
                this._selectRuneId = DataManager.instance.curRuneList[i].template_id
            })
        }
    }

    onCloseHandler() {
        DataManager.wndHotelDetail.updateRunes()
        this.node.active = false

    }

    onCancel() {
        this.node.active = false
    }

    // (senderSocket, p_card_id, p_pos_index, p_rune_id)
    onChange() {
        if (!this._selectRuneId) {
            ViewManager.instance.showToast(`请选择要安装的石符`)
            return
        }
        // console.log(`this._cardId:` + this._cardId)
        MyProtocols.send_C2SRunePutup(DataManager._loginSocket, this._cardId, this._idx, this._selectRuneId)
    }

    // update (dt) {}
}
