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
    skillLabel: cc.Label = null;

    @property(cc.Label)
    starLabel: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    @property(cc.Node)
    heroNameBg: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        let defaultData = DataManager.GameData.Cards[data.template_id]
        this.nameLabel.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
        ResManager.loadItemIcon(`hero/heroNameBg${defaultData.quality - 1}`, this.heroNameBg)

        for (let i = 1; i < 6; i++) {
            this.node.getChildByName(`soldierType${i}`).active = false
        }

        let skillList = defaultData.skills

        let str = ''
        for (let i = 0; i < skillList.length; i++) {
            let skillData = DataManager.GameData.Skill[skillList[i][0]]
            skillData.name
            str += skillData.name
            str += ' '
        }
        this.skillLabel.string = `专有技能：` + str

        // for (let i = 0; i < defaultData.talents.length; i++) {
        //     let node = this.node.getChildByName(`soldierType${i + 1}`)
        //     node.active = true
        //     ResManager.loadItemIcon(`hero/soldierType${defaultData.talents[i]}`, node)
        // }

        // for (let i = 1; i <= 3; i++) {
        //     this.node.getChildByName(`starGet${i}`).active = false            
        // }

        // for (let i = 1; i <= data.grade; i++) {
        //     this.node.getChildByName(`starGet${i}`).active = true            
        // }

        this.starLabel.string = data.grade + 1

    }

    // update (dt) {}
}
