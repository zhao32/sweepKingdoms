// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import detailRuneRender from "./detailRuneRender";
import detailSkillRender from "./detailSkillRender";

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

    @property({ type: cc.Prefab, displayName: '石槽预制体' })
    runPfb: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    _data

    // onLoad () {}

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CRuneUnlock, this.S2CRuneUnlock.bind(this))
    }

    S2CRuneUnlock(retObj) {
        console.log('开启石槽返回：' + JSON.stringify(retObj))
        // {"card_id":19,"pos_index":2}
        console.log(this)

        console.log(JSON.stringify(this._data))
        this._data.runePutup[retObj.pos_index] = 1
        console.log(JSON.stringify(this._data))

        this._data.runePutup[retObj.pos_index] = 1
        for (let i = 0; i < this._data.runePutup.length; i++) {
            let render = this.contect.children[i]
            render.getComponent(detailRuneRender).init(this._data.runePutup[i], i, this._data.template_id)
        }

    }
    /**data 服务器获取的将领数据 */
    init(data) {
        console.log('-----data:' + JSON.stringify(data))
        this._data = data
        let defaultData = DataManager.GameData.Cards[data.template_id]
        // this.nameDisplay.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/${defaultData.name}`, this.head)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
        ResManager.loadItemIcon(`hero/heroNameBg${defaultData.quality - 1}`, this.heroNameBg)

        for (let i = 1; i <= 3; i++) {
            this.node.getChildByName("shuxing").getChildByName(`soldierType${i}`).active = false
        }

        for (let i = 0; i < defaultData.talents.length; i++) {
            let node = this.node.getChildByName("shuxing").getChildByName(`soldierType${i + 1}`)
            node.active = true
            node.getChildByName('label0').getComponent(cc.Label).string = DataManager.armList[defaultData.talents[i]] + `兵熟练度：`
            ResManager.loadItemIcon(`hero/soldierType${defaultData.talents[i]}`, node)

            node.getChildByName('proTxt').getComponent(cc.Label).string = `${data.proficiency[i]}/${0}`
            node.getChildByName(`progressBar`).getComponent(cc.ProgressBar).progress = 0.8
            node.getChildByName('label1').getComponent(cc.Label).string = `成长潜质` //DataManager.armList[defaultData.talents[i]] + `兵熟练度：`
            node.getChildByName('label2').getComponent(cc.Label).string = `${data.aptitude[i]}/${999}`
        }

        this.strenProBar.progress = data.physical / 200
        this.strenProTxt.string = `${data.physical}/${200}`
        this.gradeDisplay.string = 'LV ' + data.level

        this.nameLabel.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name

        for (let i = 1; i <= 3; i++) {
            this.node.getChildByName(`starGet${i}`).active = false
        }

        for (let i = 1; i <= data.unitGrade; i++) {
            this.node.getChildByName(`starGet${i}`).active = true
        }

        let maxExp = DataManager.GameData.CardLevels[defaultData.potential][data.level - 1][0]
        this.expProTxt.string = `${data.exp}/${maxExp}`
        this.expProBar.progress = data.exp / maxExp

        // for (let i = 0; i < 8; i++) {
        //     ResManager.loadItemIcon(`hero/runePot2`, this.node.getChildByName('cao').children[i])
        // }

        for (let i = 0; i < data.runePutup.length; i++) {
            ResManager.loadItemIcon(`hero/runePot${data.runePutup[i]}`, this.node.getChildByName('cao').children[i])
        }

        this.node.getChildByName(`btnSkill`).on(cc.Node.EventType.TOUCH_END, () => {
            this.initSkills(defaultData.skills, data.proficiency, defaultData.talents)
        }, this)

        this.node.getChildByName(`btnRune`).on(cc.Node.EventType.TOUCH_END, () => {
            this.initRunes()
        }, this)

        this.initSkills(defaultData.skills, data.proficiency, defaultData.talents)
    }
    initSkills(skillList, proficiency, talents) {
        this.node.getChildByName('btnSkill').getComponent(cc.Sprite).spriteFrame = this.checkFrames[1]
        this.node.getChildByName('btnRune').getComponent(cc.Sprite).spriteFrame = this.checkFrames[0]

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
        this.node.getChildByName('btnRune').getComponent(cc.Sprite).spriteFrame = this.checkFrames[1]

        for (let i = 0; i < this._data.runePutup.length; i++) {
            let render = cc.instantiate(this.runPfb)
            render.parent = this.contect
            render.getComponent(detailRuneRender).init(this._data.runePutup[i], i, this._data.template_id)
        }


    }

    onClose() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_LIST)

    }

    // update (dt) {}
}
