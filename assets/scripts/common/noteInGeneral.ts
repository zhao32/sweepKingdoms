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

    @property({ type: cc.Label, displayName: '质量' })
    quitlyDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '标题' })
    titleDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '固定技能' })
    skillDisplay: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    start() {
        this.node.getChildByName('mask').on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.hideNote(EnumManager.viewPath.NOTE_IN_GENERAL, true)
        }, this)
        
    }

    onClose() {

    }

    init(defaultData) {
        this.titleDisplay.string = defaultData.name

        this.quitlyDisplay.string = DataManager.qualityList[defaultData.quality]// + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
        this.skillDisplay.string = `固定技能：`
        for (let i = 0; i < defaultData.skills.length; i++) {
            let skillData = DataManager.GameData.Skill[defaultData.skills[i][0]]
            this.skillDisplay.string += skillData.name + ` `
        }
    }

    // update (dt) {}
}
