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
import ViewManager from "../utils/Manager/ViewManager";
import renderStrengthen from "./renderStrengthen";
import renderStrengthen1 from "./renderStrengthen1";

const { ccclass, property } = cc._decorator;


//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: '人口' })
    populationDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '兵力' })
    troopsDisplay: cc.Label = null;

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    renderPfb0: cc.Prefab = null;

    @property(cc.Prefab)
    renderPfb1: cc.Prefab = null;

    showType: number = 0 // 0 分组 1 分组内

    // onLoad () {}

    start() {
        this.showArmy()
    }

    /**显示部队 */
    showArmy() {
        this.showType = 0
        // this.contect.removeAllChildren()
        // for (let i = 0; i < 3; i++) {
        //     let render = cc.instantiate(this.renderPfb0)
        //     render.parent = this.contect
        //     if (i < 5) {
        //         render.x = 1000
        //         this.scheduleOnce(() => {
        //             render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
        //         }, DataManager.SCROLLTIME2 * i)
        //     }
        //     render.on(cc.Node.EventType.TOUCH_END, () => {
        //         this.showSoliderAttribute()
        //     }, this)
        // }


        this.contect.removeAllChildren()
        for (let i = 0; i < Object.keys(DataManager.GameData.Soldier).length; i++) {
            let key = Object.keys(DataManager.GameData.Soldier)[i]
            let render = cc.instantiate(this.renderPfb0)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            render.getComponent(renderStrengthen).init(DataManager.GameData.Soldier[key])
            render.on(cc.Node.EventType.TOUCH_END, () => {
                this.showSoliderAttribute(DataManager.GameData.Soldier[key])
            }, this)
        }
    }

    soliderData
    /**显示士兵的属性 */
    showSoliderAttribute(data) {
        this.showType = 1
        this.contect.removeAllChildren()
        this.soliderData = data
        let lvList = []
        for (let i = 0; i < DataManager.playData.storgleave_data.length; i++) {
            if (data.idx == DataManager.playData.storgleave_data[i].type) {
                lvList = DataManager.playData.storgleave_data[i].lv
            }
        }

        let tranArr = []
        if (lvList.length > 0) {
            data.defense.attack_1 > 0 ? tranArr.push({ idx: data.idx, lv: lvList[0], type: 1, name: "挥砍攻击" }) : null
            data.defense.attack_2 > 0 ? tranArr.push({ idx: data.idx, lv: lvList[1], type: 2, name: "穿刺攻击" }) : null
            data.defense.attack_3 > 0 ? tranArr.push({ idx: data.idx, lv: lvList[2], type: 3, name: "法术攻击" }) : null
            data.defense.attack_4 > 0 ? tranArr.push({ idx: data.idx, lv: lvList[3], type: 4, name: "挥砍防御" }) : null
            data.defense.attack_5 > 0 ? tranArr.push({ idx: data.idx, lv: lvList[4], type: 5, name: "穿刺防御" }) : null
            data.defense.attack_6 > 0 ? tranArr.push({ idx: data.idx, lv: lvList[5], type: 6, name: "法术防御" }) : null
        } else {
            data.defense.attack_1 > 0 ? tranArr.push({ idx: data.idx, lv: 0, type: 1, name: "挥砍攻击" }) : null
            data.defense.attack_2 > 0 ? tranArr.push({ idx: data.idx, lv: 0, type: 2, name: "穿刺攻击" }) : null
            data.defense.attack_3 > 0 ? tranArr.push({ idx: data.idx, lv: 0, type: 3, name: "法术攻击" }) : null
            data.defense.attack_4 > 0 ? tranArr.push({ idx: data.idx, lv: 0, type: 4, name: "挥砍防御" }) : null
            data.defense.attack_5 > 0 ? tranArr.push({ idx: data.idx, lv: 0, type: 5, name: "穿刺防御" }) : null
            data.defense.attack_6 > 0 ? tranArr.push({ idx: data.idx, lv: 0, type: 6, name: "法术防御" }) : null
        }

        for (let i = 0; i < tranArr.length; i++) {
            let render = cc.instantiate(this.renderPfb1)
            render.parent = this.contect
            render.getComponent(renderStrengthen1).init(tranArr[i])
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
        }
    }

    init() {
        this.showArmy()
        NetEventDispatcher.addListener(NetEvent.S2CSoliderStren, this.S2CSoliderStren, this)
        let keys = Object.keys(DataManager.GameData.MineStone)
        console.log(`keys:` + JSON.stringify(keys))
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                if (keys[j] == DataManager.instance.itemsList[i].template_id) {
                    this.node.getChildByName(`pearls`).children[7 + j].getComponent(cc.Label).string = `x` + DataManager.instance.itemsList[i].num
                }
            }
        }

    }

    S2CSoliderStren(data) {
        console.log('兵种强化返回：' + JSON.stringify(data))
        // 兵种强化返回：{"lv":1,"idx":1,"type":0}

        //storgleave_data [{"type":1,"lv":[1,0,0,0,0,0]}]
        let hasData = false
        for (let i = 0; i < DataManager.playData.storgleave_data.length; i++) {
            if (data.idx == DataManager.playData.storgleave_data[i].type) {
                DataManager.playData.storgleave_data[i].lv[data.type - 1] = data.lv
                hasData = true
            }
        }

        if (!hasData) {
            let strenData = { type: data.idx, lv: [0, 0, 0, 0, 0, 0] }
            strenData.lv[data.type] = data.lv
            DataManager.playData.storgleave_data.push(strenData)
        }
        console.log(JSON.stringify(DataManager.playData.storgleave_data))
        ViewManager.instance.showToast(`兵种强化成功`)

        let keys = Object.keys(DataManager.GameData.MineStone)
        console.log(`keys:` + JSON.stringify(keys))
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                if (keys[j] == DataManager.instance.itemsList[i].template_id) {
                    this.node.getChildByName(`pearls`).children[7 + j].getComponent(cc.Label).string = `x` + DataManager.instance.itemsList[i].num
                }
            }
        }

        if (this.showType == 0) return
        let lvList = []
        for (let i = 0; i < DataManager.playData.storgleave_data.length; i++) {
            if (data.idx == DataManager.playData.storgleave_data[i].type) {
                lvList = DataManager.playData.storgleave_data[i].lv
            }
        }
        console.log(`lvList:` + JSON.stringify(lvList))
        let tranArr = []
        if (lvList.length > 0) {
            this.soliderData.defense.attack_1 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: lvList[0], type: 1, name: "挥砍攻击" }) : null
            this.soliderData.defense.attack_2 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: lvList[1], type: 2, name: "穿刺攻击" }) : null
            this.soliderData.defense.attack_3 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: lvList[2], type: 3, name: "法术攻击" }) : null
            this.soliderData.defense.attack_4 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: lvList[3], type: 4, name: "挥砍防御" }) : null
            this.soliderData.defense.attack_5 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: lvList[4], type: 5, name: "穿刺防御" }) : null
            this.soliderData.defense.attack_6 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: lvList[5], type: 6, name: "法术防御" }) : null
        } else {
            this.soliderData.defense.attack_1 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: 0, type: 1, name: "挥砍攻击" }) : null
            this.soliderData.defense.attack_2 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: 0, type: 2, name: "穿刺攻击" }) : null
            this.soliderData.defense.attack_3 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: 0, type: 3, name: "法术攻击" }) : null
            this.soliderData.defense.attack_4 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: 0, type: 4, name: "挥砍防御" }) : null
            this.soliderData.defense.attack_5 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: 0, type: 5, name: "穿刺防御" }) : null
            this.soliderData.defense.attack_6 > 0 ? tranArr.push({ idx: this.soliderData.idx, lv: 0, type: 6, name: "法术防御" }) : null
        }

        for (let i = 0; i < tranArr.length; i++) {
            let render = this.contect.children[i]
            render.getComponent(renderStrengthen1).updataLv(tranArr[i].lv)
        }
    }

    onBackHandler() {
        if (this.showType == 0) {
            Logger.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath)
        } else if (this.showType == 1) {
            this.showArmy()
        }
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CSoliderStren, this.S2CSoliderStren, this)

    }
    // update (dt) {}
}
