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

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

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

    @property(cc.Node)
    icon: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {


    }

    init(data, type) {
        console.log("data:" + JSON.stringify(data))
        this.labelReputation.string = DataManager.familyDetail.reputation.toString()
        this.labelContribute.string = DataManager.familyDetail.contribution.toString()
        this.labelCoin.string = DataManager.playData.coinMoney
        this.labelFood.string = DataManager.playData.food.toString()
        this.contect.removeAllChildren()
        for (let i = 0; i < data.length; i++) {
            let render = cc.instantiate(this.donatePfb)
            render.parent = this.contect
            render.getComponent(familyDonateRender).init(data[i])
        }
        if (type == 0) {//主线任务
            this.labelTaskName.string = `主线任务`
            this.labelTaskCont.string = data[0].des
            ResManager.loadItemIcon(`family/familyTask0`,this.icon)

        } else {//支线任务
            this.labelTaskName.string = data[0].name
            this.labelTaskCont.string = data[0].des
            ResManager.loadItemIcon(`family/familyTask1`,this.icon)
        }

        NetEventDispatcher.addListener(NetEvent.S2CFamilyTaskSend, this.S2CFamilyTaskSend, this)

    }

    S2CFamilyTaskSend(retObj) {
        console.log(`捐献返回：`+ JSON.stringify(retObj))

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_TASK)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyTaskSend, this.S2CFamilyTaskSend, this)

    }

    // update (dt) {}
}
