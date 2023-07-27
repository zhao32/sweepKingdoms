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

    @property({ type: cc.Label, displayName: '名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '等级' })
    gradeDisplay: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    @property({ type: cc.Label, displayName: '星级' })
    starDisplay: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    @property(cc.Node)
    skillContect: cc.Node = null;

    @property(cc.Node)
    runeContect: cc.Node = null;

    @property(cc.Prefab)
    skillPfb: cc.Prefab = null;

    @property(cc.Prefab)
    runePfb: cc.Prefab = null;

    @property({ type: cc.SpriteFrame, displayName: '石槽图' })
    runePotsFrame: cc.SpriteFrame[] = [];

    start() {
        this.node.getChildByName('mask').on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.hideNote(EnumManager.viewPath.NOTE_GENERAL, true)
        }, this)
    }

    onClose() {

    }

    init(template_id, id) {

        let defaultData = DataManager.GameData.Cards[template_id]
        let cardInfo;
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (id == DataManager.cardsList[i].id) {
                cardInfo = DataManager.cardsList[i]
            }
        }

        console.log('cardInfo:' + JSON.stringify(cardInfo))

        this.nameDisplay.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)


        this.gradeDisplay.string = 'LV ' + cardInfo.level
        this.starDisplay.string = `x${cardInfo.grade}`

        for (let i = 0; i < 3; i++) {
            let node = this.node.getChildByName("shuxing").getChildByName(`soldierType${i + 1}`)
            node.active = false
        }

        for (let i = 0; i < cardInfo.talents.length; i++) {
            let node = this.node.getChildByName("shuxing").getChildByName(`soldierType${i + 1}`)
            node.active = true
            node.getChildByName('label0').getComponent(cc.Label).string = DataManager.armList[cardInfo.talents[i]] + `兵熟练度：`
            ResManager.loadItemIcon(`hero/soldierType${cardInfo.talents[i]}`, node)

            node.getChildByName('proTxt').getComponent(cc.Label).string = `${cardInfo.proficiency[i]}/${0}`
            node.getChildByName(`progressBar`).getComponent(cc.ProgressBar).progress = 0.8
            node.getChildByName('label1').getComponent(cc.Label).string = `成长潜质` //DataManager.armList[defaultData.talents[i]] + `兵熟练度：`
            // node.getChildByName('label2').getComponent(cc.Label).string = `${cardInfo.aptitude[i]}/${999}`
            let aptitudes = 0
            for (let j = 0; j < cardInfo.aptitude.length; j++) {
                aptitudes += cardInfo.aptitude[j]
            }
            if (cardInfo.aptitude.length == 0 || aptitudes == 0) {
                node.getChildByName('label2').getComponent(cc.Label).string = `:未鉴定`
            } else {
                node.getChildByName('label2').getComponent(cc.Label).string = `${cardInfo.aptitude[i]}/${999}`
            }
        }

        this.runeContect.removeAllChildren()
        for (let i = 0; i < cardInfo.runeUnlock.length; i++) {
            // ResManager.loadItemIcon(`hero/runePot${data.runePutup[i]}`, this.node.getChildByName('cao').children[i])
            let item = cc.instantiate(this.runePfb)
            item.parent = this.runeContect
            console.log('cardInfo.runePutup[i]:' + cardInfo.runePutup[i])
            item.getChildByName("Mask").getChildByName('rune').active = false
            if (cardInfo.runePutup[i] > 0) {
                item.getChildByName("Mask").getChildByName('rune').active = true
                ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[cardInfo.runePutup[i]].icon}`, item.getChildByName("Mask").getChildByName('rune'))
            } else {
                let state = 0
                if (cardInfo.runeUnlock[i] > 0) {
                    state = 1
                }
                item.getChildByName('rune').getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[state]
            }
        }

        this.skillContect.removeAllChildren();

        for (let i = 0; i < defaultData.skills.length; i++) {
            let skillData = DataManager.GameData.Skill[defaultData.skills[i][0]]
            let render = cc.instantiate(this.skillPfb)
            render.parent = this.skillContect
            ResManager.loadItemIcon(`skills/${skillData.name.length}`, render)
            ResManager.loadItemIcon(`skills/${skillData.name}`, render.getChildByName('skill'))

        }

        for (let i = 0; i < cardInfo.skills_equips.length; i++) {
            let render = cc.instantiate(this.skillPfb)
            render.parent = this.skillContect
            // render.getComponent(detailSkillStRender).init(stData[i], i)
            let data = cardInfo.skills_equips[i]
            if (data.type == 0) {
                ResManager.loadItemIcon(`skillats/红`, render)
            } else if (data.type == 1) {
                ResManager.loadItemIcon(`skillats/黄`, render)
            } else if (data.type == 2) {
                ResManager.loadItemIcon(`skillats/蓝`, render)
            }

            if (data.id != 0) {
                let skillSt = DataManager.GameData.SkillStudy[data.id]
                render.getChildByName('skill').active = true
                ResManager.loadItemIcon(`skillats/${skillSt.name}`, render.getChildByName('skill'))
            } else {
                render.getChildByName('skill').active = false
            }
        }

    }

    // update (dt) {}
}
