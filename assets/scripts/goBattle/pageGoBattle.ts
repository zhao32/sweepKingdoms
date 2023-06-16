

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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // S2CMineList
        DataManager.pageGoBattle = this
        NetEventDispatcher.addListener(NetEvent.S2CMineList, this.S2CMineList.bind(this))
        NetEventDispatcher.addListener(NetEvent.S2CFindMines, this.S2CFindMines.bind(this))

    }

    S2CFindMines(retObj) {
        console.log(`查找矿返回：` + JSON.stringify(retObj))
        // retObj.mine_points

        if (retObj.type == 111) {//肥羊
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FY, ...[retObj.mine_points])
        }
    }

    S2CMineList(data) {
        console.log('------------------------------------')
        console.log(`this.selectIdx:`+this.selectIdx)
        data.mine_points
        data.my_hold
        this.maxPage = data.pagecount
        this.myContect.removeAllChildren()
        this.nation_id = data.contry
        this.node.getChildByName(`toggleContainer`).children[this.nation_id - 1].getComponent(cc.Toggle).isChecked = true
        for (let i = 0; i < data.my_points.length; i++) {
            if (data.my_points[i].hold_player) {
                let myNode = cc.instantiate(this.myItemPfb)
                myNode.getComponent(myItem).init(data.my_points[i].hold_player)
                myNode.parent = this.myContect

                myNode.on(cc.Node.EventType.TOUCH_END, () => {
                    console.log(`定位矿的位置`)
                    this.selectIdx = data.my_points[i].hold_player.idx
                    MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, data.my_points[i].hold_player.page, this.nation_id)
                }, this)
            }
        }

        this.filedContect.removeAllChildren()
        for (let i = 0; i < data.mine_points.length; i++) {
            let filedNode = cc.instantiate(this.filedItemPfb)
            filedNode.parent = this.filedContect
            filedNode.getComponent(filedItem).init(data.mine_points[i])
            if (this.selectIdx == i) {
                console.log('-----------------------:')
                filedNode.getChildByName(`light`).active = true
                this.selectIdx = -1
            } else {
                // filedNode.getChildByName(`light`).active = false
            }
            filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                filedNode.getChildByName(`light`).active = false

                if (data.mine_points[i].hold_player) {
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

        // this.myContect.removeAllChildren()
        // for (let i = 0; i < 5; i++) {
        //     let myItem = cc.instantiate(this.myItemPfb)
        //     myItem.parent = this.myContect
        // }

        // cc.resources.loadDir("Mine/Mine_01", cc.JsonAsset, (err, filedJSON) => {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         // console.log('json:' + JSON.stringify(filedJSON))

        //         //@ts-ignore
        //         let filedList = filedJSON[0].json

        //         this.filedContect.removeAllChildren()
        //         for (let i = 0; i < filedList.length; i++) {
        //             let filedNode = cc.instantiate(this.filedItemPfb)
        //             filedNode.parent = this.filedContect
        //             filedNode.getComponent(filedItem).init(filedList[i])
        //             filedNode.on(cc.Node.EventType.TOUCH_END, () => {
        //                 if (filedList[i].type != 0) {
        //                     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[filedList[i]])
        //                 }
        //             }, this)
        //         }

        //     }
        // });


    }

    btnLeft() {
        console.log('左刷新')
        if (this.curPageIdx > 0) {
            this.curPageIdx--
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)
        } else {
            ViewManager.instance.showToast('没有更多了')
        }
        // this.filedContect.removeAllChildren()

        // for (let i = 0; i < 27; i++) {
        //     let filedItem = cc.instantiate(this.filedItemPfb)
        //     this.scheduleOnce(() => {
        //         filedItem.parent = this.filedContect
        //     }, 0.01 * i)

        //     filedItem.on(cc.Node.EventType.TOUCH_END, () => {
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS)
        //     }, this)
        // }
    }
    btnRight() {
        console.log('右刷新')
        if (this.curPageIdx < this.maxPage - 1) {
            this.curPageIdx++
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)
        } else {
            ViewManager.instance.showToast('没有更多了')
        }
        // this.filedContect.removeAllChildren()
        // for (let i = 0; i < 27; i++) {
        //     let filedItem = cc.instantiate(this.filedItemPfb)
        //     this.scheduleOnce(() => {
        //         filedItem.parent = this.filedContect
        //     }, 0.01 * i)
        //     filedItem.on(cc.Node.EventType.TOUCH_END, () => {
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS)
        //     }, this)
        // }
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
        MyProtocols.send_C2SFindMines(DataManager._loginSocket, 111, DataManager.pageGoBattle.nation_id, 0, 0)

        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FY)
    }

    onFindHandler() {
        console.log('------查找---------')
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_FIND)


    }


    // update (dt) {}
}
