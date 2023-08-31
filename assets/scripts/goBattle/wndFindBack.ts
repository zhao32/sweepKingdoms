// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import renderFindHieght2 from "./renderFindHieght2";

const { ccclass, property } = cc._decorator;


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    specialPfb: cc.Prefab = null;

    @property(cc.Prefab)
    groupPfb: cc.Prefab = null;

    showType: number = 0 // 0 分组 1 分组内

    groupsData = [

        {
            group: '魏国重镇',
        },
        {
            group: '燕国重镇',
        },
        {
            group: '秦国重镇',
        },
        {
            group: '赵国重镇',
        },
        {
            group: '齐国重镇',
        },
        {
            group: '韩国重镇',
        },
        {
            group: '楚国重镇',
        }
    ]

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _data

    start() {

    }

    selectMine(data, country) {
        this.node.getChildByName('scrollView').getComponent(cc.ScrollView).scrollToTop()
        this.contect.removeAllChildren()
        for (let j = 0; j < data.length; j++) {
            if (data[j].hold_player.country == country) {
                let render = cc.instantiate(this.specialPfb)
                render.parent = this.contect
                render.getComponent(renderFindHieght2).init(data[j].hold_player)

                if (j < 5) {
                    render.x = 1000
                    this.scheduleOnce(() => {
                        render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                    }, DataManager.SCROLLTIME2 * j)
                }

                render.on(cc.Node.EventType.TOUCH_END, () => {
                    DataManager.pageGoBattle.selectIdx = data[j].hold_player.idx
                    DataManager.pageGoBattle.curPageIdx = data[j].hold_player.page
                    console.log(`查找第 ${data[j].hold_player.page} 页   第 ${data[j].hold_player.idx}个`)
                    DataManager.pageGoBattle.changeCountryId(data[j].hold_player.country)
                    MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, data[j].hold_player.page, DataManager.pageGoBattle.nation_id)
                    ViewManager.instance.hideWnd(DataManager.curWndPath)
                }, this)
            }

        }
    }

    init(data) {
        console.log(`----data:`+JSON.stringify(data))
        this._data = data
        this.showType = 0
        this.node.getChildByName('scrollView').getComponent(cc.ScrollView).scrollToTop()
        this.contect.removeAllChildren()
        if (data[0].hold_player.group == 102) {
            for (let i = 0; i < 7; i++) {
                let render = cc.instantiate(this.groupPfb)
                render.getChildByName(`group`).getComponent(cc.Label).string = this.groupsData[i].group
                render.parent = this.contect
                render.on(cc.Node.EventType.TOUCH_END, () => {
                    this.showType = 1
                    this.selectMine(data, i + 1)
                }, this)

                if (i < 5) {
                    render.x = 1000
                    this.scheduleOnce(() => {
                        render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                    }, DataManager.SCROLLTIME2 * i)
                }
            }
        } else {
            for (let i = 0; i < data.length; i++) {
                let render = cc.instantiate(this.specialPfb)
                render.parent = this.contect
                render.getComponent(renderFindHieght2).init(data[i].hold_player)

                if (i < 5) {
                    render.x = 1000
                    this.scheduleOnce(() => {
                        render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                    }, DataManager.SCROLLTIME2 * i)
                }

                render.on(cc.Node.EventType.TOUCH_END, () => {
                    DataManager.pageGoBattle.selectIdx = data[i].hold_player.idx
                    DataManager.pageGoBattle.curPageIdx =data[i].hold_player.page

                    console.log(`查找第 ${data[i].hold_player.page} 页   第 ${data[i].hold_player.idx}个`)
                    DataManager.pageGoBattle.changeCountryId(data[i].hold_player.country)
                    MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, data[i].hold_player.page, data[i].hold_player.country)
                    ViewManager.instance.hideWnd(DataManager.curWndPath)
                }, this)
            }
        }

    }

    onCloseHandler() {
        if (this.showType == 1) {
            this.showType = 0
            this.node.getChildByName('scrollView').getComponent(cc.ScrollView).scrollToTop()
            this.contect.removeAllChildren()
            for (let i = 0; i < 7; i++) {
                let render = cc.instantiate(this.groupPfb)
                render.getChildByName(`group`).getComponent(cc.Label).string = this.groupsData[i].group
                render.parent = this.contect
                render.on(cc.Node.EventType.TOUCH_END, () => {
                    this.showType = 1
                    this.selectMine(this._data, i + 1)
                }, this)

                if (i < 5) {
                    render.x = 1000
                    this.scheduleOnce(() => {
                        render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                    }, DataManager.SCROLLTIME2 * i)
                }
            }
        } else {
            ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        }
    }

    onClose() {

    }

    // update (dt) {}
}
