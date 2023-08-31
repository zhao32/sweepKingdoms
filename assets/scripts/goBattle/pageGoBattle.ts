

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

enum clickType {
    CENTER = 0,
    LEFT = 1,
    RIGHT = 2,
    TOP = 3,
    BOTTOM = 4,

    LEFT_TOP = 5,
    RIGHT_TOP = 6,
    LEFT_BOTTOM = 7,
    RIGHT_BOTTOM = 8,
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    myContect: cc.Node = null;

    @property(cc.Node)
    filedContect: cc.Node = null;

    @property(cc.Node)
    filedLeftContect: cc.Node = null;

    @property(cc.Node)
    filedRightContect: cc.Node = null;

    @property(cc.Node)
    filedTopContect: cc.Node = null;

    @property(cc.Node)
    filedBottomContect: cc.Node = null;

    @property(cc.Node)
    filedLeftTopContect: cc.Node = null;

    @property(cc.Node)
    filedRightTopContect: cc.Node = null;

    @property(cc.Node)
    filedLeftBottomContect: cc.Node = null;

    @property(cc.Node)
    filedRightBottomContect: cc.Node = null;

    @property(cc.Prefab)
    myItemPfb: cc.Prefab = null;

    @property(cc.Prefab)
    filedItemPfb: cc.Prefab = null;

    curPageIdx: number = 0

    nation_id: number = 0

    maxPage: number = 1

    selectIdx: number = -1

    myCityData

    my_points = []

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
        // console.log(JSON.stringify(data))
        this.maxPage = data.pagecount
        this.nation_id = data.contry
        this.node.getChildByName(`toggleContainer`).children[this.nation_id - 1].getComponent(cc.Toggle).isChecked = true

        if (this.curPageIdx == data.page_index) {
            let my_points = []
            for (let i = 0; i < data.my_points.length; i++) {
                if (data.my_points[i].hold_player) {
                    if (data.my_points[i].hold_player.group != 101) {
                        my_points.push(data.my_points[i])
                    }
                }
            }
            my_points.sort((a, b) => b.hold_player.group - a.hold_player.group)

            for (let i = 0; i < data.my_points.length; i++) {
                if (data.my_points[i].hold_player) {
                    if (data.my_points[i].hold_player.group == 101) {
                        my_points.unshift(data.my_points[i])
                    }
                }
            }

            data.my_points = my_points
            this.myContect.removeAllChildren()
            for (let i = 0; i < data.my_points.length; i++) {
                if (data.my_points[i].hold_player) {
                    let myNode = cc.instantiate(this.myItemPfb)
                    myNode.getComponent(myItem).init(data.my_points[i].hold_player)
                    myNode.parent = this.myContect

                    if (data.my_points[i].hold_player.group == 101) {
                        this.myCityData = data.my_points[i].hold_player
                    }

                    // myNode.on(cc.Node.EventType.TOUCH_END, () => {
                    //     console.log(`定位矿的位置`)
                    //     this.selectIdx = data.my_points[i].hold_player.idx
                    //     this.curPageIdx = data.page_index
                    //     console.log(`this.selectIdx:` + this.selectIdx)
                    //     MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, data.my_points[i].hold_player.page, data.my_points[i].hold_player.country)
                    // }, this)
                }
            }
            this.my_points = data.my_points


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
        } else if (this.curPageIdx == data.page_index - 1) {//左
            this.filedLeftContect.removeAllChildren()
            for (let i = 0; i < data.mine_points.length; i++) {
                let filedNode = cc.instantiate(this.filedItemPfb)
                filedNode.parent = this.filedLeftContect
                filedNode.getComponent(filedItem).init(data.mine_points[i])

                if (data.mine_points[i].hold_player) {
                    filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                        this.curFiledData = data.mine_points[i].hold_player
                        console.log('-------点击---------')
                        filedNode.getChildByName(`light`).active = false
                        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.mine_points[i].hold_player.page, data.mine_points[i].hold_player.idx, data.mine_points[i].hold_player.country)
                        this.clickIdx = i
                    }, this)
                }
            }
        } else if (this.curPageIdx == data.page_index + 1) {//right
            this.filedRightContect.removeAllChildren()
            for (let i = 0; i < data.mine_points.length; i++) {
                let filedNode = cc.instantiate(this.filedItemPfb)
                filedNode.parent = this.filedRightContect
                filedNode.getComponent(filedItem).init(data.mine_points[i])

                if (data.mine_points[i].hold_player) {
                    filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                        this.curFiledData = data.mine_points[i].hold_player
                        console.log('-------点击---------')
                        filedNode.getChildByName(`light`).active = false
                        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.mine_points[i].hold_player.page, data.mine_points[i].hold_player.idx, data.mine_points[i].hold_player.country)
                        this.clickIdx = i
                    }, this)
                }
            }
        } else if (this.curPageIdx == data.page_index - 20) {//top
            this.filedTopContect.removeAllChildren()
            for (let i = 15; i < data.mine_points.length; i++) {
                let filedNode = cc.instantiate(this.filedItemPfb)
                filedNode.parent = this.filedTopContect
                filedNode.getComponent(filedItem).init(data.mine_points[i])

                if (data.mine_points[i].hold_player) {
                    filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                        this.curFiledData = data.mine_points[i].hold_player
                        console.log('-------点击---------')
                        filedNode.getChildByName(`light`).active = false
                        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.mine_points[i].hold_player.page, data.mine_points[i].hold_player.idx, data.mine_points[i].hold_player.country)
                        this.clickIdx = i
                    }, this)
                }
            }
        } else if (this.curPageIdx == data.page_index + 20) {//bottom
            this.filedBottomContect.removeAllChildren()
            for (let i = 0; i < 5; i++) {
                let filedNode = cc.instantiate(this.filedItemPfb)
                filedNode.parent = this.filedBottomContect
                filedNode.getComponent(filedItem).init(data.mine_points[i])

                if (data.mine_points[i].hold_player) {
                    filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                        this.curFiledData = data.mine_points[i].hold_player
                        console.log('-------点击---------')
                        filedNode.getChildByName(`light`).active = false
                        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.mine_points[i].hold_player.page, data.mine_points[i].hold_player.idx, data.mine_points[i].hold_player.country)
                        this.clickIdx = i
                    }, this)
                }
            }
        } else if (this.curPageIdx == data.page_index - 20 - 1) {//lefttop
            this.filedLeftTopContect.removeAllChildren()
            for (let i = 15; i < data.mine_points.length; i++) {
                let filedNode = cc.instantiate(this.filedItemPfb)
                filedNode.parent = this.filedLeftTopContect
                filedNode.getComponent(filedItem).init(data.mine_points[i])

                if (data.mine_points[i].hold_player) {
                    filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                        this.curFiledData = data.mine_points[i].hold_player
                        console.log('-------点击---------')
                        filedNode.getChildByName(`light`).active = false
                        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.mine_points[i].hold_player.page, data.mine_points[i].hold_player.idx, data.mine_points[i].hold_player.country)
                        this.clickIdx = i
                    }, this)
                }
            }
        } else if (this.curPageIdx == data.page_index - 20 + 1) {//righttop
            this.filedRightTopContect.removeAllChildren()
            for (let i = 15; i < data.mine_points.length; i++) {
                let filedNode = cc.instantiate(this.filedItemPfb)
                filedNode.parent = this.filedRightTopContect
                filedNode.getComponent(filedItem).init(data.mine_points[i])

                if (data.mine_points[i].hold_player) {
                    filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                        this.curFiledData = data.mine_points[i].hold_player
                        console.log('-------点击---------')
                        filedNode.getChildByName(`light`).active = false
                        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.mine_points[i].hold_player.page, data.mine_points[i].hold_player.idx, data.mine_points[i].hold_player.country)
                        this.clickIdx = i
                    }, this)
                }
            }
        } else if (this.curPageIdx == data.page_index + 20 - 1) {//leftbottom
            this.filedLeftBottomContect.removeAllChildren()
            for (let i = 0; i < 5; i++) {
                let filedNode = cc.instantiate(this.filedItemPfb)
                filedNode.parent = this.filedLeftBottomContect
                filedNode.getComponent(filedItem).init(data.mine_points[i])

                if (data.mine_points[i].hold_player) {
                    filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                        this.curFiledData = data.mine_points[i].hold_player
                        console.log('-------点击---------')
                        filedNode.getChildByName(`light`).active = false
                        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.mine_points[i].hold_player.page, data.mine_points[i].hold_player.idx, data.mine_points[i].hold_player.country)
                        this.clickIdx = i
                    }, this)
                }
            }
        } else if (this.curPageIdx == data.page_index + 20 + 1) {//rightbottom
            this.filedRightBottomContect.removeAllChildren()
            for (let i = 0; i < 5; i++) {
                let filedNode = cc.instantiate(this.filedItemPfb)
                filedNode.parent = this.filedRightBottomContect
                filedNode.getComponent(filedItem).init(data.mine_points[i])

                if (data.mine_points[i].hold_player) {
                    filedNode.on(cc.Node.EventType.TOUCH_END, () => {
                        this.curFiledData = data.mine_points[i].hold_player
                        console.log('-------点击---------')
                        filedNode.getChildByName(`light`).active = false
                        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.mine_points[i].hold_player.page, data.mine_points[i].hold_player.idx, data.mine_points[i].hold_player.country)
                        this.clickIdx = i
                    }, this)
                }
            }
        }

        for (let i = 0; i < this.myContect.children.length; i++) {
            if (data.my_points[i].hold_player) {
                let myNode = this.myContect.children[i]


                myNode.on(cc.Node.EventType.TOUCH_END, () => {
                    console.log(`定位矿的位置`)
                    this.selectIdx = data.my_points[i].hold_player.idx
                    this.curPageIdx = data.my_points[i].hold_player.page
                    console.log(`this.selectIdx:` + this.selectIdx)
                    MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, data.my_points[i].hold_player.page, data.my_points[i].hold_player.country)
                }, this)
            }
        }
    }

    S2CMineEnemyDetail(retObj) {
        console.log('矿场详情:', JSON.stringify(retObj))
        DataManager.curMineDetailData = retObj
        let hold_player = this.curFiledData//this.mineData[this.clickIdx].hold_player
        // retObj.state = 3

        if (hold_player.group > 101) {//恶魔之门
            if (hold_player.id == 0)//未被占领
            {
                //只能出兵占领
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[hold_player])
            } else {
                if (hold_player.id == DataManager.playData.id) {//我占领了
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYEVI, ...[hold_player])
                } else {//别人占领了
                    if (retObj.state == 0) {
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVI, ...[hold_player])
                    } else if (retObj.state == 1) {
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[hold_player, retObj.state])
                    } else if (retObj.state == 2) {//支援结束
                        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[hold_player, retObj.state])
                    }
                }
            }
        } else if (hold_player.group == 101) {
            //
            if (hold_player.id == 0) {
                //出兵占领
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[hold_player])
            } else if (hold_player.id != DataManager.playData.id) {
                if (retObj.state == 0) //进攻
                {
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[hold_player])
                } else if (retObj.state == 1) {
                    //支援
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[hold_player, retObj.state])
                } else if (retObj.state == 2) {//支援结束
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[hold_player, retObj.state])
                }
            } else if (hold_player.id == DataManager.playData.id) {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYCITY_DETAILS, ...[hold_player])
            }
        } else {
            if (hold_player.id == 0) {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[hold_player])
            } else if (hold_player.id != DataManager.playData.id) {
                if (this.curFiledData.lv == 0) {
                    //可以进攻 不可以掠夺
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[hold_player])
                } else if (this.curFiledData.lv > 0) {
                    //掠夺
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[hold_player])
                }
            } else if (hold_player.id == DataManager.playData.id) {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYMINE_DETAILS, ...[hold_player])
            }
        }







        // if (hold_player.id == DataManager.playData.id) {
        //     if (hold_player.group == 101) {
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYCITY_DETAILS, ...[this.mineData[this.clickIdx]])
        //     } else if (hold_player.group > 101) {
        //         //增加打开恶魔之门按钮
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYMINE_DETAILS, ...[this.mineData[this.clickIdx]])
        //     } else {
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYMINE_DETAILS, ...[this.mineData[this.clickIdx]])
        //     }
        // } else {
        //     if (hold_player.group > 101) {//恶魔之门
        //         if (hold_player.id == 0)//未被占领
        //         {
        //             //只能出兵占领
        //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATECLOSE, ...[this.mineData[this.clickIdx], retObj.state])
        //         } else {
        //             if (hold_player.id == DataManager.playData.id) {//我占领了
        //                 ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_MYEVI, ...[this.mineData[this.clickIdx], retObj.state])
        //             } else {//别人占领了
        //                 if (retObj.state == 0) {
        //                     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVI, ...[this.mineData[this.clickIdx], retObj.state])
        //                 } else if (retObj.state == 1) {
        //                     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this.mineData[this.clickIdx], retObj.state])
        //                 } else if (retObj.state == 2) {//支援结束
        //                     ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this.mineData[this.clickIdx], retObj.state])
        //                 }
        //             }
        //         }
        //     } else if (hold_player.group == 101) {
        //         //
        //         if (hold_player.id == 0) {
        //             //出兵占领
        //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
        //         }
        //         else if (hold_player.id != 0 && retObj.state == 0) //进攻
        //         {
        //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
        //         }
        //         else if (hold_player.id != 0 && retObj.state == 1) {
        //             //支援
        //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_EVIGATEOPEN, ...[this.mineData[this.clickIdx], retObj.state])
        //         }
        //     } else {
        //         if (hold_player.id == 0) {
        //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
        //         } else if (hold_player.id != 0 && this.curFiledData.lv == 0) {
        //             //可以进攻 不可以掠夺
        //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
        //         } else if (hold_player.id != 0 && this.curFiledData.lv > 0) {
        //             //掠夺
        //             ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_DETAILS, ...[this.mineData[this.clickIdx]])
        //         }
        //     }
        // }
    }

    applyMines() {
        console.log("prePageIdx:" + this.curPageIdx)
        console.log("preNation:" + this.nation_id)
        if (this.curPageIdx > 400) {
            this.curPageIdx -= 400
            this.nation_id = (this.nation_id + 1) % 7
        } else if (this.curPageIdx < 0) {
            this.curPageIdx += 400
            this.nation_id = (this.nation_id - 1) % 7
        }
        if (this.nation_id == 0) this.nation_id = 7
        console.log("curPageIdx:" + this.curPageIdx)
        console.log("curNation:" + this.nation_id)

        let delay = 0.25
        MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)
        this.scheduleOnce(() => {
            console.log(`延迟请求`)
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx - 1, this.nation_id)//左
        }, delay * 1)

        this.scheduleOnce(() => {
            console.log(`延迟请求`)
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx + 1, this.nation_id)//右
        }, delay * 2)
        this.scheduleOnce(() => {
            console.log(`延迟请求`)
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx - 20, this.nation_id)//上
        }, delay * 3)

        this.scheduleOnce(() => {
            console.log(`延迟请求`)
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx + 20, this.nation_id)//下
        }, delay * 4)

        this.scheduleOnce(() => {
            console.log(`延迟请求`)
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx - 20 - 1, this.nation_id)//左上
        }, delay * 5)

        this.scheduleOnce(() => {
            console.log(`延迟请求`)
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx - 20 + 1, this.nation_id)//右上
        }, delay * 7)

        this.scheduleOnce(() => {
            console.log(`延迟请求`)
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx + 20 - 1, this.nation_id)//左下
        }, delay * 8)

        this.scheduleOnce(() => {
            console.log(`延迟请求`)
            MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx + 20 + 1, this.nation_id)//右下
        }, delay * 9)
    }


    clickIdx
    init() {
        // console.log(`this.S2CMineList:` + this.S2CMineList, this)

        // for (let i = 0; i < this.filedContect.children.length; i++) {
        //     let filedNode = this.filedContect.children[i]
        //     filedNode.on(cc.Node.EventType.TOUCH_END, () => {
        //         console.log('-------点击---------')
        //         filedNode.getChildByName(`light`).active = false
        //         MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, this.mineData[i].hold_player.page, this.mineData[i].hold_player.idx, this.mineData[i].hold_player.country)
        //         this.clickIdx = i
        //     }, this)
        // }
        this.filedContect.removeAllChildren()
        this.filedBottomContect.removeAllChildren()
        this.filedTopContect.removeAllChildren()
        this.filedLeftContect.removeAllChildren()
        this.filedRightContect.removeAllChildren()

        this.filedLeftBottomContect.removeAllChildren()
        this.filedLeftTopContect.removeAllChildren()
        this.filedRightBottomContect.removeAllChildren()
        this.filedRightTopContect.removeAllChildren()

        NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail, this)

        NetEventDispatcher.addListener(NetEvent.S2CMineList, this.S2CMineList, this)
        NetEventDispatcher.addListener(NetEvent.S2CFindMines, this.S2CFindMines, this)

        this.nation_id = DataManager.playData.nation_id
        this.curPageIdx = 10
        this.applyMines()


        for (let i = 0; i < this.node.getChildByName(`toggleContainer`).children.length; i++) {
            let child = this.node.getChildByName(`toggleContainer`).children[i]
            if (i + 1 == this.nation_id) {
                child.getComponent(cc.Toggle).isChecked = true
            }
            child.on('toggle', () => {
                if (child.getComponent(cc.Toggle).isChecked == true) {
                    this.nation_id = i + 1
                    this.curPageIdx = 200
                    this.applyMines()
                }
            }, this)
        }
    }

    changeCountryId(country) {
        this.nation_id = country
        this.node.getChildByName(`toggleContainer`).children[country - 1].getComponent(cc.Toggle).isChecked = true
    }

    // btnLeft() {
    //     console.log('左刷新')
    //     if (this.curPageIdx > 0) {
    //         this.curPageIdx--
    //         MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)
    //     } else {
    //         ViewManager.instance.showToast('没有更多了')
    //     }
    // }
    // btnRight() {
    //     console.log('右刷新')
    //     if (this.curPageIdx < this.maxPage - 1) {
    //         this.curPageIdx++
    //         MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)
    //     } else {
    //         ViewManager.instance.showToast('没有更多了')
    //     }
    // }

    btnLeft() {
        console.log('左刷新')
        this.curPageIdx--
        this.applyMines()
        // MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx, this.nation_id)
        // MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx - 1, this.nation_id)//左
        // MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx + 1, this.nation_id)//右
        // MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx - 20, this.nation_id)//上
        // MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx + 20, this.nation_id)//下
        // MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx - 20 - 1, this.nation_id)//左上
        // MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx - 20 + 1, this.nation_id)//右上
        // MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx + 20 - 1, this.nation_id)//左下
        // MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, this.curPageIdx + 20 + 1, this.nation_id)//右下

    }
    btnRight() {
        console.log('右刷新')
        this.curPageIdx++
        this.applyMines()
    }

    btnTop() {
        console.log('上刷新')
        this.curPageIdx = this.curPageIdx - 20 * 1
        this.applyMines()
    }

    btnBottom() {
        console.log('下刷新')
        this.curPageIdx = this.curPageIdx + 20 * 1
        this.applyMines()
    }

    btnLeftTop() {
        console.log('左上刷新')
        this.curPageIdx = this.curPageIdx - 20 * 1 - 1
        this.applyMines()
    }

    btnRightTop() {
        console.log('右上刷新')
        this.curPageIdx = this.curPageIdx - 20 * 1 + 1
        this.applyMines()
    }

    btnLeftBottom() {
        console.log('左下刷新')
        this.curPageIdx = this.curPageIdx + 20 * 1 - 1
        this.applyMines()
    }

    btnRightBottom() {
        console.log('右下刷新')
        this.curPageIdx = this.curPageIdx + 20 * 1 + 1
        this.applyMines()
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
