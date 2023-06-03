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
import renderRecruitOffice from "./renderRecruitOffice";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    renderPfb: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.contect.removeAllChildren()
        for (let i = 0; i < Object.keys(DataManager.GameData.Soldier).length; i++) {
            let key = Object.keys(DataManager.GameData.Soldier)[i]
            let render = cc.instantiate(this.renderPfb)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
                }, 0.3 * i)
            }
            render.getComponent(renderRecruitOffice).init(DataManager.GameData.Soldier[key])
            render.on(cc.Node.EventType.TOUCH_END, () => {
                if (DataManager.GameData.build['basic'][0].grade == 0) {
                    ViewManager.instance.showToast('请先建造居民区')
                    return
                }
                ViewManager.instance.hideWnd(DataManager.curWndPath, true)
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_RCRUIT, ...[parseInt(key) + 1])
            }, this)
        }
    }

    init() {

    }

    onBackHandler() {
        Logger.log('关闭窗口')
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_MAIN_RECRUITOFFICE, true)
    }

    // update (dt) {}
}
