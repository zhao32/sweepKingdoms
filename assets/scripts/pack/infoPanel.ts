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
        /**礼包 */
        let keyGiftList = Object.keys(DataManager.GameData.Boxes)
        /**消耗品 */
        let keyConsList = Object.keys(DataManager.GameData.Consumes)

        let template_id = data.template_id.toString()
        this.countLabel.string = 'x' + data.num

        let defaultData
        this.node.getChildByName(`op`).active = true
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
            defaultData = DataManager.GameData.packItems[data.template_id]

            this.btnLabel0.string = `使用`
            this.btnLabel1.string = `出售`
            ResManager.loadItemIcon(`UI/items/${defaultData.icon}`, this.pic)

            this.nameLabel.string = defaultData.name
            this.richLabel.string = defaultData.des

        } else if (data.bagId == 2) {//碎片

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
            defaultData = DataManager.GameData.packItems[data.template_id]
            this.btnLabel0.string = `使用`
            this.btnLabel1.string = `出售`
            ResManager.loadItemIcon(`UI/UnitsEquips/${data.template_id}`, this.pic)

            this.nameLabel.string = defaultData.name
            this.countLabel.string = 'x' + data.num
            this.richLabel.string = defaultData.des
        }
        console.log('defaultData:' + JSON.stringify(defaultData))

        if (!defaultData) return


    }

    btnHandler0() {
        if (this._data.bagId == 4) {
            ViewManager.instance.showToast(`使用道具`)
        } else if (this._data.bagId == 0) {
            MyProtocols.send_C2SUseItem(DataManager._loginSocket, [{ template_id: this._data.template_id, count: 1 }])
        }
    }

    btnHandler1() {
        if (this._data.bagId == 4) {
            ViewManager.instance.showToast(`卖出道具`)
            this.node.parent.getChildByName('sellPanel').active = true
        } else if (this._data.bagId == 0) {
            MyProtocols.send_C2SUseItem(DataManager._loginSocket, [{ template_id: this._data.template_id, count: this._data.num }])
        }
    }



    // update (dt) {}
}
