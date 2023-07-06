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

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Label)
    label0: cc.Label = null;

    @property(cc.Label)
    label1: cc.Label = null;

    start() {

    }

    init(data) {
        let defaultData = DataManager.GameData.Cards[data.template_id]
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.icon)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.bg)

        this.label0.string = defaultData.name
        this.label1.string = `LV ${data.level}`

        this.icon.on(cc.Node.EventType.TOUCH_END, () => {
            let str = DataManager.getGeneralDes(data.template_id, data.id)
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
        }, this)
    }

    // update (dt) {}
}
