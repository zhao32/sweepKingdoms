// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import hotelJinhuaRender from "./hotelJinhuaRender";
import hotelSJRender from "./hotelSJRender";

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;
////////////////升级
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Node)
    headContect: cc.Node = null;

    @property({ type: cc.Prefab, displayName: 'renderPfb' })
    renderfb: cc.Prefab = null;

    @property({ type: cc.Label, displayName: '名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '等级' })
    gradeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '星级' })
    starDisplay: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    @property(cc.Node)
    heroNameBg: cc.Node = null;


    selectIdList = []


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    myId: number

    init(data) {
        NetEventDispatcher.addListener(NetEvent.S2CCardAddLevel, this.S2CCardAddLevel, this)

        this.myId = data.template_id
        this.selectIdList = []

        let defaultData = DataManager.GameData.Cards[data.template_id]
        this.nameDisplay.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
        ResManager.loadItemIcon(`hero/heroNameBg${defaultData.quality - 1}`, this.heroNameBg)

        this.starDisplay.string = `x${data.unitGrade}`
        this.gradeDisplay.string = 'LV ' + data.level

        this.contect.removeAllChildren()

        let cards = []
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (DataManager.cardsList[i].template_id != data.template_id) {
                cards.push(DataManager.cardsList[i])
            }
        }
        for (let i = 0; i < cards.length; i++) {
            let pfb = cc.instantiate(this.renderfb)
            pfb.parent = this.contect
            pfb.getComponent(hotelSJRender).init(cards[i])

            pfb.getChildByName(`check`).on(cc.Node.EventType.TOUCH_END, () => {
                // if (this.selectIdList.indexOf(cards[i].id) == -1) {
                if (this.selectIdList.length < 9) {
                    if (pfb.getComponent(hotelSJRender).selected == false) {
                        this.selectIdList.push(cards[i].template_id)
                        pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelSJRender).checkFrames[1]
                        pfb.getComponent(hotelSJRender).selected = true
                    } else {
                        pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelSJRender).checkFrames[0]
                        for (let j = 0; j < this.selectIdList.length; j++) {
                            if (this.selectIdList[j] == cards[i].template_id) {
                                this.selectIdList.splice(j, 1)
                            }
                        }
                        pfb.getComponent(hotelSJRender).selected = false
                    }
                } else {
                    if (pfb.getComponent(hotelSJRender).selected == false) {
                        ViewManager.instance.showToast(`每次最高吞噬九个将领`)
                    } else {
                        pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelSJRender).checkFrames[0]
                        for (let j = 0; j < this.selectIdList.length; j++) {
                            if (this.selectIdList[j] == cards[i].template_id) {
                                this.selectIdList.splice(j, 1)
                            }
                        }
                        pfb.getComponent(hotelSJRender).selected = false
                    }
                }
                // }
                this.reflashHeads()
            }, this)

            // pfb.on(cc.Node.EventType.TOUCH_END, () => {
            //     if (this._data.idx == 1) {//打开将领详情页
            //         ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
            //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_DETAIL, ...[DataManager.cardsList[i]])
            //     } else if(this._data.idx == 2){
            //         ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
            //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_QH, ...[DataManager.cardsList[i]])
            //     }
            // }, this)

        }



        // update (dt) {}
    }

    reflashHeads() {
        let cards = []
        for (let i = 0; i < this.selectIdList.length; i++) {
            for (let j = 0; j < DataManager.cardsList.length; j++) {
                if (this.selectIdList[i] == DataManager.cardsList[j].template_id) {
                    cards.push(DataManager.cardsList[j])
                }
            }
        }

        for (let i = 0; i < this.headContect.children.length; i++) {
            let icon = this.headContect.children[i].children[1]
            icon.active = false
        }

        for (let i = 0; i < cards.length; i++) {
            let icon = this.headContect.children[i].children[1]
            icon.active = true
            let defaultData = DataManager.GameData.Cards[cards[i].template_id]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, icon)

        }
    }

    doEatHandler() {
        // console.log(`this.selectIdList:`+this.selectIdList)
        // console.log(`this.myId:`+this.myId)
        let objList = []
        for (let i = 0; i <  this.selectIdList.length; i++) {
            let item = {
                template_id:this.selectIdList[i],
                count:1
            }
            objList.push(item)
        }
        console.log(`objList:`+JSON.stringify(objList) )

        if (this.selectIdList.length > 0) {
            MyProtocols.send_C2SCardAddLevel(DataManager._loginSocket, this.myId, objList)
        } else {
            ViewManager.instance.showToast(`请选择吞噬将领`)
        }

    }

    S2CCardAddLevel(data) {
        console.log(`升级返回`)
        // "card id";1,"level"4,"level exp":2508
        console.log(JSON.stringify(data))
        this.gradeDisplay.string = 'LV ' + data.level

        this.selectIdList = []
        this.reflashHeads()
        this.contect.removeAllChildren()
        let cards = []
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (DataManager.cardsList[i].template_id != data.template_id) {
                cards.push(DataManager.cardsList[i])
            }
        }
        for (let i = 0; i < cards.length; i++) {
            let pfb = cc.instantiate(this.renderfb)
            pfb.parent = this.contect
            pfb.getComponent(hotelSJRender).init(cards[i])

            pfb.getChildByName(`check`).on(cc.Node.EventType.TOUCH_END, () => {
                // if (this.selectIdList.indexOf(cards[i].id) == -1) {
                if (this.selectIdList.length < 9) {
                    if (pfb.getComponent(hotelSJRender).selected == false) {
                        this.selectIdList.push(cards[i].template_id)
                        pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelSJRender).checkFrames[1]
                        pfb.getComponent(hotelSJRender).selected = true
                    } else {
                        pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelSJRender).checkFrames[0]
                        for (let j = 0; j < this.selectIdList.length; j++) {
                            if (this.selectIdList[j] == cards[i].template_id) {
                                this.selectIdList.splice(j, 1)
                            }
                        }
                        pfb.getComponent(hotelSJRender).selected = false
                    }
                } else {
                    if (pfb.getComponent(hotelSJRender).selected == false) {
                        ViewManager.instance.showToast(`每次最高吞噬九个将领`)
                    } else {
                        pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelSJRender).checkFrames[0]
                        for (let j = 0; j < this.selectIdList.length; j++) {
                            if (this.selectIdList[j] == cards[i].template_id) {
                                this.selectIdList.splice(j, 1)
                            }
                        }
                        pfb.getComponent(hotelSJRender).selected = false
                    }
                }
                // }
                this.reflashHeads()
            }, this)
        }
    }


    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_LIST)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CCardAddLevel, this.S2CCardAddLevel, this)

    }
}
