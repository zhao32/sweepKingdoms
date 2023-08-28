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
import familyTaskRender0 from "./familyTaskRender0";
import familyTaskRender1 from "./familyTaskRender1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    pfb1: cc.Prefab = null;

    @property(cc.Prefab)
    pfb2: cc.Prefab = null;

    @property({ type: cc.ProgressBar, displayName: "经验条" })
    proBar: cc.Prefab = null;

    @property({ type: cc.Label, displayName: "经验" })
    proBarTxt: cc.Label = null;


    showType: number = 0 // 0 分组 1 分组内

    groupsData = [
        {
            group: '家族主线任务',
            describe: '完成家族任务可以获得家族经验',
            frameIdx: 0
        },
        {
            group: '家族日常任务',
            describe: '完成日常任务可以获得家族经验，日常任务每天0点刷新',
            frameIdx: 1
        },
        // {
        //     group: '士兵建筑',
        //     describe: '组建一支强大军备的必要建筑，可以让你叱诧风云，纵横疆场',
        //     frameIdx: 2
        // }
    ]
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }


    init() {
        this.showGroups()
    }

    showGroups() {
        this.showType = 0
        this.contect.removeAllChildren()
        for (let i = 0; i < this.groupsData.length; i++) {
            let render = cc.instantiate(this.pfb1)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            render.getComponent(familyTaskRender0).init(this.groupsData[i])
            render.on(cc.Node.EventType.TOUCH_END, () => {
                this.showIntragroup(i)
            }, this)
        }
    }

    showIntragroup(idx) {
        this.showType = 1
        if (idx == 0) {
            ViewManager.instance.hideWnd(DataManager.curWndPath)
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_TASK_DETAIL, ...[DataManager.GameData.familyTask[`MainQuests`], 0])
        } else {
            this.contect.removeAllChildren()
            for (let i = 0; i < DataManager.GameData.familyTask[`DailyTasks`].length; i++) {
                let data = DataManager.GameData.familyTask[`DailyTasks`][i]
                let render = cc.instantiate(this.pfb2)
                render.getComponent(familyTaskRender1).init(data)
                render.parent = this.contect
                render.on(cc.Node.EventType.TOUCH_END, () => {
                    ViewManager.instance.hideWnd(DataManager.curWndPath)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_TASK_DETAIL, ...[[data], 1])
                }, this)
            }
        }
    }

    onCloseHandler() {
        // ViewManager.instance.hideWnd(DataManager.curWndPath)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)

        if (this.showType == 0) {
            Logger.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath)
        } else if (this.showType == 1) {
            this.showGroups()
        }
    }

    onClose() {

    }

    // update (dt) {}
}
