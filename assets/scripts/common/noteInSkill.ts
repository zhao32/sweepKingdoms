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

    @property({ type: cc.Label, displayName: '标题' })
    titleDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '类型' })
    typeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '品质' })
    quitlyDisplay: cc.Label = null;


    @property({ type: cc.Label, displayName: '描述' })
    desDisplay: cc.Label = null;


    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    start() {

        this.node.getChildByName('mask').on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.hideNote(EnumManager.viewPath.NOTE_IN_SKILL, true)
        }, this)
    }

    onClose() {

    }

    init(skillSt) {
        this.titleDisplay.string = skillSt.name


        if (skillSt.type == 1) {
            ResManager.loadItemIcon(`skillats/红`, this.headBg)
            this.typeDisplay.string = `技能类型：红色技能`
        } else if (skillSt.type == 2) {
            ResManager.loadItemIcon(`skillats/黄`, this.headBg)
            this.typeDisplay.string = `技能类型：黄色技能`
        } else if (skillSt.type == 3) {
            ResManager.loadItemIcon(`skillats/蓝`, this.headBg)
            this.typeDisplay.string = `技能类型：蓝色技能`
        }
        this.quitlyDisplay.string = `品质：${skillSt.name.length - 2}字技能`
        ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.head)
        this.desDisplay.string = skillSt.des

        // this.quitlyDisplay.string = DataManager.qualityList[defaultData.quality]// + "  " + defaultData.name
        // ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        // ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
    }

    // update (dt) {}
}
