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

    @property({ type: cc.Label, displayName: '名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '描述' })
    desDisplay: cc.Label = null;


    @property(cc.Node)
    icon: cc.Node = null;

    start() {
        this.node.getChildByName('mask').on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.hideNote(EnumManager.viewPath.NOTE_IN_EQUIP, true)
        }, this)
    }

    onClose() {

    }

    init(equipData) {
        console.log(`装备数据：` + JSON.stringify(equipData))
        // {"icon":"1001.png","quality":3,"name":"盔甲胚料","position":-1,"des":"碎片合成，和洗炼之火可合成盔甲。"}
        ResManager.loadItemIcon(`UI/equips/${equipData.name}`, this.icon)
        this.quitlyDisplay.string = `等级：` + equipData.quality
        this.nameDisplay.string = equipData.name
        this.titleDisplay.string = `装备`
        this.desDisplay.string = equipData.des

        // this.titleDisplay.string = defaultData.name
        // this.quitlyDisplay.string = DataManager.qualityList[defaultData.quality]// + "  " + defaultData.name
        // ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        // ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
        // this.skillDisplay.string = `固定技能：`
        // for (let i = 0; i < defaultData.skills.length; i++) {
        //     let skillData = DataManager.GameData.Skill[defaultData.skills[i][0]]
        //     this.skillDisplay.string += skillData.name + ` `
        // }
        // this.teachSkillDisplay.string = `可学技能：${defaultData.free_skills}`
        // this.talentDisplay.string = `熟练兵种：`
        // for (let i = 0; i < defaultData.talents.length; i++) {
        //     if (defaultData.talents[i] == 0) {
        //         this.talentDisplay.string += ` + ?`
        //     } else {
        //         if (i == 0) {
        //             this.talentDisplay.string += ` ${DataManager.armList[defaultData.talents[i]]}`
        //         } else {
        //             this.talentDisplay.string += ` + ${DataManager.armList[defaultData.talents[i]]}`
        //         }
        //     }
        // }

        // this.decompDisplay.string = `分解材料：战神的咆哮 + 同级别英雄将魂`
    }

    // update (dt) {}
}
