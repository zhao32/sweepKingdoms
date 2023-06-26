// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import hotelJinhuaRender from "./hotelJinhuaRender";
import hotelZSRender from "./hotelZSRender";

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

    @property(cc.Label)
    heroNumDisplay: cc.Label = null;

    @property(cc.Label)
    titleDisplay: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _from: string

    _data: any

    start() {

    }

    init(from = this._from, data = this._data) {
        this._data = data

        this._from = from

        this.contect.removeAllChildren()

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

    }


    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        if (this._from) {
            ViewManager.instance.showWnd(this._from)

        }
    }

    onClose() {

    }

    // update (dt) {}
}
