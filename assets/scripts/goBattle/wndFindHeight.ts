// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";
import renderFindHieght1 from "./renderFindHieght1";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    renderPfb0: cc.Prefab = null;

    @property(cc.Prefab)
    renderPfb1: cc.Prefab = null;

    showType: number = 0 // 0 分组 1 分组内

    groupsData = [
        {
            group: '高级金矿',
        },
        {
            group: '高级农田',
        },
        {
            group: '秦国矿石',
        },
        {
            group: '齐国矿石',
        },
        {
            group: '楚国矿石',
        },
        {
            group: '燕国矿石',
        },
        {
            group: '赵国矿石',
        },
        {
            group: '魏国矿石',
        },
        {
            group: '韩国矿石',
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
            let render = cc.instantiate(this.renderPfb0)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
                }, 0.3 * i)
            }
            render.getComponent(renderFindHieght1).init(this.groupsData[i].group)
            render.on(cc.Node.EventType.TOUCH_END, () => {
                this.showIntragroup(i)
            }, this)
        }
    }

    showIntragroup(idx) {
        this.showType = 1
       

        // for (let i = 0; i < Object.keys(DataManager.GameData.bulid).length; i++) {
        //     let key = Object.keys(DataManager.GameData.bulid)[i]
        //     let value = DataManager.GameData.bulid[key]
        //     if (value.group == idx) {
        //         bulidData.push(value)
        //     }
        // }
        this.contect.removeAllChildren()
        for (let i = 0; i < 8; i++) {
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
        // this.showGroups()
    }

    onBackHandler() {
        if (this.showType == 0) {
            Logger.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath,true)
        } else if (this.showType == 1) {
            this.showGroups()
        }
    }
    // update (dt) {}
}
