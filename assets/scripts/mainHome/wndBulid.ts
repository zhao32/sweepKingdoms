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
import renderBulid0 from "./renderBulid0";
import renderBulid1 from "./renderBulid1";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    titleLabel: cc.Label = null;

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    renderPfb0: cc.Prefab = null;

    @property(cc.Prefab)
    renderPfb1: cc.Prefab = null;

    showType: number = 0 // 0 分组 1 分组内

    groupsData = [
        {
            group: '基础设施',
            describe: '基础建筑设施，为主城提升人口、仓储、城防等收益',
            frameIdx: 0
        },
        {
            group: '资源建筑',
            describe: '为主城提供源源不断的战略资源，是游戏中很重要的建筑',
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
        // this.showGroups()
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
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            render.getComponent(renderBulid0).init(this.groupsData[i])
            render.on(cc.Node.EventType.TOUCH_END, () => {
                this.showIntragroup(i)
            }, this)
        }
    }

    showIntragroup(idx) {
        this.showType = 1
        let bulidData = []
        if (idx == 0) bulidData = DataManager.GameData.build["basic"]
        else if (idx == 1) bulidData = DataManager.GameData.build["resource"]
        else if (idx == 2) bulidData = DataManager.GameData.build["barracks"]

        // for (let i = 0; i < Object.keys(DataManager.GameData.bulid).length; i++) {
        //     let key = Object.keys(DataManager.GameData.bulid)[i]
        //     let value = DataManager.GameData.bulid[key]
        //     if (value.group == idx) {
        //         bulidData.push(value)
        //     }
        // }
        this.contect.removeAllChildren()
        for (let i = 0; i < bulidData.length; i++) {
            let render = cc.instantiate(this.renderPfb1)
            render.parent = this.contect
            render.getComponent(renderBulid1).init(bulidData[i])
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
        }
    }

    type
    init(type) {
        this.type = type
        if (type == 0) {
            this.titleLabel.string = `主城建设`
            this.showGroups()
        } else {
            this.titleLabel.string = `军需要务`
            this.showIntragroup(2)
        }
    }

    onBackHandler() {
        if (this.type == 1) {
            ViewManager.instance.hideWnd(DataManager.curWndPath)
        } else {
            if (this.showType == 0) {
                Logger.log('关闭窗口')
                ViewManager.instance.hideWnd(DataManager.curWndPath)
            } else if (this.showType == 1) {
                this.showGroups()
            }
        }

    }

    onClose() {

    }

    // update (dt) {}
}
