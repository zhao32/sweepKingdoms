// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import familyDonateRender from "./familyDonateRender";
import familyEffectArmRender from "./familyEffectArmRender";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    icon: cc.Node = null;


    @property(cc.Label)
    labelTaskName: cc.Label = null;

    @property(cc.Label)
    labelTaskCont: cc.Label = null;

    @property(cc.Label)
    labelTaskAward: cc.Label = null;

    @property(cc.Label)
    labelCoin: cc.Label = null;

    @property(cc.Label)
    labelFood: cc.Label = null;

    @property({ type: cc.Label, displayName: '声望' })
    labelReputation: cc.Label = null;


    @property({ type: cc.Label, displayName: '贡献值' })
    labelContribute: cc.Label = null;

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    donatePfb: cc.Prefab = null;

    type: number

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {


    }

    init(data, netdata, type) {
        this.type = type
        console.log("data:" + JSON.stringify(data))
        this.labelReputation.string = DataManager.familyDetail.reputation.toString()
        this.labelContribute.string = DataManager.familyDetail.contribution.toString()
        this.labelCoin.string = DataManager.playData.coinMoney
        this.labelFood.string = DataManager.playData.food.toString()

        this.labelTaskName.string = data.name
        this.labelTaskCont.string = `以下条件全部达成，${data.des}`
        this.labelTaskAward.string = ``

        if (data.type == 0) {//人气滚滚
            // this.labelTaskName.string = `主线任务`
            // this.labelTaskCont.string = data[0].des
            ResManager.loadItemIcon(`family/effect0`, this.icon)

        } else {//支线任务
            // this.labelTaskName.string = data[0].name
            // this.labelTaskCont.string = data[0].des
            // ResManager.loadItemIcon(`family/familyTask1`,this.icon)
            ResManager.loadItemIcon(`UI/prop/effect1`, this.icon)
        }

        this.contect.removeAllChildren()
        // if(netdata){
        //     for (let i = 0; i < netdata.donates.length; i++) {
        //         let render = cc.instantiate(this.donatePfb)
        //         render.parent = this.contect
        //         render.getComponent(familyEffectArmRender).init(data[i], type, netdata.donates[i])
        //     }
        // }

        for (let i = 0; i < data.item.length; i++) {

            let render = cc.instantiate(this.donatePfb)
            render.parent = this.contect
            render.getComponent(familyEffectArmRender).init(data.item[i], type, data, i)
        }

        // if (type == 0) {//主线任务
        //     this.labelTaskName.string = `主线任务`
        //     this.labelTaskCont.string = data[0].des

        // } else {//支线任务
        //     this.labelTaskName.string = data[0].name
        //     this.labelTaskCont.string = data[0].des
        // }

        NetEventDispatcher.addListener(NetEvent.S2CFamilyArmDonate, this.S2CFamilyArmDonate, this)
        NetEventDispatcher.addListener(NetEvent.S2CFamilyEffDonate, this.S2CFamilyEffDonate, this)

        
        let keys = Object.keys(DataManager.GameData.MineStone)
        console.log(`keys:` + JSON.stringify(keys))
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                if (keys[j] == DataManager.instance.itemsList[i].template_id) {
                    this.node.getChildByName(`pearls`).children[7 + j].getComponent(cc.Label).string = `x` + DataManager.instance.itemsList[i].num
                }
            }
        }

    }

    S2CFamilyArmDonate(retObj) {
        console.log(`兵种捐赠返回：` + JSON.stringify(retObj))

    }

    S2CFamilyEffDonate(retObj) {
        console.log(`效果捐赠返回：` + JSON.stringify(retObj))
        // 效果捐赠返回：{"id":11,"number":80000}
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        if (this.type == 1) {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_BARRACKS)
        } else {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_EFFECT)
        }
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyArmDonate, this.S2CFamilyArmDonate, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyEffDonate, this.S2CFamilyEffDonate, this)
    }

    // update (dt) {}
}
