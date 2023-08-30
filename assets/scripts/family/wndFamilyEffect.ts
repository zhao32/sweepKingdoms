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
import familyEffectRender0 from "./familyEffectRender0";
import familyEffectRender1 from "./familyEffectRender1";

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

    @property({ type: cc.Label, displayName: "贡献值" })
    labelContribute: cc.Label = null;

    @property({ type: cc.Label, displayName: "声望" })
    labelReputation: cc.Label = null;

    showType: number = 0 // 0 分组 1 分组内

    groupsData = [
        {
            group: '人气滚滚',
            describe: '堵加主城人口恢复速度!',
            frameIdx: 0
        },
        {
            group: '经验之光',
            describe: '塔加副本经验获得!',
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
        NetEventDispatcher.addListener(NetEvent.S2CEffectList, this.S2CEffectList, this)
        this.labelContribute.string = `贡献值：` + DataManager.familyDetail.contribution
        this.labelReputation.string = `家族声望：` + DataManager.familyDetail.reputation

    }

    S2CEffectList(retObj) {
        console.log(`家族效果列表：` + JSON.stringify(retObj))

        // this.showType = 1
        // this.contect.removeAllChildren()
        // for (let i = 0; i < retObj.effs.length; i++) {
        //     let render = cc.instantiate(this.pfb2)
        //     render.parent = this.contect
        //     if (i < 5) {
        //         render.x = 1000
        //         this.scheduleOnce(() => {
        //             render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
        //         }, DataManager.SCROLLTIME2 * i)
        //     }
        //     render.getComponent(familyEffectRender1).init(retObj.effs[i])

        // }

        for (let i = 0; i < retObj.effs.length; i++) {
            // retObj.arms
            if (this.contect.children[i]) {
                let render = this.contect.children[i]
                render.getComponent(familyEffectRender1).initNetData(retObj.effs[i])
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
            render.getComponent(familyEffectRender0).init(this.groupsData[i])
            render.on(cc.Node.EventType.TOUCH_END, () => {
                this.showIntragroup(i)
                MyProtocols.send_C2SEffectList(DataManager._loginSocket, i)
            }, this)
        }
    }

    showIntragroup(idx) {
        this.showType = 1
        this.contect.removeAllChildren()
        for (let i = 0; i < DataManager.GameData.familyEffect[idx].length; i++) {
            let curData = DataManager.GameData.familyEffect[idx][i]
            let render = cc.instantiate(this.pfb2)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            render.getComponent(familyEffectRender1).init(curData)
            // render.on(cc.Node.EventType.TOUCH_END, () => {
            //     this.showIntragroup(i)
            // }, this)
        }
    }


    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CEffectList, this.S2CEffectList, this)
    }
    // update (dt) {}
}
