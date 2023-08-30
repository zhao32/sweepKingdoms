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
    nameLabel: cc.Label = null;

    @property(cc.Label)
    decLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }


    init(data) {
        console.log(`data:` + JSON.stringify(data))
        this.nameLabel.string = data.name
        this.decLabel.string = data.des
        //   let name =  DataManager.GameData.Items[String(data.goods)]
        // ResManager.loadItemIcon(`family/familyTask${data.goods}`,this.icon)
        ResManager.loadItemIcon(`UI/prop/${data.name}`, this.icon)


    }

    // update (dt) {}
}
