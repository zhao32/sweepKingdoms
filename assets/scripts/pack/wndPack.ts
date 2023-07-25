// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GetRewardPanel from "../mail/GetRewardPanel";
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

    @property({ type: cc.Prefab })
    getRewardPanel_prefab: cc.Prefab = null;


    list0 = []
    list1 = []
    list2 = []
    list3 = []
    list4 = []


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    /**第几个分类 */
    curBagId: number = 0
    /**当前详情页的数据 */
    curData

    start() {
        /**礼包 */
        let keyGiftList = Object.keys(DataManager.GameData.Boxes)
        /**消耗品 */
        let keyConsList = Object.keys(DataManager.GameData.Consumes)
        /**装备 */
        let keyEquipList = Object.keys(DataManager.GameData.Equips)

        let keyEquipFragsList = Object.keys(DataManager.GameData.EquipFrags)

        let keyItemList = Object.keys(DataManager.GameData.Items)
        let keySkillList = Object.keys(DataManager.GameData.packSkills)

        let keyRuneList = Object.keys(DataManager.GameData.Runes)



        let ToggleList = this.ToggleContainer.getComponentsInChildren(cc.Toggle)
        ToggleList[0].isChecked = true
        for (let i = 0; i < ToggleList.length; i++) {
            ToggleList[i].node.on('toggle', (event: cc.Toggle) => {
                if (event.isChecked == true) {
                    console.log('选中' + i)
                    this.curBagId = i
                    this.node.getChildByName('tipArea').active = false
                    this.contect.removeAllChildren()
                    let list = this[`list${i}`]
                    for (let j = 0; j < list.length; j++) {
                        let item = cc.instantiate(this.itemPfb)
                        let template_id = list[j].template_id.toString()
                        let has = false
                        if (i == 0) {
                            if (keyGiftList.indexOf(template_id) != -1) {
                                has = true
                                ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Boxes[template_id].name}`, item.getChildByName('pic'))
                            }
                            if (keyConsList.indexOf(template_id) != -1) {
                                has = true
                                ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Consumes[template_id].name}`, item.getChildByName('pic'))
                            }
                        } else if (i == 1) {
                            if (keyEquipList.indexOf(template_id) != -1) {
                                has = true
                                ResManager.loadItemIcon(`UI/equips/${DataManager.GameData.Equips[template_id].name}`, item.getChildByName('pic'))
                            }
                        } else if (i == 2) {
                            if (keyEquipFragsList.indexOf(template_id) != -1) {
                                has = true
                                ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.EquipFrags[template_id].name}`, item.getChildByName('pic'))
                            }
                        } else if (i == 3) {
                            let skillSt = DataManager.GameData.SkillStudy[template_id]
                            if (skillSt) {
                                has = true
                                ResManager.loadItemIcon(`skillats/${skillSt.name}`, item.getChildByName('pic'))
                                if (skillSt.type == 1) {
                                    ResManager.loadItemIcon(`skillats/红`, item)
                                } else if (skillSt.type == 2) {
                                    ResManager.loadItemIcon(`skillats/黄`, item)
                                } else if (skillSt.type == 3) {
                                    ResManager.loadItemIcon(`skillats/蓝`, item)
                                }
                            }

                        } else if (i == 4) {
                            // ResManager.loadItemIcon(`UI/UnitsEquips/${template_id}`, item.getChildByName('pic'))
                            if (keyItemList.indexOf(template_id) != -1) {
                                has = true
                                ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Items[template_id].name}`, item.getChildByName('pic'))
                            } else if (keyRuneList.indexOf(template_id) != -1) {
                                has = true
                                ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[template_id].icon}`, item.getChildByName('pic'))
                            }
                        }
                        if (has == true) {
                            item.parent = this.contect
                            item.on(cc.Node.EventType.TOUCH_END, () => {
                                this.node.getChildByName('tipArea').active = true
                                this.node.getChildByName('tipArea').getComponent(infoPanel).init(list[j])
                                this.curData = list[j]
                            }, this)
                        }

                    }
                }
            }, this)
        }
    }


    init() {
        this.initBagItems()
        this.node.getChildByName('tipArea').active = false
        NetEventDispatcher.addListener(NetEvent.S2CUseItem, this.S2CUseItem, this)
        NetEventDispatcher.addListener(NetEvent.S2CEmbryoUp, this.S2CEmbryoUp, this)
        NetEventDispatcher.addListener(NetEvent.S2CEquipRestore, this.S2CEquipRestore, this)
        NetEventDispatcher.addListener(NetEvent.S2CEquipFragCompose, this.S2CEquipFragCompose, this)

        

        /**礼包 */
        let keyGiftList = Object.keys(DataManager.GameData.Boxes)
        /**消耗品 */
        let keyConsList = Object.keys(DataManager.GameData.Consumes)

        let keyItemList = Object.keys(DataManager.GameData.Items)
        let keySkillList = Object.keys(DataManager.GameData.packSkills)

        this.curBagId = 0
        this.curData = this.list0[0]
        console.log('list0:' + JSON.stringify(this.list0))
        this.contect.removeAllChildren()
        for (let i = 0; i < this.list0.length; i++) {
            let render = cc.instantiate(this.itemPfb)
            render.parent = this.contect

            let template_id = this.list0[i].template_id.toString()
            if (keyGiftList.indexOf(template_id) != -1) {
                ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Boxes[template_id].name}`, render.getChildByName('pic'))
            }

            if (keyConsList.indexOf(template_id) != -1) {
                ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Consumes[template_id].name}`, render.getChildByName('pic'))
            }

            render.on(cc.Node.EventType.TOUCH_END, () => {
                this.node.getChildByName('tipArea').active = true
                this.node.getChildByName('tipArea').getComponent(infoPanel).init(this.list0[i])
            }, this)
        }
    }


    initBagItems() {
        this.list0 = []
        this.list1 = []
        this.list2 = []
        this.list3 = []
        this.list4 = []
        // console.log(JSON.stringify(retObj))
        let itemsList = DataManager.instance.itemsList
        this.contect.removeAllChildren()
        /**礼包 */
        let keyGiftList = Object.keys(DataManager.GameData.Boxes)
        /**消耗品 */
        let keyConsList = Object.keys(DataManager.GameData.Consumes)
        /**装备 */
        let keyEquipList = Object.keys(DataManager.GameData.Equips)

        let keyEquipFragsList = Object.keys(DataManager.GameData.EquipFrags)


        let keyItemList = Object.keys(DataManager.GameData.Items)
        let keySkillList = Object.keys(DataManager.GameData.packSkills)

        console.log('keyEquipList:' + JSON.stringify(keyEquipList))
        let hasCurData = false
        for (let i = 0; i < itemsList.length; i++) {
            if (itemsList[i].bagId == 0) {//礼包 消耗品
                console.log(`------礼包：--------`)
                console.log('template_id:' + itemsList[i].template_id)
                if (keyGiftList.indexOf(itemsList[i].template_id.toString()) != -1) {
                    this.list0.push(itemsList[i])
                }

                if (keyConsList.indexOf(itemsList[i].template_id.toString()) != -1) {
                    this.list0.push(itemsList[i])
                }
            } else if (itemsList[i].bagId == 1) {//装备
                if (keyEquipList.indexOf(itemsList[i].template_id.toString()) != -1) {
                    this.list1.push(itemsList[i])
                }
            } else if (itemsList[i].bagId == 2) {//碎片
                if (keyEquipFragsList.indexOf(itemsList[i].template_id.toString()) != -1) {
                    this.list2.push(itemsList[i])
                }
            } else if (itemsList[i].bagId == 3) {//技能
                this.list3.push(itemsList[i])
            } else if (itemsList[i].bagId == 4) {//道具
                this.list4.push(itemsList[i])
            }
            if (this.curData && this.curData.template_id == itemsList[i].template_id && this.curData.uuid == itemsList[i].uuid) {
                this.curData = itemsList[i]
                hasCurData = true
            }

        }
        if (!hasCurData) this.curData = null


        console.log('--list1-------' + this.list1.length)

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_PACK)
    }


    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CUseItem, this.S2CUseItem, this)
        NetEventDispatcher.removeListener(NetEvent.S2CEmbryoUp, this.S2CEmbryoUp, this)
        NetEventDispatcher.removeListener(NetEvent.S2CEquipRestore, this.S2CEquipRestore, this)
        NetEventDispatcher.addListener(NetEvent.S2CEquipFragCompose, this.S2CEquipFragCompose, this)

    }

    S2CEquipFragCompose(retObj){
        console.log(`符石合成返回` + JSON.stringify(retObj))
        ViewManager.instance.showToast(`符石合成成功`)

        this.reflash()
    }

    S2CEmbryoUp(retObj) {
        console.log(`胚体升级返回：` + JSON.stringify(retObj))
        // 胚体升级返回：{"uuid":"2945621338198016","lv":2}
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            if (retObj.uuid == DataManager.instance.itemsList[i].uuid) {
                DataManager.instance.itemsList[i].enhance_level = retObj.lv
            }
        }
        console.log('-------len1------------' + this.list1.length)
        this.reflash()
        console.log('-------len2------------' + this.list1.length)

        if (retObj.reward_item.length > 0) {
            var rewardPanel = cc.instantiate(this.getRewardPanel_prefab);
            cc.Canvas.instance.node.addChild(rewardPanel);
            rewardPanel.getComponent(GetRewardPanel)._itemlist = retObj.reward_item
        } else {
            ViewManager.instance.showToast(`胚体升级成功`)
        }
    }

    S2CEquipRestore(retObj) {
        console.log(`装备还原返回：` + JSON.stringify(retObj))
        this.reflash()

        if (retObj.reward_item.length > 0) {
            var rewardPanel = cc.instantiate(this.getRewardPanel_prefab);
            cc.Canvas.instance.node.addChild(rewardPanel);
            rewardPanel.getComponent(GetRewardPanel)._itemlist = retObj.reward_item
        } else {
            ViewManager.instance.showToast(`装备还原成功`)
        }
    }

    S2CUseItem(retObj) {
        console.log(`消耗品使用后返回：` + JSON.stringify(retObj))
        // {"reward_item":[{"template_id":2023,"bagId":1,"num":1}]}
        this.reflash()


        if (retObj.reward_item.length > 0) {
            var rewardPanel = cc.instantiate(this.getRewardPanel_prefab);
            cc.Canvas.instance.node.addChild(rewardPanel);
            rewardPanel.getComponent(GetRewardPanel)._itemlist = retObj.reward_item
        } else {
            ViewManager.instance.showToast(`道具使用成功`)
        }
    }

    reflash() {
        this.initBagItems()
        /**礼包 */
        let keyGiftList = Object.keys(DataManager.GameData.Boxes)
        /**消耗品 */
        let keyConsList = Object.keys(DataManager.GameData.Consumes)

        let keyEquipList = Object.keys(DataManager.GameData.Equips)


        let keyItemList = Object.keys(DataManager.GameData.Items)
        let keySkillList = Object.keys(DataManager.GameData.packSkills)
        let keyEquipFragsList = Object.keys(DataManager.GameData.EquipFrags)

        let keyRuneList = Object.keys(DataManager.GameData.Runes)


        this.contect.removeAllChildren()
        let list = this[`list${this.curBagId}`]
        for (let j = 0; j < list.length; j++) {
            let item = cc.instantiate(this.itemPfb)
            let has = false
            let template_id = list[j].template_id.toString()
            if (this.curBagId == 0) {
                if (keyGiftList.indexOf(template_id) != -1) {
                    has = true
                    ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Boxes[template_id].name}`, item.getChildByName('pic'))
                }
                if (keyConsList.indexOf(template_id) != -1) {
                    has = true
                    ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Consumes[template_id].name}`, item.getChildByName('pic'))
                }
            } else if (this.curBagId == 1) {
                if (keyEquipList.indexOf(template_id) != -1) {
                    has = true
                    ResManager.loadItemIcon(`UI/equips/${DataManager.GameData.Equips[template_id].name}`, item.getChildByName('pic'))
                }
            } else if (this.curBagId == 2) {
                if (keyEquipFragsList.indexOf(template_id) != -1) {
                    has = true
                    ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.EquipFrags[template_id].name}`, item.getChildByName('pic'))
                }
            } else if (this.curBagId == 3) {
                let skillSt = DataManager.GameData.SkillStudy[template_id]
                if (skillSt) {
                    ResManager.loadItemIcon(`skillats/${skillSt.name}`, item.getChildByName('pic'))
                    if (skillSt.type == 1) {
                        ResManager.loadItemIcon(`skillats/红`, item)
                    } else if (skillSt.type == 2) {
                        ResManager.loadItemIcon(`skillats/黄`, item)
                    } else if (skillSt.type == 3) {
                        ResManager.loadItemIcon(`skillats/蓝`, item)
                    }
                    has = true
                }

            } else if (this.curBagId == 4) {
                if (keyItemList.indexOf(template_id) != -1) {
                    has = true
                    ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Items[template_id].name}`, item.getChildByName('pic'))
                }else if (keyRuneList.indexOf(template_id) != -1) {
                    has = true
                    ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[template_id].icon}`, item.getChildByName('pic'))
                }
            }
            if (has) {
                item.parent = this.contect
                item.on(cc.Node.EventType.TOUCH_END, () => {
                    this.node.getChildByName('tipArea').active = true
                    this.node.getChildByName('tipArea').getComponent(infoPanel).init(list[j])
                    this.curData = list[j]
                }, this)
            }

        }
        if (!this.curData) {
            this.node.getChildByName('tipArea').active = false
        } else if (this.curData.num > 0) {
            this.node.getChildByName('tipArea').getComponent(infoPanel).init(this.curData)
        } else {
            this.node.getChildByName('tipArea').active = false
        }
    }
    // update (dt) {}
}
