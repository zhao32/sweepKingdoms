// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
// import packManager from "../pack/packManager";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import detailQuipRender from "./detailQuipRender";
import detailRuneRender from "./detailRuneRender";
import detailSkillRender from "./detailSkillRender";
import detailSkillStRender from "./detailSkillStRender";
import runeOpenPanel from "./runeOpenPanel";
import runeSoltUpPanel from "./runeSoltUpPanel";
import skillstPanel from "./skillstPanel";
import skillUpPanel from "./skillUpPanel";

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
        // this._data.runeUnlock.push(retObj.pos_index)
        this._data.runeUnlock[retObj.pos_index - 1] = retObj.pos_index
        this.node.getChildByName('cao').children[retObj.pos_index - 1].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[1]

        for (let i = 0; i < this._data.runePutup.length; i++) {
            let render = this.contect.children[i]
            let state = this._data.runeUnlock[i] >= 1 ? 1 : 0
            render.getComponent(detailRuneRender).init(state, i, this._data)
        }

        for (let i = 0; i < this._data.runeUnlock.length; i++) {
            // ResManager.loadItemIcon(`hero/runePot1`, this.node.getChildByName('cao').children[data.runeUnlock[i]])
            this.node.getChildByName('cao').children[i].active = true
            if (this._data.runeUnlock[i] == 0) {
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[0]
            } else {
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[1]
            }
        }
    }

    updateRunes() {

        for (let i = 0; i < this._data.runeUnlock.length; i++) {
            this.node.getChildByName('cao').children[i].active = true
            if (this._data.runeUnlock[i] == 0) {
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[0]
            } else {
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[1]
            }
        }

        for (let i = 0; i < this._data.runePutup.length; i++) {
            let rune = this.node.getChildByName('cao1').children[i].children[0]
            if (this._data.runePutup[i] > 0) {
                rune.active = true
                console.log('data.runePutup[i]:' + this._data.runePutup[i])
                ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[this._data.runePutup[i]].icon}`, rune)
            } else {
                rune.active = false
            }

            let render = this.contect.children[i]
            let state = 0
            if (this._data.runeUnlock[i] >= 1) {
                state = 1
            }
            render.getComponent(detailRuneRender).init(state, i, this._data)
        }

    }

    S2CSKillTeach(data) {
        console.log("学习技能返回:" + JSON.stringify(data))
        // {"cardid":152035,"idx":0,"skillid":10009}
        let defaultData = DataManager.GameData.Cards[this._data.template_id]

        let len = defaultData.skills.length
        console.log('this.contect.children.length:' + this.contect.children.length)
        let render = this.contect.children[len + data.idx]
        let stData = this._data.skills_equips[data.idx]
        stData.id = data.skillid
        // let stData = {"id":data.skillid,"level":0,"type":1}
        render.getComponent(detailSkillStRender).init(stData, data.idx)

    }

    S2CSKillStUp(data) {
        console.log("学习技能升级返回:" + JSON.stringify(data))
        // {"cardid":152038,"idx":0,"skillid":10011,"lv":2}
        let defaultData = DataManager.GameData.Cards[this._data.template_id]

        let len = defaultData.skills.length
        console.log('this.contect.children.length:' + this.contect.children.length)
        let render = this.contect.children[len + data.idx]
        let stData = this._data.skills_equips[data.idx]
        stData.id = data.skillid
        stData.level = data.lv
        // let stData = {"id":data.skillid,"level":0,"type":1}
        render.getComponent(detailSkillStRender).init(stData, data.idx)
    }

    S2CDumpRuneSlot(data) {
        console.log("符石卸载返回:" + JSON.stringify(data))
        this._data.runePutup[data.p_pos_index] = 0

        for (let i = 0; i < this._data.runePutup.length; i++) {
            let rune = this.node.getChildByName('cao1').children[i].children[0]
            // ResManager.loadItemIcon(`hero/runePot${data.runePutup[i]}`, this.node.getChildByName('cao').children[i])
            if (this._data.runePutup[i] < 1000) {
                rune.active = false
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[this._data.runePutup[i]]
            } else {
                rune.active = true
                console.log('data.runePutup[i]:' + this._data.runePutup[i])
                ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[this._data.runePutup[i]].icon}`, rune)
            }
        }

        for (let i = 0; i < this._data.runePutup.length; i++) {
            let render = cc.instantiate(this.runPfb)
            render.parent = this.contect

            let state = 0
            if (this._data.runeUnlock[i] > 1) {
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
        this.node.getChildByName('skillUpPanel').active = false


        // packManager.getInstance().reflishBag()

        NetEventDispatcher.addListener(NetEvent.S2CDumpRuneSlot, this.S2CDumpRuneSlot, this)
        NetEventDispatcher.addListener(NetEvent.S2CRuneUnlock, this.S2CRuneUnlock, this)
        NetEventDispatcher.addListener(NetEvent.S2CSKillTeach, this.S2CSKillTeach, this)
        NetEventDispatcher.addListener(NetEvent.S2CSKillStUp, this.S2CSKillStUp, this)
        NetEventDispatcher.addListener(NetEvent.S2CCardTakeOnItem, this.S2CCardTakeOnItem, this)
        NetEventDispatcher.addListener(NetEvent.S2CCardTakeOffItem, this.S2CCardTakeOffItem, this)
        NetEventDispatcher.addListener(NetEvent.S2CRuneLevelup, this.S2CRuneLevelup, this)



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

            node.getChildByName('proTxt').getComponent(cc.Label).string = `${data.proficiency[i]}/${data.proficiencyMax[i]}`
            node.getChildByName(`progressBar`).getComponent(cc.ProgressBar).progress = data.proficiency[i] / data.proficiencyMax[i]
            node.getChildByName('label1').getComponent(cc.Label).string = `成长潜质` //DataManager.armList[defaultData.talents[i]] + `兵熟练度：`
            // node.getChildByName('label2').getComponent(cc.Label).string = `${data.aptitude[i]}/${999}`
            let aptitudes = 0
            for (let j = 0; j < data.aptitude.length; j++) {
                aptitudes += data.aptitude[j]
            }

            if (data.aptitude.length == 0 || aptitudes == 0) {
                node.getChildByName('label2').getComponent(cc.Label).string = `:未鉴定`
            } else {
                node.getChildByName('label2').getComponent(cc.Label).string = `${data.aptitude[i]}/${999}`
            }
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

        this.starDisplay.string = `x` + (data.grade + 1)

        let maxExp = DataManager.GameData.CardLevels[defaultData.potential][data.level - 1][0]
        this.expProTxt.string = `${data.exp}/${maxExp}`
        this.expProBar.progress = data.exp / maxExp

        // for (let i = 0; i < 8; i++) {
        //     ResManager.loadItemIcon(`hero/runePot2`, this.node.getChildByName('cao').children[i])
        // }

        for (let i = 0; i < data.runePutup.length; i++) {
            // ResManager.loadItemIcon(`hero/runePot${data.runePutup[i]}`, this.node.getChildByName('cao').children[i])
            let rune = this.node.getChildByName('cao1').children[i].children[0]
            if (data.runePutup[i] < 1000) {
                rune.active = false
                // this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[data.runePutup[i]]
            } else {
                rune.active = true
                console.log('data.runePutup[i]:' + data.runePutup[i])
                ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[data.runePutup[i]].icon}`, rune)
            }
        }
        for (let i = 0; i < 8; i++) {
            // ResManager.loadItemIcon(`hero/runePot1`, this.node.getChildByName('cao').children[data.runeUnlock[i]])
            this.node.getChildByName('cao').children[i].active = false
        }

        for (let i = 0; i < data.runeUnlock.length; i++) {
            // ResManager.loadItemIcon(`hero/runePot1`, this.node.getChildByName('cao').children[data.runeUnlock[i]])
            this.node.getChildByName('cao').children[i].active = true
            if (data.runeUnlock[i] == 0) {
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[0]
            } else {
                this.node.getChildByName('cao').children[i].getComponent(cc.Sprite).spriteFrame = this.runePotsFrame[1]
            }
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

        this.headBg.on(cc.Node.EventType.TOUCH_END, () => {
            // let str = DataManager.getGeneralDes(data.template_id, data.id)
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_GENERAL, ...[data.template_id, data.id])
        }, this)

    }

    openSkillstPanel(data, idx) {
        this.node.getChildByName('skillstPanel').active = true
        this.node.getChildByName('skillstPanel').getComponent(skillstPanel).init(data, idx)

    }

    openSkillstUpPanel(data, idx) {
        this.node.getChildByName('skillUpPanel').active = true
        this.node.getChildByName('skillUpPanel').getComponent(skillUpPanel).init(data, idx)
    }

    openRuneOpenPanel(data, idx) {
        this.node.getChildByName('runeOpenPanel').active = true
        this.node.getChildByName('runeOpenPanel').getComponent(runeOpenPanel).init(data, idx)
    }

    upRuneSoltPanel(data, idx) {
        this.node.getChildByName('runeSoltUpPanel').active = true
        this.node.getChildByName('runeSoltUpPanel').getComponent(runeSoltUpPanel).init(data, idx)
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

        for (let i = 0; i < this._data.runeUnlock.length; i++) {
            let render = cc.instantiate(this.runPfb)
            render.parent = this.contect

            let state = 0
            if (this._data.runeUnlock[i] >= 1) {
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
        this._data.equips = [this._data.equips[0], this._data.equips[1]]
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

    S2CCardTakeOnItem(data) {
        // 装备安装返回：{"cardId":153151,"item_uuid":"2944397251497984","fight":5972}

        let pos
        console.log(`装备安装返回：` + JSON.stringify(data))
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            if (DataManager.instance.itemsList[i].uuid == data.item_uuid) {
                let template_id = DataManager.instance.itemsList[i].template_id
                let defaultData = DataManager.GameData.Equips[template_id]
                pos = defaultData.position
                this._data.equips[pos] = data.item_uuid
                if (defaultData.position == 0) {
                    this.contect.children[0].getComponent(detailQuipRender).init(0, this._data)
                } else {
                    this.contect.children[1].getComponent(detailQuipRender).init(1, this._data)
                }
            }
        }

        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (DataManager.cardsList[i].id == data.cardId) {
                DataManager.cardsList[i].equips[pos] = data.item_uuid
            }
        }
    }

    S2CCardTakeOffItem(data) {
        console.log(`装备卸载返回：` + JSON.stringify(data))
        // {"cardId":153151,"position":1,"item_uuid":"2942814043025421","fight":5822}

        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (DataManager.cardsList[i].id == data.cardId) {
                DataManager.cardsList[i].equips[data.position] = "0"
                this._data.equips[data.position] = "0"
            }
        }

        for (let i = 0; i < this._data.equips.length; i++) {
            let equip = this.contect.children[i]
            equip.getComponent(detailQuipRender).init(i, this._data)
        }

    }

    S2CRuneLevelup(data) {
        console.log(`石槽承载力提升：` + JSON.stringify(data))
        // {"card_id":153486,"rune_pos_index":0,"rune_level":999,"fight":2868}
        // {"card_id":153505,"rune_pos_index":2,"rune_level":999,"fight":2255}
        // [999,999,0]
        this._data.runeLevel[data.rune_pos_index] = data.rune_level
        this.initRunes()

    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CCardTakeOnItem, this.S2CCardTakeOnItem, this)
        NetEventDispatcher.removeListener(NetEvent.S2CCardTakeOffItem, this.S2CCardTakeOffItem, this)


        NetEventDispatcher.removeListener(NetEvent.S2CSKillTeach, this.S2CSKillTeach, this)
        NetEventDispatcher.removeListener(NetEvent.S2CRuneUnlock, this.S2CRuneUnlock, this)
        NetEventDispatcher.removeListener(NetEvent.S2CSKillStUp, this.S2CSKillStUp, this)
        NetEventDispatcher.removeListener(NetEvent.S2CDumpRuneSlot, this.S2CDumpRuneSlot, this)
        NetEventDispatcher.addListener(NetEvent.S2CRuneLevelup, this.S2CRuneLevelup, this)

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_LIST)
    }

    // update (dt) {}
}
