// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

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
        this.contect.removeAllChildren()
        for (let i = 0; i < 3; i++) {
            let render = cc.instantiate(this.renderPfb0)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
                }, 0.3 * i)
            }
            render.on(cc.Node.EventType.TOUCH_END, () => {
                this.showSoliderAttribute()
            }, this)
        }
    }

    /**显示士兵的属性 */
    showSoliderAttribute() {
        this.showType = 1
        this.contect.removeAllChildren()
        for (let i = 0; i < 5; i++) {
            let render = cc.instantiate(this.renderPfb1)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
                }, 0.3 * i)
            }
        }
    }

    init() {
        this.showArmy()
    }

    onBackHandler() {
        if (this.showType == 0) {
            Logger.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath)
        } else if (this.showType == 1) {
            this.showArmy()
        }

    }
    // update (dt) {}
}
