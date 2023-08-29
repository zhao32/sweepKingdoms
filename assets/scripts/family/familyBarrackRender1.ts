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
        this.desLabel.string =  `lv.${data.Lv}`//data.describe
        ResManager.loadItemIcon(`family/familyArm${data.frameIdx}`,this.icon)
    }

    initNetData(netData){
        this.netData = netData
        if(netData.state == 0){
            this.node.getChildByName(`btn`).active = false
        }else if(netData.state == 1){
            this.node.getChildByName(`btn`).active = true
            this.node.getChildByName(`btn`).children[0].getComponent(cc.Label).string = `升级`

        }else if(netData.state == 2){
            this.node.getChildByName(`btn`).active = true
            this.node.getChildByName(`btn`).children[0].getComponent(cc.Label).string = `购买`
        }
    }


    onBthHandler(){ 
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        if(this.netData.state == 1){
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_ARM_EFF_UP, ...[this.data, 1])

        }else{
            //购买
        }
    }



    // update (dt) {}
}
