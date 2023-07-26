// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import hotelJinhuaRender from "./hotelJinhuaRender";
import hotelZSRender from "./hotelZSRender";
import renderHun from "./renderHun";


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    jinhuaPfb: cc.Prefab = null;

    @property(cc.Prefab)
    qianghuaPfb: cc.Prefab = null;

    @property(cc.Prefab)
    chuanchengPfb: cc.Prefab = null;

    @property(cc.Prefab)
    zhuanshengPfb: cc.Prefab = null;

    @property(cc.Prefab)
    hunPfb: cc.Prefab = null;

    @property(cc.Label)
    heroNumDisplay: cc.Label = null;

    @property(cc.Label)
    titleDisplay: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _from: string

    _data: any

    selectIdList: any[] = []

    start() {
        this.node.getChildByName(`btnDeComps`).on(cc.Node.EventType.TOUCH_END, () => {
            console.log(JSON.stringify(this.selectIdList))
            if (this.selectIdList.length == 0) {
                ViewManager.instance.showToast(`请选择要分解的将`)
                return
            }
            let dataList = []
            for (let i = 0; i < this.selectIdList.length; i++) {
                let data = {
                    cardTemplateId: this.selectIdList[i],
                    treasure_uuid: 0,
                    count: 0
                }
                dataList.push(data)
            }

            MyProtocols.send_C2SForge(DataManager._loginSocket, dataList)
        }, this)

    }

    updataHun() {
        this.node.getChildByName(`btnDeComps`).active = false
        this.contect.removeAllChildren()
        let fragList = []
        let keys = Object.keys(DataManager.GameData.CardFrags)
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            if (keys.indexOf(String(DataManager.instance.itemsList[i].template_id)) != -1) {
                fragList.push(DataManager.instance.itemsList[i])
            }
        }

        for (let i = 0; i < fragList.length; i++) {
            let render = cc.instantiate(this.hunPfb)
            render.parent = this.contect
            if (this.contect.children.length < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }

            render.getComponent(renderHun).init(fragList[i])
        }

    }

    init(from = this._from, data = this._data) {
        NetEventDispatcher.addListener(NetEvent.S2CForge, this.S2CForge, this)

        this._data = data

        this._from = from

        this.contect.removeAllChildren()
        this.node.getChildByName(`btnDeComps`).active = true
        this.node.getChildByName('toggleContainer').active = this._data.idx == 1
        this.node.getChildByName('toggleContainer').children[0].getComponent(cc.Toggle).isChecked = true
        if (this._data.idx == 1) {

            this.node.getChildByName('toggleContainer').children[0].on(cc.Node.EventType.TOUCH_END, () => {
                this.node.getChildByName(`btnDeComps`).active = true
                this.selectIdList = []
                this.contect.removeAllChildren()
                for (let i = 0; i < DataManager.cardsList.length; i++) {
                    let pfb = cc.instantiate(this.jinhuaPfb)
                    pfb.parent = this.contect

                    if (this.contect.children.length < 5) {
                        pfb.x = 1000
                        this.scheduleOnce(() => {
                            pfb.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, pfb.y)))
                        }, DataManager.SCROLLTIME2 * i)
                    }


                    pfb.getComponent(hotelJinhuaRender).init(DataManager.cardsList[i])
                    pfb.on(cc.Node.EventType.TOUCH_END, () => {
                        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_DETAIL, ...[DataManager.cardsList[i]])
                    }, this)
                    pfb.getChildByName(`check`).active = true
                    pfb.getChildByName(`check`).on(cc.Node.EventType.TOUCH_END, () => {
                        if (pfb.getComponent(hotelJinhuaRender).selected == false) {
                            this.selectIdList.push(DataManager.cardsList[i].id)
                            pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelJinhuaRender).checkFrames[1]
                            pfb.getComponent(hotelJinhuaRender).selected = true
                        } else {
                            pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelJinhuaRender).checkFrames[0]
                            for (let j = 0; j < this.selectIdList.length; j++) {
                                if (this.selectIdList[j] == DataManager.cardsList[i].id) {
                                    this.selectIdList.splice(j, 1)
                                }
                            }
                            pfb.getComponent(hotelJinhuaRender).selected = false
                        }

                    }, this)
                }
            }, this)
            this.node.getChildByName('toggleContainer').children[1].on(cc.Node.EventType.TOUCH_END, this.updataHun, this)
        }

        this.titleDisplay.string = data.name
        // for (let i = 0; i < 10; i++) {
        //     let pfb = cc.instantiate(this.jinhuaPfb)
        //     pfb.parent = this.contect
        // }
        // console.log('DataManager.cardsList:' + JSON.stringify(DataManager.cardsList))
        if (this._data.idx == 6) {
            for (let i = 0; i < DataManager.cardsList.length; i++) {
                let defaultData = DataManager.GameData.Cards[DataManager.cardsList[i].template_id]
                if (defaultData.quality == 2 || defaultData.quality == 3) {
                    let pfb = cc.instantiate(this.zhuanshengPfb)
                    pfb.parent = this.contect
                    pfb.getComponent(hotelZSRender).init(DataManager.cardsList[i])
                }
            }
        } else {
            for (let i = 0; i < DataManager.cardsList.length; i++) {
                let pfb = cc.instantiate(this.jinhuaPfb)
                pfb.parent = this.contect
                pfb.getComponent(hotelJinhuaRender).init(DataManager.cardsList[i])
                if (this._data.idx == 1) {
                    pfb.getChildByName(`check`).active = true
                    pfb.getChildByName(`check`).on(cc.Node.EventType.TOUCH_END, () => {
                        if (pfb.getComponent(hotelJinhuaRender).selected == false) {
                            this.selectIdList.push(DataManager.cardsList[i].id)
                            pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelJinhuaRender).checkFrames[1]
                            pfb.getComponent(hotelJinhuaRender).selected = true
                        } else {
                            pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelJinhuaRender).checkFrames[0]
                            for (let j = 0; j < this.selectIdList.length; j++) {
                                if (this.selectIdList[j] == DataManager.cardsList[i].id) {
                                    this.selectIdList.splice(j, 1)
                                }
                            }
                            pfb.getComponent(hotelJinhuaRender).selected = false
                        }

                    }, this)

                }
                pfb.on(cc.Node.EventType.TOUCH_END, () => {
                    if (this._data.idx == 1) {//打开将领详情页
                        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_DETAIL, ...[DataManager.cardsList[i]])
                    } else if (this._data.idx == 2) {
                        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_QH, ...[DataManager.cardsList[i]])
                    } else if (this._data.idx == 3) {
                        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_SJ, ...[DataManager.cardsList[i]])
                    } else if (this._data.idx == 4) {
                        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_STAR, ...[DataManager.cardsList[i]])
                    } else if (this._data.idx == 5) {
                        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_CC, ...[DataManager.cardsList[i]])
                    }
                }, this)
            }
        }


        this.heroNumDisplay.string = `${DataManager.cardsList.length}/${Object.keys(DataManager.GameData.Cards).length}`
        NetEventDispatcher.addListener(NetEvent.S2CCardCompose, this.S2CCardCompose, this)
    }

    S2CCardCompose(data) {
        // 将魂合成返回:{}
        console.log(`将魂合成返回:` + JSON.stringify(data))
        this.updataHun()
        ViewManager.instance.showToast(`将魂合成武将成功`)

    }


    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        if (this._from) {
            ViewManager.instance.showWnd(this._from)
        }
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CForge, this.S2CForge, this)
    }

    S2CForge(data) {
        console.log('将领分解返回：' + JSON.stringify(data))


        this.contect.removeAllChildren()
        this.selectIdList = []
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            let pfb = cc.instantiate(this.jinhuaPfb)
            pfb.parent = this.contect
            pfb.getComponent(hotelJinhuaRender).init(DataManager.cardsList[i])
            if (this._data.idx == 1) {
                pfb.getChildByName(`check`).active = true
                pfb.getChildByName(`check`).on(cc.Node.EventType.TOUCH_END, () => {
                    if (pfb.getComponent(hotelJinhuaRender).selected == false) {
                        this.selectIdList.push(DataManager.cardsList[i].id)
                        pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelJinhuaRender).checkFrames[1]
                        pfb.getComponent(hotelJinhuaRender).selected = true
                    } else {
                        pfb.getChildByName(`check`).getComponent(cc.Sprite).spriteFrame = pfb.getComponent(hotelJinhuaRender).checkFrames[0]
                        for (let j = 0; j < this.selectIdList.length; j++) {
                            if (this.selectIdList[j] == DataManager.cardsList[i].id) {
                                this.selectIdList.splice(j, 1)
                            }
                        }
                        pfb.getComponent(hotelJinhuaRender).selected = false
                    }

                }, this)

            }
            pfb.on(cc.Node.EventType.TOUCH_END, () => {
                if (this._data.idx == 1) {//打开将领详情页
                    ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_DETAIL, ...[DataManager.cardsList[i]])
                } else if (this._data.idx == 2) {
                    ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_QH, ...[DataManager.cardsList[i]])
                } else if (this._data.idx == 3) {
                    ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_SJ, ...[DataManager.cardsList[i]])
                } else if (this._data.idx == 4) {
                    ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_STAR, ...[DataManager.cardsList[i]])
                } else if (this._data.idx == 5) {
                    ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL_LIST)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_CC, ...[DataManager.cardsList[i]])
                }
            }, this)
        }
    }

    // update (dt) {}
}
