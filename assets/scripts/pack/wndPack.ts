// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import { Logger } from "../utils/Manager/Logger";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import infoPanel from "./infoPanel";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.ToggleContainer })
    ToggleContainer: cc.ToggleContainer = null;

    @property({ type: cc.Node })
    contect: cc.Node = null;

    @property({ type: cc.Prefab })
    renderPfb: cc.Prefab = null;

    @property({ type: cc.Prefab })
    itemPfb: cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let ToggleList = this.ToggleContainer.getComponentsInChildren(cc.Toggle)
        ToggleList[0].isChecked = true
        for (let i = 0; i < ToggleList.length; i++) {
            ToggleList[i].node.on('toggle', (event: cc.Toggle) => {
                if (event.isChecked == true) {
                    console.log('选中' + i)
                    this.contect.removeAllChildren()
                    let list = this[`list${i}`]
                    for (let j = 0; j < list.length; j++) {
                        let render = cc.instantiate(this.renderPfb)
                        render.removeAllChildren()
                        render.parent = this.contect
                        for (let k = 0; k < list[j].length; k++) {
                            let item = cc.instantiate(this.itemPfb)
                            if (list[j][k].bagId == 4) {
                                // if (list[j][k].template_id - 4000 >= 0) {
                                //     ResManager.loadItemIcon(`UI/UnitsEquips/${list[j][k].template_id}`, item.getChildByName('pic'))

                                // } else {
                                //     ResManager.loadItemIcon(`UI/items/${list[j][k].template_id}`, item.getChildByName('pic'))

                                // }
                                ResManager.loadItemIcon(`UI/UnitsEquips/${list[j][k].template_id}`, item.getChildByName('pic'))
                            } else if (list[j][k].bagId == 1) {
                                console.log(JSON.stringify(list[j][k]))
                                ResManager.loadItemIcon(`UI/items/${DataManager.GameData.packItems[list[j][k].template_id].icon}`, item.getChildByName('pic'))

                            } else if (list[j][k].bagId == 3) {
                                let skillSt = DataManager.GameData.SkillStudy[list[j][k].template_id]
                                ResManager.loadItemIcon(`skillats/${skillSt.name}`, item.getChildByName('pic'))

                                if (skillSt.type == 1) {
                                    ResManager.loadItemIcon(`skillats/红`, item)
                                } else if (skillSt.type == 2) {
                                    ResManager.loadItemIcon(`skillats/黄`, item)
                                } else if (skillSt.type == 3) {
                                    ResManager.loadItemIcon(`skillats/蓝`, item)
                                }

                                // ResManager.loadItemIcon(`UI/items/${DataManager.GameData.packItems[list[j][k].template_id].icon }`, item.getChildByName('pic'))

                            } else {
                                ResManager.loadItemIcon(`UI/items/${list[j][k].template_id}`, item.getChildByName('pic'))
                            }
                            item.parent = render
                            item.on(cc.Node.EventType.TOUCH_END, () => {
                                this.node.getChildByName('tipArea').active = true
                                this.node.getChildByName('tipArea').getComponent(infoPanel).init(list[j][k])
                            }, this)
                        }
                    }
                }
            }, this)
        }
        // MyProtocols.send_C2SBagItems(DataManager._loginSocket)
        this.initBagItems()

    }

    setPanelInfo(data) {

    }

    init() {
        this.node.getChildByName('tipArea').active = false
        // NetEventDispatcher.addListener(NetEvent.S2CBagItems, this.S2CBagItems, this)
    }
    list0 = []
    list1 = []
    list2 = []
    list3 = []
    list4 = []

    initBagItems() {
        // console.log(JSON.stringify(retObj))
        let itemsList = DataManager.instance.itemsList
        this.contect.removeAllChildren()
        let keyGiftList = Object.keys(DataManager.GameData.packGift)
        let keyItemList = Object.keys(DataManager.GameData.packItems)
        let keySkillList = Object.keys(DataManager.GameData.packSkills)

        console.log('keyItemList:' + JSON.stringify(keyItemList))
        for (let i = 0; i < itemsList.length; i++) {
            if (itemsList[i].bagId == 0) {//消耗品
                if (keyGiftList.indexOf(itemsList[i].template_id.toString()) != -1) {
                    this.list0.push(itemsList[i])
                }
            } else if (itemsList[i].bagId == 1) {//装备
                console.log('template_id:' + itemsList[i].template_id)
                if (keyItemList.indexOf(itemsList[i].template_id.toString()) != -1) {
                    this.list1.push(itemsList[i])
                }
            } else if (itemsList[i].bagId == 2) {//碎片
                if (keySkillList.indexOf(itemsList[i].template_id.toString()) != -1) {
                    this.list2.push(itemsList[i])
                }
            } else if (itemsList[i].bagId == 3) {//宝物
                this.list3.push(itemsList[i])
            } else if (itemsList[i].bagId == 4) {//道具
                this.list4.push(itemsList[i])
            }
        }

        console.log(JSON.stringify(this.list2))
        this.list0 = DataManager.group(this.list0, 4)
        this.list1 = DataManager.group(this.list1, 4)
        this.list2 = DataManager.group(this.list2, 4)
        this.list3 = DataManager.group(this.list3, 4)
        this.list4 = DataManager.group(this.list4, 4)

        for (let i = 0; i < this.list1.length; i++) {
            let render = cc.instantiate(this.renderPfb)
            render.removeAllChildren()
            render.parent = this.contect
            for (let j = 0; j < this.list1[i].length; j++) {
                let item = cc.instantiate(this.itemPfb)
                item.parent = render
            }
        }

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_PACK)
    }


    onClose() {
        // NetEventDispatcher.removeListener(NetEvent.S2CBagItems, this.S2CBagItems, this)
    }

    // update (dt) {}
}
