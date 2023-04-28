// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    contect: cc.Node = null;

    @property({ type: cc.Sprite, displayName: '士兵图片' })
    soldierSprite: cc.Sprite = null;

    @property({ type: cc.Label, displayName: '人口' })
    populationDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '兵力' })
    troopsDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '士兵名称' })
    soldierNameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '士兵单价' })
    soldierPriceDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '士兵战力' })
    soldierPowerDisplay: cc.Label = null;


    @property({ type: cc.Label, displayName: '可招募兵力1' })
    troopsDisplay1: cc.Label = null;


    @property({ type: cc.Label, displayName: '可招募兵力2' })
    troopsDisplay2: cc.Label = null;

    @property({ type: cc.Label, displayName: '可招募兵总价1' })
    priceDisplay1: cc.Label = null;

    @property({ type: cc.Label, displayName: '可招募兵总价2' })
    priceDisplay2: cc.Label = null;

    @property({ type: cc.Label, displayName: '恢复兵力价格' })
    recoverPriceDisplay: cc.Label = null;

    @property({ type: cc.Node, displayName: '恢复兵力Node' })
    recoverNode: cc.Node = null;

    @property({ type: cc.Node, displayName: '已恢复兵力Node' })
    recoverdNode: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {
        for (let i = 0; i < 4; i++) {
            let render = this.contect.getChildByName(`bgRender${i}`)
            render.x = 1000
            this.scheduleOnce(() => {
                render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
            }, 0.3 * i)
        }

    }

    recruitHandler(event, data) {

    }

    recoverHandler() {

    }

    backHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)

    }

    // update (dt) {}
}
