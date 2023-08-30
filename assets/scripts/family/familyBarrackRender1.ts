// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    desLabel: cc.Label = null;

    @property(cc.Label)
    stateLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    data

    netData
    // onLoad () {}

    start() {

    }

    init(data) {
        this.data = data
        this.nameLabel.string = data.name
        this.desLabel.string = data.des
        ResManager.loadItemIcon(`family/familyArm${data.type}`, this.icon)

        if (DataManager.familyDetail.familyLv < data.Lv) {
            this.node.getChildByName(`btn`).active = false
            this.stateLabel.node.active = true
        } else {
            this.node.getChildByName(`btn`).active = true
            this.stateLabel.node.active = false
        }
    }

    initNetData(netData) {
        this.netData = netData
        if (netData.state == 0) {
            this.node.getChildByName(`btn`).active = false
            this.stateLabel.node.active = true
        } else if (netData.state == 1) {
            this.node.getChildByName(`btn`).active = true
            this.stateLabel.node.active = false
            this.node.getChildByName(`btn`).children[0].getComponent(cc.Label).string = `升级`

        } else if (netData.state == 2) {
            this.node.getChildByName(`btn`).active = true
            this.stateLabel.node.active = false
            this.node.getChildByName(`btn`).children[0].getComponent(cc.Label).string = `购买`
        }
    }


    onBthHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_ARM_EFF_UP, ...[this.data, this.netData, 1])

        // if (this.netData.state == 1) {
        //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_ARM_EFF_UP, ...[this.data, 1])
        // } else {
        //     //购买
        //     MyProtocols.send_C2SFamilyArmBuy(DataManager._loginSocket, this.data.id, 1)
        // }
    }



    // update (dt) {}
}
