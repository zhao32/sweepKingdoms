// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    countLabel: cc.Label = null;

    @property(cc.RichText)
    richLabel: cc.RichText = null;

    @property(cc.Label)
    btnLabel0: cc.Label = null;

    @property(cc.Label)
    btnLabel1: cc.Label = null;

    @property(cc.Node)
    pic: cc.Node = null;

    start() {

    }

    // "4000": {
    //     "attrs": {
    //       "atk": 9
    //     },
    //     "name": "精兵铁剑",
    //     "require_level": 2,
    //     "id": 4000,
    //     "quality": 1,
    //     "icon": "4000.png",
    //     "des": "普通军械，生铁打造，略显笨拙。低阶步兵的进阶材料之一。"
    //   },

    // {"uuid":"","template_id":4100,"enhance_level":0,"stars":0,"num":148,"bagId":4,"hpEx":0,"atkEx":0,"defEx":0,"attrEx":[],"unitAttr":{"id":0,"num":0},"exp":0}
    _data
    init(data) {
        console.log(JSON.stringify(data))
        /**礼包 */
        let keyGiftList = Object.keys(DataManager.GameData.Boxes)
        /**消耗品 */
        let keyConsList = Object.keys(DataManager.GameData.Consumes)
        /**装备 */
        let keyEquipList = Object.keys(DataManager.GameData.Equips)
        let keyEquipFragsList = Object.keys(DataManager.GameData.EquipFrags)

        let keyRuneList = Object.keys(DataManager.GameData.Runes)


        let template_id = data.template_id.toString()
        this.countLabel.string = 'x' + data.num

        let defaultData
        this.node.getChildByName(`op`).active = true
        this.node.getChildByName(`op`).children[0].active = true
        this.node.getChildByName(`op`).children[1].active = true
        this.node.getChildByName(`op`).children[0].x = -115
        this.node.getChildByName(`op`).children[1].x = 115
        this.node.getChildByName(`consume`).active = false
        this._data = data
        if (data.bagId == 0) {//宝箱
            if (keyGiftList.indexOf(template_id) != -1) {
                this.btnLabel0.string = `打开`
                this.btnLabel1.string = `打开x${data.num}`
                defaultData = DataManager.GameData.Boxes[data.template_id]
            }

            if (keyConsList.indexOf(template_id) != -1) {
                this.btnLabel0.string = `使用`
                this.btnLabel1.string = `使用x${data.num}`

                defaultData = DataManager.GameData.Consumes[data.template_id]
            }
            this.nameLabel.string = defaultData.name
            this.richLabel.string = defaultData.des

            ResManager.loadItemIcon(`UI/prop/${defaultData.name}`, this.pic)

        } else if (data.bagId == 1) {//装备

            if (keyEquipList.indexOf(template_id) != -1) {
                defaultData = DataManager.GameData.Equips[data.template_id]
                this.node.getChildByName(`op`).children[0].active = true
                this.node.getChildByName(`op`).children[1].active = false
                this.node.getChildByName(`op`).children[0].x = 0
                let consumeNode = this.node.getChildByName(`consume`)
                consumeNode.active = true

                // this.btnLabel1.string = `出售`
                ResManager.loadItemIcon(`UI/equips/${defaultData.name}`, this.pic)

                this.richLabel.string = defaultData.des

                if (defaultData.position == -1) {
                    this.nameLabel.string = defaultData.name + ` ${data.enhance_level}级`
                    let upData = DataManager.GameData.Enhanceconfig["embryo"][data.enhance_level]
                    console.log('upData:' + JSON.stringify(upData))
                    if (upData) {
                        this.btnLabel0.string = `升级`
                        let templateid = upData.good[0]
                        let num = upData.material
                        console.log('name:' + DataManager.GameData.Items[templateid].name)
                        let pic = consumeNode.getChildByName('item').getChildByName('pic')
                        ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Items[templateid].name}`, pic)
                        consumeNode.getChildByName('item').getChildByName('nameLabel').getComponent(cc.Label).string = DataManager.GameData.Items[templateid].name
                        consumeNode.getChildByName('item').getChildByName('numLabel').getComponent(cc.Label).string = `x${num}`
                        consumeNode.getChildByName(`des`).getComponent(cc.Label).string = `LV${data.enhance_level}   升级到   LV${data.enhance_level + 1}`
                    } else {
                        this.btnLabel0.string = `已满级`
                    }

                } else {
                    this.btnLabel0.string = `还原`
                    this.nameLabel.string = defaultData.name

                    let reduction = DataManager.GameData.Enhanceconfig["reduction"][data.enhance_level]
                    if (reduction) {
                        let templateid = reduction.good[0]
                        let num = reduction.material
                        console.log('name:' + DataManager.GameData.Items[templateid].name)
                        let pic = consumeNode.getChildByName('item').getChildByName('pic')
                        ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Items[templateid].name}`, pic)
                        consumeNode.getChildByName('item').getChildByName('nameLabel').getComponent(cc.Label).string = DataManager.GameData.Items[templateid].name
                        consumeNode.getChildByName('item').getChildByName('numLabel').getComponent(cc.Label).string = `x${num}`
                        consumeNode.getChildByName(`des`).getComponent(cc.Label).string = '将装备还原成胚料'
                    } else {
                        consumeNode.active = false
                    }


                }
            }
        } else if (data.bagId == 2) {//碎片

            if (keyEquipFragsList.indexOf(template_id) != -1) {
                defaultData = DataManager.GameData.EquipFrags[data.template_id]

                this.btnLabel0.string = `升级`
                // this.btnLabel1.string = `出售`
                ResManager.loadItemIcon(`UI/prop/${defaultData.name}`, this.pic)

                this.nameLabel.string = defaultData.name
                this.richLabel.string = defaultData.des

            }

        } else if (data.bagId == 3) {//技能
            // defaultData = DataManager.GameData.Treasures[data.template_id]
            // ResManager.loadItemIcon(`UI/items/${data.template_id}`, this.pic)
            // this.btnLabel0.string = `精炼`
            // this.btnLabel1.string = `强化`

            let skillSt = DataManager.GameData.SkillStudy[data.template_id]
            ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.pic)
            this.node.getChildByName(`op`).active = false

            // if (skillSt.type == 1) {
            //     ResManager.loadItemIcon(`skillats/红`, item)
            // } else if (skillSt.type == 2) {
            //     ResManager.loadItemIcon(`skillats/黄`, item)
            // } else if (skillSt.type == 3) {
            //     ResManager.loadItemIcon(`skillats/蓝`, item)
            // }

            this.nameLabel.string = skillSt.name
            this.countLabel.string = 'x' + data.num
            this.richLabel.string = skillSt.des

        } else if (data.bagId == 4) {//道具 
            defaultData = DataManager.GameData.Items[data.template_id]
            let runeData = DataManager.GameData.Runes[data.template_id]


            this.countLabel.string = 'x' + data.num

            if (keyConsList.indexOf(template_id) != -1) {
                this.btnLabel0.string = `使用`
                this.btnLabel1.string = `使用x${data.num}`

                this.nameLabel.string = defaultData.name
                this.richLabel.string = defaultData.des || ''
                ResManager.loadItemIcon(`UI/prop/${defaultData.name}`, this.pic)

            } else if (keyRuneList.indexOf(template_id) != -1) {
                this.btnLabel0.string = `合成`
                this.node.getChildByName(`op`).children[0].x = 0
                this.node.getChildByName(`op`).children[1].active = false

                this.nameLabel.string = runeData.name
                this.richLabel.string = runeData.des || ''
                ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[template_id].icon}`, this.pic)

                let consumeNode = this.node.getChildByName(`consume`)
                consumeNode.active = true


                let pic = consumeNode.getChildByName('item').getChildByName('pic')
                ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[template_id].icon}`, pic)
                consumeNode.getChildByName('item').getChildByName('nameLabel').getComponent(cc.Label).string = DataManager.GameData.EquipFrags[template_id].name
                consumeNode.getChildByName('item').getChildByName('numLabel').getComponent(cc.Label).string = `x${DataManager.GameData.EquipFrags[template_id].craft_num}`
                consumeNode.getChildByName(`des`).getComponent(cc.Label).string = DataManager.GameData.EquipFrags[template_id].des
            } else {
                this.nameLabel.string = defaultData.name
                this.richLabel.string = defaultData.des || ''
                this.node.getChildByName(`op`).active = false
                ResManager.loadItemIcon(`UI/prop/${defaultData.name}`, this.pic)
            }
        }
        // console.log('defaultData:' + JSON.stringify(defaultData))

        if (!defaultData) return
    }

    btnHandler0() {
        if (this._data.bagId == 4) {
            let keyConsList = Object.keys(DataManager.GameData.Consumes)

            let keyRuneList = Object.keys(DataManager.GameData.Runes)
            if (keyRuneList.indexOf(String(this._data.template_id)) != -1) {
                console.log(`合成符石`)
                MyProtocols.send_C2SEquipFragCompose(DataManager._loginSocket, this._data.template_id)

            } else if (keyConsList.indexOf(this._data.template_id) != -1) {
                ViewManager.instance.showToast(`使用道具`)
                MyProtocols.send_C2SUseItem(DataManager._loginSocket, [{ template_id: this._data.template_id, count: 1 }])
            } else {
                this.node.getChildByName(`op`).active = false
                // if (this._data.template_id == 1000 || this._data.template_id == 1001) {
                //     this.btnLabel0.string = `升级`
                //     ViewManager.instance.showToast(`升级`)
                //     /**胚胎升级 */
                //     // MyProtocols.C2SEquipRefreshSave(DataManager._loginSocket,)
                // } else {

                // }
            }


        } else if (this._data.bagId == 0) {
            MyProtocols.send_C2SUseItem(DataManager._loginSocket, [{ template_id: this._data.template_id, count: 1 }])
        } else if (this._data.bagId == 1) {
            let defaultData = DataManager.GameData.Equips[this._data.template_id]
            if (defaultData.position == -1) {
                this.btnLabel0.string = `升级`
                /**胚胎升级 */
                MyProtocols.send_C2SEmbryoUp(DataManager._loginSocket, this._data.uuid)
            } else {
                this.btnLabel0.string = `还原`
                /**武器还原 */
                MyProtocols.send_C2SEquipRestore(DataManager._loginSocket, this._data.uuid)
            }
        }
    }

    btnHandler1() {
        if (this._data.bagId == 4) {
            // ViewManager.instance.showToast(`卖出道具`)
            // this.node.parent.getChildByName('sellPanel').active = true
            MyProtocols.send_C2SUseItem(DataManager._loginSocket, [{ template_id: this._data.template_id, count: 1 }])
        } else if (this._data.bagId == 0) {
            MyProtocols.send_C2SUseItem(DataManager._loginSocket, [{ template_id: this._data.template_id, count: this._data.num }])
        }
    }



    // update (dt) {}
}
