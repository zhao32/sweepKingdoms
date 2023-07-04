

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

    mineData = []

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
        }
        // else if (retObj.group == 105) {//恶魔之门
        //     if (retObj.mine_points.id) {
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[retObj.mine_points])
        //     } else {
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[retObj.mine_points])
        //     }
        // }
    }

    curFiledData

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
        this.mineData = data.mine_points
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
            // filedNode.on(cc.Node.EventType.TOUCH_END, () => {
            //     filedNode.getChildByName(`light`).active = false

            //     // if (data.mine_points[i].hold_player) {
            //     //     // if (data.mine_points[i].hold_player.page == 0 && data.mine_points[i].hold_player.idx == 6) {
            //     //     //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[data.mine_points[i]])
            //     //     //     return
            //     //     // }

            //     //     // if (data.mine_points[i].hold_player.page == 0 && data.mine_points[i].hold_player.idx == 7) {
            //     //     //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[data.mine_points[i]])
            //     //     //     return
            //     //     // }

            //     //     if (data.mine_points[i].hold_player.id == DataManager.playData.id) {
            //     //         if (data.mine_points[i].hold_player.group == 101) {
            //     //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYCITY_DETAILS, ...[data.mine_points[i]])
            //     //         } else {
            //     //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYMINE_DETAILS, ...[data.mine_points[i]])
            //     //         }
            //     //     } else {
            //     //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[data.mine_points[i]])
            //     //     }
            //     // }


            //     if (data.mine_points[i].hold_player.id == DataManager.playData.id) {
            //         if (data.mine_points[i].hold_player.group == 101) {
            //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYCITY_DETAILS, ...[data.mine_points[i]])
            //         } else if (data.mine_points[i].hold_player.group == 105) {
            //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYMINE_DETAILS, ...[data.mine_points[i]])
            //         } else {
            //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYMINE_DETAILS, ...[data.mine_points[i]])
            //         }
            //     } else {
            //         if (data.mine_points[i].hold_player.group == 105) {//恶魔之门
            //             if (data.mine_points[i].hold_player.id) {
            //                 ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[data.mine_points[i]])
            //             } else {
            //                 ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[data.mine_points[i]])
            //             }
            //         } else {
            //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[data.mine_points[i]])
            //         }
            //     }
            // }, this)
            if (this.mineData[i].hold_player) {
                filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                    this.curFiledData = this.mineData[i].hold_player
                    console.log('-------点击---------')
                    filedNode.getChildByName(`light`).active = false
                    MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, this.mineData[i].hold_player.page, this.mineData[i].hold_player.idx, this.mineData[i].hold_player.country)
                    this.clickIdx = i
                }, this)
            }

        }
    }

    S2CMineEnemyDetail(retObj) {
        console.log('矿场详情:', JSON.stringify(retObj))
        let hold_player = this.mineData[this.clickIdx].hold_player
        // retObj.state = 3
        if (hold_player.id == DataManager.playData.id) {
            if (hold_player.group == 101) {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYCITY_DETAILS, ...[this.mineData[this.clickIdx]])
            } else if (hold_player.group > 101) {
                //增加打开恶魔之门按钮
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYMINE_DETAILS, ...[this.mineData[this.clickIdx]])
            } else {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYMINE_DETAILS, ...[this.mineData[this.clickIdx]])
            }
        } else {
            if (hold_player.group > 101) {//恶魔之门

                if (hold_player.id == 0)//未被占领
                {
                    //只能出兵占领
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[this.mineData[this.clickIdx], retObj.state])
                } else {
                    if (hold_player.id == DataManager.playData.id) {//我占领了
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYEVI, ...[this.mineData[this.clickIdx], retObj.state])
                    } else {//别人占领了
                        if (retObj.state == 0) {
                            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVI, ...[this.mineData[this.clickIdx], retObj.state])
                        } else if (retObj.state == 1) {
                            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this.mineData[this.clickIdx], retObj.state])
                        } else if (retObj.state == 2) {//支援结束
                            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this.mineData[this.clickIdx], retObj.state])
                        }

                    }

                    // if (retObj.state == 0) {
                    //     // ViewManager.instance.showToast(`恶魔之门还未开启`)  
                    //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[this.mineData[this.clickIdx], retObj.state])
                    // } else if (retObj.state == 1) {
                    //     //进入倒计时阶段30分钟装变为1
                    //     // ViewManager.instance.showToast(`恶魔之门打开`)
                    //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[this.mineData[this.clickIdx], retObj.state])
                    // } else if (retObj.state == 2) {
                    //     //进入倒计时阶段5分钟后状态变为0 关闭恶魔之门
                    //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this.mineData[this.clickIdx], retObj.state])
                    //     // ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[this.mineData])
                    // } else {
                    //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this.mineData[this.clickIdx], retObj.state])
                    // }
                }
            } else if (hold_player.group == 101) {
                //
                if (hold_player.id == 0) {
                    //出兵占领
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
                }
                else if (hold_player.id != 0 && retObj.state == 0) //进攻
                {
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
                }
                else if (hold_player.id != 0 && retObj.state == 1) {
                    //支援
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this.mineData[this.clickIdx], retObj.state])
                }

            } else {
                if (hold_player.id == 0) {
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
                }
                else if (hold_player.id != 0 && this.curFiledData.lv == 0) {
                    //可以进攻 不可以掠夺
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
                }
                else if (hold_player.id != 0 && this.curFiledData.lv > 0) {
                    //掠夺
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
                }
            }
        }
    }


    clickIdx
    init() {
        console.log(`this.S2CMineList:` + this.S2CMineList, this)

        // for (let i = 0; i < this.filedContect.children.length; i++) {
        //     let filedNode = this.filedContect.children[i]
        //     filedNode.on(cc.Node.EventType.TOUCH_END, () => {
        //         console.log('-------点击---------')
        //         filedNode.getChildByName(`light`).active = false
        //         MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, this.mineData[i].hold_player.page, this.mineData[i].hold_player.idx, this.mineData[i].hold_player.country)
        //         this.clickIdx = i
        //     }, this)
        // }

        NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)

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
        NetEventDispatcher.removeListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)

    }


    // update (dt) {}
}
