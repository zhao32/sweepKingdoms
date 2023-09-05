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
    numLabel: cc.Label = null;

    @property(cc.Label)
    describeLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(idx, soliderNum, cardData?: any) {
        // let arm = DataManager.GameData.Soldier[idx].arm
        ResManager.loadItemIcon(`soliderHead/${DataManager.GameData.Soldier[idx].name}`, this.node.getChildByName(`head`))
        this.nameLabel.string = `${DataManager.GameData.Soldier[idx].name}`

        this.numLabel.string = `数量: x${soliderNum}`
        this.describeLabel.string = DataManager.GameData.Soldier[idx].describe

        let data = DataManager.GameData.Soldier[idx]


        let str = DataManager.getSoliderDes(data)
        this.node.getChildByName(`head`).on(cc.Node.EventType.TOUCH_END, () => {
            // ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_SOLIDER, ...[data, cardData])

        }, this)

    }

    // update (dt) {}
}
