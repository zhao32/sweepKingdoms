// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import hotelRecruitRender from "./hotelRecruitRender";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    renderPfb: cc.Prefab = null;

    @property(cc.Prefab)
    renderResultPfb0: cc.Prefab = null;

    @property(cc.Prefab)
    renderResultPfb1: cc.Prefab = null;

    @property(cc.Label)
    titleDisplay: cc.Label = null;

    showType: number = 0 // 0 招募 1 招募结果
    recruitData = [
        {
            idx: 0,
            name: '元宝招募一次',
            price: 500,
            describe: '必出名将以上的将领及对应将魂',
        },
        {
            idx: 1,
            name: '元宝招募十次',
            price: 4000,
            describe: '招募十次，价格八折，VIP5以上每次必出一个天选将魂'
        },
        {
            idx: 2,
            name: '功勋招募一次',
            price: 3000,
            describe: '可以招募到大将，名将以及对应的将魂'
        },
        {
            idx: 3,
            name: '功勋招募十次',
            price: 30000,
            describe: '可以招募到大将，名将以及对应的将魂'
        }
    ]

    start() {

    }

    showGroups() {
        this.showType = 0
        this.node.getChildByName('scrollView').getComponent(cc.ScrollView).scrollToTop()
        this.contect.removeAllChildren()
        for (let i = 0; i < this.recruitData.length; i++) {
            let render = cc.instantiate(this.renderPfb)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
                }, 0.3 * i)
            }
            render.getComponent(hotelRecruitRender).init(this.recruitData[i]);
            render.on(cc.Node.EventType.TOUCH_END, () => {
                this.showIntragroup()
            }, this)
        }
        this.titleDisplay.string = '将领招募'
    }

    showIntragroup() {
        this.showType = 1
        this.contect.y = 0
        this.contect.removeAllChildren()
        for (let i = 0; i < 10; i++) {
            let render = cc.instantiate(this.renderResultPfb0)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
                }, 0.3 * i)
            }
        }
        this.titleDisplay.string = '招募结果'
    }

    init() {
        this.showGroups()
    }

    onCloseHandler() {
        if (this.showType == 0) {
            console.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath)
        } else if (this.showType == 1) {
            this.showGroups()
        }

    }

    // update (dt) {}
}
