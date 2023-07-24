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
    itemPfb: cc.Prefab = null;

    @property(cc.Label)
    noteDisplay: cc.Label = null;

    @property(cc.Label)
    btnLabel: cc.Label = null;

    _cardId: number

    _idx: number

    _selectRuneId: number

    _data

    start() {
        // NetEventDispatcher.addListener(NetEvent.S2CRunePutup, this.C2SRunePutup, this)
    }

    protected onDestroy(): void {
        // NetEventDispatcher.removeListener(NetEvent.S2CRunePutup, this.C2SRunePutup, this)
    }

    // C2SRunePutup(data) {
    //     console.log(`石符安装返回`)
    //     console.log(JSON.stringify(data))
    //     ViewManager.instance.showToast(`安装石符成功`)
    //     // {"card_id":1,"pos_index":1,"rune_id":5001,"rune_level":0,"back_items":[],"fight":2796}


    //     for (let i = 0; i < DataManager.instance.curRuneList.length; i++) {
    //         let item = this.contect.children[i]
    //         ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].icon}`, item.getChildByName(`icon`))
    //         item.getChildByName('count').getComponent(cc.Label).string = 'x' + DataManager.instance.curRuneList[i].num
    //         let lv = parseInt(DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].quality) + 1
    //         item.getChildByName('level').getComponent(cc.Label).string = 'lv:' + lv
    //     }
    //     this._data.runePutup[this._idx] = data.rune_id
    //     this.onCloseHandler()

    // }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    // {"uuid":"","template_id":5001,"enhance_level":0,"stars":0,"num":452,"bagId":4,"hpEx":0,"atkEx":0,"defEx":0,"attrEx":[],"unitAttr":{"id":0,"num":0},"exp":0}
    open(data, idx) {
        this._data = data
        this._cardId = data.id
        this._idx = idx
        this.node.active = true
        // this.selectName = 0
        this.noteDisplay.string = ''
        this.contect.removeAllChildren()

        if (idx == 0) {//兵器

        } else if (idx == 1) {//盔甲

        }

        let keyEquipList = Object.keys(DataManager.GameData.Equips)

        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            let template_id = DataManager.instance.itemsList[i].template_id.toString()

            if (DataManager.instance.itemsList[i].bagId == 1 && keyEquipList.indexOf(template_id) != -1) {
                if (DataManager.GameData.Equips[template_id].position == idx) {

                    let item = cc.instantiate(this.itemPfb)
                    item.parent = this.contect
                    ResManager.loadItemIcon(`UI/equips/${DataManager.GameData.Equips[template_id].name}`, item.getChildByName(`icon`))
                    item.getChildByName('count').getComponent(cc.Label).string = 'x' + DataManager.instance.itemsList[i].num
                    //     let lv = parseInt(DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].quality) + 1
                    //     item.getChildByName('level').getComponent(cc.Label).string = 'lv:' + lv
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
                        this.noteDisplay.string = DataManager.GameData.Equips[template_id].name
                        this._selectRuneId = DataManager.instance.itemsList[i].uuid
                        item.getChildByName('level').getComponent(cc.Label).string = ''

                    })

                }
            }

        }

        // if (data.equips[idx] == "0") {
        //     this.btnLabel.string = `装备`
        // } else {
        //     this.btnLabel.string = `遗忘`
        // }
        // for (let i = 0; i < DataManager.instance.curRuneList.length; i++) {
        //     let item = cc.instantiate(this.itemPfb)
        //     item.parent = this.contect
        //     ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].icon}`, item.getChildByName(`icon`))
        //     item.getChildByName('count').getComponent(cc.Label).string = 'x' + DataManager.instance.curRuneList[i].num
        //     let lv = parseInt(DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].quality) + 1

        //     item.getChildByName('level').getComponent(cc.Label).string = 'lv:' + lv
        //     item.getChildByName('count').color = cc.Color.WHITE
        //     item.getChildByName('level').color = cc.Color.WHITE

        //     item.getChildByName('light').active = false

        //     item.on(cc.Node.EventType.TOUCH_END, () => {
        //         for (let j = 0; j < this.contect.children.length; j++) {
        //             let icon = this.contect.children[j]
        //             icon.getChildByName('light').active = false
        //             icon.getChildByName('count').color = cc.Color.WHITE
        //             icon.getChildByName('level').color = cc.Color.WHITE
        //         }
        //         item.getChildByName('light').active = true

        //         item.getChildByName('count').color = cc.Color.YELLOW
        //         item.getChildByName('level').color = cc.Color.YELLOW
        //         this.noteDisplay.string = DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].name
        //         this._selectRuneId = DataManager.instance.curRuneList[i].template_id
        //     })
        // }
    }

    onCloseHandler() {
        // DataManager.wndHotelDetail.updateRunes()
        this.node.active = false

    }

    onCancel() {
        this.node.active = false
    }

    // (senderSocket, p_card_id, p_pos_index, p_rune_id)
    onChange() {
        if (!this._selectRuneId) {
            ViewManager.instance.showToast(`请选择要安装的装备`)
            return
        }
        MyProtocols.send_C2SCardTakeOnItem(DataManager._loginSocket, this._cardId, this._selectRuneId)
        this.onCloseHandler()
    }

    // update (dt) {}
}
