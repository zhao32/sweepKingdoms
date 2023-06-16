// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";
import renderFindHieght1 from "./renderFindHieght1";
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
    renderPfb0: cc.Prefab = null;

    @property(cc.Prefab)
    renderPfb1: cc.Prefab = null;

    showType: number = 0 // 0 分组 1 分组内

    groupsData = [

        {
            group: '魏国矿石',
        },
        {
            group: '燕国矿石',
        },
        {
            group: '秦国矿石',
        },
        {
            group: '楚国矿石',
        },
        {
            group: '赵国矿石',
        },
        {
            group: '韩国矿石',
        },
        {
            group: '楚国矿石',
        },
        {
            group: '高级金矿',
        },
        {
            group: '高级农田',
        }
    ]

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.showGroups()
        NetEventDispatcher.addListener(NetEvent.S2CFindMines, this.S2CFindMines.bind(this))
    }

    S2CFindMines(retObj) {
        console.log(`查找高级矿返回：` + JSON.stringify(retObj))
        // retObj.mine_points
        this.showIntragroup(retObj.mine_points)
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
            render.getComponent(renderFindHieght1).init(this.groupsData[i].group)
            render.on(cc.Node.EventType.TOUCH_END, () => {
                // this.showIntragroup(i)
                console.log(`查找${this.groupsData[i].group}`)
                if (i < 7) {//查找国家矿
                    MyProtocols.send_C2SFindMines(DataManager._loginSocket, i + 1, DataManager.pageGoBattle.nation_id, 0, 0)
                } else {
                    MyProtocols.send_C2SFindMines(DataManager._loginSocket, i + 1, DataManager.pageGoBattle.nation_id, 0, 4)
                }

            }, this)
        }
    }



    showIntragroup(data) {
        this.showType = 1


        // for (let i = 0; i < Object.keys(DataManager.GameData.bulid).length; i++) {
        //     let key = Object.keys(DataManager.GameData.bulid)[i]
        //     let value = DataManager.GameData.bulid[key]
        //     if (value.group == idx) {
        //         bulidData.push(value)
        //     }
        // }
        let mineData = []
        for (let i = 0; i < data.length; i++) {
            if (data[i].hold_player) {
                mineData.push(data[i])
            }
        }
        this.contect.removeAllChildren()
        for (let i = 0; i < mineData.length; i++) {
            let render = cc.instantiate(this.renderPfb1)
            render.getComponent(renderFindHieght2).init(mineData[i].hold_player)

            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }

            render.on(cc.Node.EventType.TOUCH_END, () => {
                DataManager.pageGoBattle.selectIdx = mineData[i].hold_player.idx
                console.log(`查找第 ${mineData[i].hold_player.page} 页   第${mineData[i].hold_player.idx}个`)
                MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, mineData[i].hold_player.page, DataManager.pageGoBattle.nation_id)
                ViewManager.instance.hideWnd(DataManager.curWndPath)
            }, this)
        }
    }

    init() {
        // this.showGroups()
    }

    onBackHandler() {
        if (this.showType == 0) {
            Logger.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        } else if (this.showType == 1) {
            this.showGroups()
        }
    }
    // update (dt) {}
}
