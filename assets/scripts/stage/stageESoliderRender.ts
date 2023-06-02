// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    numLabel: cc.Label = null;

    @property(cc.Label)
    describeLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    init(idx, soliderNum){ 
        ResManager.loadItemIcon(`soliderHead/${DataManager.armList[idx]}兵`,this.node.getChildByName(`head`))
        this.nameLabel.string = `${DataManager.armList[idx]}兵`

        this.numLabel.string = `调动数量:${soliderNum}`
        this.describeLabel.string = DataManager.GameData.Soldier[idx].describe

    }

    // update (dt) {}
}
