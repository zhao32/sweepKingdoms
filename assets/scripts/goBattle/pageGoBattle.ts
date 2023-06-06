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
    myContect: cc.Node = null;

    @property(cc.Node)
    filedContect: cc.Node = null;

    @property(cc.Prefab)
    myItemPfb: cc.Prefab = null;

    @property(cc.Prefab)
    filedItemPfb: cc.Prefab = null;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {

        this.myContect.removeAllChildren()
        for (let i = 0; i < 5; i++) {
            let myItem = cc.instantiate(this.myItemPfb)
            myItem.parent = this.myContect
        }

        this.filedContect.removeAllChildren()
        for (let i = 0; i < 27; i++) {
            let filedItem = cc.instantiate(this.filedItemPfb)
            filedItem.parent = this.filedContect

            filedItem.on(cc.Node.EventType.TOUCH_END, () => {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS)
            }, this)
        }
    }

    btnLeft() {
        console.log('左刷新')
        this.filedContect.removeAllChildren()

        for (let i = 0; i < 27; i++) {
            let filedItem = cc.instantiate(this.filedItemPfb)
            this.scheduleOnce(() => {
                filedItem.parent = this.filedContect
            }, 0.01 * i)

            filedItem.on(cc.Node.EventType.TOUCH_END, () => {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS)
            }, this)
        }
    }
    btnRight() {
        console.log('右刷新')
        this.filedContect.removeAllChildren()
        for (let i = 0; i < 27; i++) {
            let filedItem = cc.instantiate(this.filedItemPfb)
            this.scheduleOnce(() => {
                filedItem.parent = this.filedContect
            }, 0.01 * i)
            filedItem.on(cc.Node.EventType.TOUCH_END, () => {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS)
            }, this)
        }
    }


    onBackHandler() {
        console.log('------点击关闭---------')
        ViewManager.instance.hideView(EnumManager.viewPath.PAGE_GOBATTLE, true)
    }

    onRecordHandler() {
        console.log('------日志---------')
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_RECORD)

    }


    onFeiYHandler() {
        console.log('------肥羊---------')
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FY)
    }

    onFindHandler() {
        console.log('------查找---------')
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FIND)


    }


    // update (dt) {}
}
