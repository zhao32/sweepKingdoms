// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import familyBarrackRender0 from "./familyBarrackRender0";
import familyBarrackRender1 from "./familyBarrackRender1";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    pfb1: cc.Prefab = null;

    @property(cc.Prefab)
    pfb2: cc.Prefab = null;

    @property(cc.Node)
    contect: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    showType: number = 0 // 0 分组 1 分组内

    groupsData = [
        {
            group: '泰坦巨像',
            describe: '远古遗迹中发掘出来的两大巨像之一，拥有无坚不推的巨力，并可无限进化!',
            frameIdx: 0
        },
        {
            group: '坚壁巨像',
            describe: '远古遗迹中发担出来的两大巨像之一，拥有坚不可摧的护甲，并可无限进化!',
            frameIdx: 1
        },
        // {
        //     group: '士兵建筑',
        //     describe: '组建一支强大军备的必要建筑，可以让你叱诧风云，纵横疆场',
        //     frameIdx: 2
        // }
    ]

    start() {

    }

    init() {
        this.showGroups()
        NetEventDispatcher.addListener(NetEvent.S2CFamilyArmList, this.S2CFamilyArmList, this)
        NetEventDispatcher.addListener(NetEvent.S2CFamilyArmBuy, this.S2CFamilyArmBuy, this)
    }

    S2CFamilyArmBuy(retObj) {
        console.log(`家族兵购买返回：` + JSON.stringify(retObj))
    }

    S2CFamilyArmList(retObj) {
        console.log(`家族军队列表：` + JSON.stringify(retObj))
        // this.showType = 1
        // this.contect.removeAllChildren()
        // for (let i = 0; i <retObj.arms.length; i++) {
        //     let render = cc.instantiate(this.pfb2)
        //     render.parent = this.contect
        //     if (i < 5) {
        //         render.x = 1000
        //         this.scheduleOnce(() => {
        //             render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
        //         }, DataManager.SCROLLTIME2 * i)
        //     }
        //     render.getComponent(familyBarrackRender1).init(retObj.arms[i])

        // }

        for (let i = 0; i < retObj.arms.length; i++) {
            // retObj.arms
            if (this.contect.children[i]) {
                let render = this.contect.children[i]
                render.getComponent(familyBarrackRender1).initNetData(retObj.arms[i])
            }
        }
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
            render.getComponent(familyBarrackRender0).init(this.groupsData[i])
            render.on(cc.Node.EventType.TOUCH_END, () => {
                this.showIntragroup(i)
                MyProtocols.send_C2SFamilyArmList(DataManager._loginSocket, i)
            }, this)
        }
    }

    showIntragroup(idx) {
        this.showType = 1
        this.contect.removeAllChildren()
        for (let i = 0; i < DataManager.GameData.Mercenary[idx].length; i++) {
            let curData = DataManager.GameData.Mercenary[idx][i]
            let render = cc.instantiate(this.pfb2)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            render.getComponent(familyBarrackRender1).init(curData)
            // render.on(cc.Node.EventType.TOUCH_END, () => {
            //     this.showIntragroup(i)
            // }, this)

        }

    }


    onCloseHandler() {
        // ViewManager.instance.hideWnd(DataManager.curWndPath)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)

        if (this.showType == 0) {
            // Logger.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath)
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)

        } else if (this.showType == 1) {
            this.showGroups()
        }

    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyArmList, this.S2CFamilyArmList, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyArmBuy, this.S2CFamilyArmBuy, this)
    }

    // update (dt) {}
}
