// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import packManager from "../pack/packManager";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import detailQuipRender from "./detailQuipRender";
import detailRuneRender from "./detailRuneRender";
import detailSkillRender from "./detailSkillRender";
import detailSkillStRender from "./detailSkillStRender";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.ProgressBar, displayName: '体力条' })
    strenProBar: cc.ProgressBar = null;

    @property({ type: cc.Label, displayName: '体力条label' })
    strenProTxt: cc.Label = null;

    @property({ type: cc.ProgressBar, displayName: '经验条' })
    expProBar: cc.ProgressBar = null;

    @property({ type: cc.Label, displayName: '经验条label' })
    expProTxt: cc.Label = null;

    @property({ type: cc.Label, displayName: '名称' })
    nameLabel: cc.Label = null;

    @property({ type: cc.Label, displayName: '等级' })
    gradeDisplay: cc.Label = null;


    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    @property(cc.Node)
    heroNameBg: cc.Node = null;

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.SpriteFrame)
    checkFrames: cc.SpriteFrame[] = [];

    @property({ type: cc.Prefab, displayName: '技能预制体' })
    pfb: cc.Prefab = null;

    @property({ type: cc.Prefab, displayName: '技能预制体' })
    stSkillfb: cc.Prefab = null;

    @property({ type: cc.Prefab, displayName: '石槽预制体' })
    runPfb: cc.Prefab = null;

    @property({ type: cc.Prefab, displayName: '装备预制体' })
    equipPfb: cc.Prefab = null;

    @property({ type: cc.SpriteFrame, displayName: '石槽图' })
    runePotsFrame: cc.SpriteFrame[] = [];


    @property({ type: cc.Label, displayName: '星级' })
    starDisplay: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    _data

    // onLoad () {}

    start() {
    }

    S2CRuneUnlock(retObj) {
        console.log('开启石槽返回：' + JSON.stringify(retObj))
        this._data.runeUnlock.push(retObj.pos_index)
        this.node.getChildByName('cao').children[retObj.pos_index].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[1]

        for (let i = 0; i < this._data.runePutup.length; i++) {
            let render = this.contect.children[i]
            let state = this._data.runeUnlock.indexOf(i) != -1 ? 1 : 0
            render.getComponent(detailRuneRender).init(state, i, this._data)
        }
    }

    updateRunes() {
        for (let i = 0; i < this._data.runePutup.length; i++) {
            // ResManager.loadItemIcon(`hero/runePot${data.runePutup[i]}`, this.node.getChildByName('cao').children[i])
            if (this._data.runePutup[i] < 1000) {
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[this._data.runePutup[i]]
            } else {
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[1]
                let rune = this.node.getChildByName('cao1').children[i].children[0]
                rune.active = true
                console.log('data.runePutup[i]:' + this._data.runePutup[i])
                ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[this._data.runePutup[i]].icon}`, rune)
            }

            let render = this.contect.children[i]
            let state = 0
            if (this._data.runeUnlock.indexOf(i) != -1) {
                state = 1
            }
            render.getComponent(detailRuneRender).init(state, i, this._data)
        }

    }
    /**data 服务器获取的将领数据 */
    init(data) {
        DataManager.wndHotelDetail = this
        this.node.getChildByName('runePutPanel').active = false
        this.node.getChildByName('skillstPanel').active = false
        
        packManager.getInstance().reflishBag()
        NetEventDispatcher.addListener(NetEvent.S2CRuneUnlock, this.S2CRuneUnlock, this)


        console.log('-----data:' + JSON.stringify(data))
        this._data = data
        let defaultData = DataManager.GameData.Cards[data.template_id]
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
        ResManager.loadItemIcon(`hero/heroNameBg${defaultData.quality - 1}`, this.heroNameBg)

        for (let i = 1; i <= 3; i++) {
            this.node.getChildByName("shuxing").getChildByName(`soldierType${i}`).active = false
        }

        for (let i = 0; i < data.talents.length; i++) {
            let node = this.node.getChildByName("shuxing").getChildByName(`soldierType${i + 1}`)
            node.active = true
            node.getChildByName('label0').getComponent(cc.Label).string = DataManager.armList[data.talents[i]] + `兵熟练度：`
            ResManager.loadItemIcon(`hero/soldierType${data.talents[i]}`, node)

            node.getChildByName('proTxt').getComponent(cc.Label).string = `${data.proficiency[i]}/${0}`
            node.getChildByName(`progressBar`).getComponent(cc.ProgressBar).progress = 0.8
            node.getChildByName('label1').getComponent(cc.Label).string = `成长潜质` //DataManager.armList[defaultData.talents[i]] + `兵熟练度：`
            node.getChildByName('label2').getComponent(cc.Label).string = `${data.aptitude[i]}/${999}`
        }

        this.strenProBar.progress = data.physical / 200
        this.strenProTxt.string = `${data.physical}/${200}`
        this.gradeDisplay.string = 'LV ' + data.level

        this.nameLabel.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name

        // for (let i = 1; i <= 3; i++) {
        //     this.node.getChildByName(`starGet${i}`).active = false
        // }

        // for (let i = 1; i <= data.grade; i++) {
        //     this.node.getChildByName(`starGet${i}`).active = true
        // }

        this.starDisplay.string = `x` + data.grade

        let maxExp = DataManager.GameData.CardLevels[defaultData.potential][data.level - 1][0]
        this.expProTxt.string = `${data.exp}/${maxExp}`
        this.expProBar.progress = data.exp / maxExp

        // for (let i = 0; i < 8; i++) {
        //     ResManager.loadItemIcon(`hero/runePot2`, this.node.getChildByName('cao').children[i])
        // }

        for (let i = 0; i < data.runePutup.length; i++) {
            // ResManager.loadItemIcon(`hero/runePot${data.runePutup[i]}`, this.node.getChildByName('cao').children[i])
            if (data.runePutup[i] < 1000) {
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[data.runePutup[i]]
            } else {
                let rune = this.node.getChildByName('cao1').children[i].children[0]
                rune.active = true
                console.log('data.runePutup[i]:' + data.runePutup[i])
                ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[data.runePutup[i]].icon}`, rune)
            }
        }

        for (let i = 0; i < data.runeUnlock.length; i++) {
            // ResManager.loadItemIcon(`hero/runePot1`, this.node.getChildByName('cao').children[data.runeUnlock[i]])
            this.node.getChildByName('cao').children[data.runeUnlock[i]].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[1]
        }


        this.node.getChildByName(`btnSkill`).on(cc.Node.EventType.TOUCH_END, () => {
            this.initSkills(defaultData.skills, data.proficiency, data.talents)
            this.initStSkill(data.skills_equips)
        }, this)

        this.node.getChildByName(`btnRune`).on(cc.Node.EventType.TOUCH_END, () => {
            this.initRunes()
        }, this)

        this.node.getChildByName(`btnEquip`).on(cc.Node.EventType.TOUCH_END, () => {
            this.initEquips()
        }, this)

        this.initSkills(defaultData.skills, data.proficiency, data.talents)
        this.initStSkill(data.skills_equips)
    }

    openSkillstPanel(){
        this.node.getChildByName('skillstPanel').active = true

    }

    initStSkill(stData) {
        console.log(`init 额外技能`)
        for (let i = 0; i < stData.length; i++) {
            let render = cc.instantiate(this.stSkillfb)
            render.parent = this.contect
            render.getComponent(detailSkillStRender).init(stData[i], i)
        }
    }
    initSkills(skillList, proficiency, talents) {
        this.node.getChildByName('btnSkill').getComponent(cc.Sprite).spriteFrame = this.checkFrames[1]
        this.node.getChildByName('btnRune').getComponent(cc.Sprite).spriteFrame = this.checkFrames[0]
        this.node.getChildByName('btnEquip').getComponent(cc.Sprite).spriteFrame = this.checkFrames[0]

        this.contect.removeAllChildren();

        for (let i = 0; i < skillList.length; i++) {
            let skillData = DataManager.GameData.Skill[skillList[i][0]]
            let render = cc.instantiate(this.pfb)
            render.parent = this.contect
            render.getComponent(detailSkillRender).init(skillData, proficiency, talents)
        }
    }

    initRunes() {
        this.contect.removeAllChildren();
        this.node.getChildByName('btnSkill').getComponent(cc.Sprite).spriteFrame = this.checkFrames[0]
        this.node.getChildByName('btnEquip').getComponent(cc.Sprite).spriteFrame = this.checkFrames[0]
        this.node.getChildByName('btnRune').getComponent(cc.Sprite).spriteFrame = this.checkFrames[1]

        for (let i = 0; i < this._data.runePutup.length; i++) {
            let render = cc.instantiate(this.runPfb)
            render.parent = this.contect

            let state = 0
            if (this._data.runeUnlock.indexOf(i) != -1) {
                state = 1
            }
            render.getComponent(detailRuneRender).init(state, i, this._data)
        }
    }

    initEquips() {
        this.node.getChildByName('btnSkill').getComponent(cc.Sprite).spriteFrame = this.checkFrames[0]
        this.node.getChildByName('btnRune').getComponent(cc.Sprite).spriteFrame = this.checkFrames[0]
        this.node.getChildByName('btnEquip').getComponent(cc.Sprite).spriteFrame = this.checkFrames[1]

        this.contect.removeAllChildren();
        for (let i = 0; i < this._data.equips.length; i++) {
            let equip = cc.instantiate(this.equipPfb)
            equip.parent = this.contect
            if (i < 4) {
                ResManager.loadItemIcon(`UI/items/equip_${i + 1}`, equip.getChildByName('equipBg'))
            } else {
                ResManager.loadItemIcon(`UI/items/trea_${i + 1 - 4}`, equip.getChildByName('equipBg'))
            }
            equip.getComponent(detailQuipRender).init(i, this._data)
        }

    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CRuneUnlock, this.S2CRuneUnlock, this)
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_LIST)
    }

    // update (dt) {}
}
