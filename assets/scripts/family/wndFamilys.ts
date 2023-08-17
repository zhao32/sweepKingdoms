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

    @property(cc.Prefab)
    pfb: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}



    showType: number = 0 // 0 分组 1 分组内

    groupsData = [
        {
            group: '同国玩家',
            describe: '查找和你同国的玩家',
            frameIdx: 0
        },
        {
            group: '按条件查询',
            describe: '通过指定的条件查询',
            frameIdx: 1
        }
    ]

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.showGroups()
    }

    showGroups() {
        this.showType = 0
        this.contect.removeAllChildren()
        for (let i = 0; i < this.groupsData.length; i++) {
            let render = cc.instantiate(this.pfb)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            render.on(cc.Node.EventType.TOUCH_END, () => {
                if (i == 0) {

                } else if (i == 1) {

                }

                // this.showIntragroup(i)
            }, this)
        }
    }

    showDetailList() {
        this.showType = 1
        this.contect.removeAllChildren()
        for (let i = 0; i < 5; i++) {
            let render = cc.instantiate(this.pfb)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
        }
    }



    init() {

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onClose() {

    }

    // update (dt) {}
}
