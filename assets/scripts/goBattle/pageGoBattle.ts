

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import filedItem from "./filedItem";
import myItem from "./myItem";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

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

    curPageIdx: number = 0

    nation_id: number = 0

    maxPage: number = 1

    selectIdx: number = -1

    myCityData

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // S2CMineList
        DataManager.pageGoBattle = this

    }

    S2CFindMines(retObj) {
        console.log(`查找矿返回：` + JSON.stringify(retObj))
        // retObj.mine_points

        if (retObj.type == 101) {//肥羊
            let mineData = []
            for (let i = 0; i < retObj.mine_points.length; i++) {
                if (retObj.mine_points[i].hold_player) {
                    mineData.push(retObj.mine_points[i])
                }
            }
            if (mineData.length == 0) {
                ViewManager.instance.showToast(`未查询到当前类型的矿场`)
                return
            }
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FY, ...[retObj.mine_points])
        } else if (retObj.type == 105) {//恶魔之门
            if (retObj.mine_points.id) {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[retObj.mine_points])
            } else {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[retObj.mine_points])
            }
        }
    }

    S2CMineList(data) {
        console.log(`..this.selectIdx:` + this.selectIdx)
        console.log(JSON.stringify(data))
        this.maxPage = data.pagecount
        this.myContect.removeAllChildren()
        this.nation_id = data.contry
        this.node.getChildByName(`toggleContainer`).children[this.nation_id - 1].getComponent(cc.Toggle).isChecked = true
        for (let i = 0; i < data.my_points.length; i++) {
            if (data.my_points[i].hold_player) {
                let myNode = cc.instantiate(this.myItemPfb)
                myNode.getComponent(myItem).init(data.my_points[i].hold_player)
                myNode.parent = this.myContect

                if (data.my_points[i].hold_player.group == 101) {
                    this.myCityData = data.my_points[i].hold_player
                }

                myNode.on(cc.Node.EventType.TOUCH_END, () => {
                    console.log(`定位矿的位置`)
                    this.selectIdx = data.my_points[i].hold_player.idx
                    console.log(`this.selectIdx:` + this.selectIdx)
                    MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, data.my_points[i].hold_player.page, data.my_points[i].hold_player.country)
                }, this)
            }
        }

        this.filedContect.removeAllChildren()
        for (let i = 0; i < data.mine_points.length; i++) {
            let filedNode = cc.instantiate(this.filedItemPfb)
            filedNode.parent = this.filedContect
            filedNode.getComponent(filedItem).init(data.mine_points[i])
            if (this.selectIdx == i) {
                console.log('-----------light------------:')
                filedNode.getChildByName(`light`).active = true
                this.selectIdx = -1
            } else {
                // filedNode.getChildByName(`light`).active = false
            }
            filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                filedNode.getChildByName(`light`).active = false

                if (data.mine_points[i].hold_player) {
                    // if (data.mine_points[i].hold_player.page == 0 && data.mine_points[i].hold_player.idx == 6) {
                    //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[data.mine_points[i]])
                    //     return
                    // }

                    // if (data.mine_points[i].hold_player.page == 0 && data.mine_points[i].hold_player.idx == 7) {
                    //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[data.mine_points[i]])
                    //     return
                    // }

                    if (data.mine_points[i].hold_player.id == DataManager.playData.id) {
                        if (data.mine_points[i].hold_player.group == 101) {
                            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYCITY_DETAILS, ...[data.mine_points[i]])
                        } else {
                            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYMINE_DETAILS, ...[data.mine_points[i]])
                        }
                    } else {
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[data.mine_points[i]])
                    }
                }




            }, this)
        }
    }

    init() {
        console.log(`this.S2CMineList:` + this.S2CMineList, this)

        NetEventDispatcher.addListener(NetEvent.S2CMineList, this.S2CMineList, this)
        NetEventDispatcher.addListener(NetEvent.S2CFindMines, this.S2CFindMines, this)

        this.nation_id = DataManager.playData.nation_id
        this.curPageIdx = 0
        MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)

        for (let i = 0; i < this.node.getChildByName(`toggleContainer`).children.length; i++) {
            let child = this.node.getChildByName(`toggleContainer`).children[i]
            if (i + 1 == this.nation_id) {
                child.getComponent(cc.Toggle).isChecked = true
            }
            child.on('toggle', () => {
                if (child.getComponent(cc.Toggle).isChecked == true) {
                    this.nation_id = i + 1
                    MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)
                }
            }, this)
        }
    }

    btnLeft() {
        console.log('左刷新')
        if (this.curPageIdx > 0) {
            this.curPageIdx--
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)
        } else {
            ViewManager.instance.showToast('没有更多了')
        }
    }
    btnRight() {
        console.log('右刷新')
        if (this.curPageIdx < this.maxPage - 1) {
            this.curPageIdx++
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)
        } else {
            ViewManager.instance.showToast('没有更多了')
        }
    }


    onBackHandler() {
        console.log('------点击关闭---------')
        ViewManager.instance.hideView(EnumManager.viewPath.PAGE_GOBATTLE)
    }

    onRecordHandler() {
        console.log('------日志---------')
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_RECORD)
    }


    onFeiYHandler() {
        console.log('------肥羊---------')
        MyProtocols.send_C2SFindMines(DataManager._loginSocket, 101, DataManager.pageGoBattle.nation_id, 0, 0)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FY)
    }

    onFindHandler() {
        console.log('------查找---------')
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FIND)
    }

    onClose() {
        console.log(`-------关闭-----------`)
        NetEventDispatcher.removeListener(NetEvent.S2CMineList, this.S2CMineList, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFindMines, this.S2CFindMines, this)
    }


    // update (dt) {}
}
