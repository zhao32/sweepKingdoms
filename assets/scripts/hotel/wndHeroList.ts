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

    @property(cc.Label)
    heroNumDisplay: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _from: string

    start() {

    }

    init(from, idx) {

        this._from = from

        this.contect.removeAllChildren()
        // for (let i = 0; i < 10; i++) {
        //     let pfb = cc.instantiate(this.jinhuaPfb)
        //     pfb.parent = this.contect
        // }
        // console.log('DataManager.cardsList:' + JSON.stringify(DataManager.cardsList))
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            let pfb = cc.instantiate(this.jinhuaPfb)
            pfb.parent = this.contect
            pfb.getComponent(hotelJinhuaRender).init(DataManager.cardsList[i])

        }

        this.heroNumDisplay.string = `${DataManager.cardsList.length}/${Object.keys(DataManager.GameData.Cards).length}`

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        if (this._from) {
            ViewManager.instance.showWnd(this._from)

        }
    }

    // update (dt) {}
}
