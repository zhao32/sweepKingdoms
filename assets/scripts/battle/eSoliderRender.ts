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

        let data = DataManager.GameData.Soldier[idx]

        
        let str = DataManager.getSoliderDes(data)
        this.node.getChildByName(`head`).on(cc.Node.EventType.TOUCH_END, () => {
            // ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_SOLIDER, ...[data])

        }, this)

    }

    // update (dt) {}
}
