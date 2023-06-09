// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    numLabel: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    typeNode: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    arm: number

    // onLoad () {}

    start() {

    }

    init(data) {
        console.log(JSON.stringify(data))
        let soldierData = DataManager.GameData.Soldier[data.arm]
        ResManager.loadItemIcon(`soliderHead/${soldierData.name}`, this.head)
        this.numLabel.string = `x${data.count}`
        ResManager.loadItemIcon(`hero/soldierType${data.arm}`, this.typeNode)

        this.arm = data.arm
    }

    changeState(count) {
        this.numLabel.string = `x${count}`
        if (count == 0) {
            this.head.color = cc.Color.GRAY
        }
    }

    // update (dt) {}
}