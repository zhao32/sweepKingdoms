// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import inEquipRender from "./inEquipRender";
import inHeroRender from "./inHeroRender";
import inSkillRender from "./inSkillRender";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteFrame)
    spriteFrames: cc.SpriteFrame[] = [];

    @property(cc.Node)
    btnClose: cc.Node = null;


    @property(cc.Node)
    btnSkill: cc.Node = null;

    @property(cc.Node)
    btnHero: cc.Node = null;

    @property(cc.Node)
    btnEquip: cc.Node = null;


    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    pfb0: cc.Prefab = null;

    @property(cc.Prefab)
    pfb1: cc.Prefab = null;

    @property(cc.Prefab)
    pfb2: cc.Prefab = null;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

        this.btnSkill.on(cc.Node.EventType.TOUCH_END, () => {
            let keySkillatList = Object.keys(DataManager.GameData.SkillStudy)
            this.contect.removeAllChildren()
            for (let i = 0; i < keySkillatList.length; i++) {
                let render = cc.instantiate(this.pfb0)
                render.parent = this.contect
                let data = DataManager.GameData.SkillStudy[keySkillatList[i]]
                render.getComponent(inSkillRender).init(data)
                render.on(cc.Node.EventType.TOUCH_END, () => {
                    ViewManager.instance.showNote(EnumManager.viewPath.NOTE_IN_SKILL, ...[data])
                }, this)
            }

            this.btnSkill.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[1]
            this.btnHero.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[0]
            this.btnEquip.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[0]

        }, this)

        this.btnHero.on(cc.Node.EventType.TOUCH_END, () => {
            let cardsList = Object.keys(DataManager.GameData.Cards)
            this.contect.removeAllChildren()
            for (let i = 0; i < cardsList.length; i++) {
                let data = DataManager.GameData.Cards[cardsList[i]]
                if (data.name != `王翦` && data.name != `李信`) {
                    let render = cc.instantiate(this.pfb1)
                    render.parent = this.contect
                    render.getComponent(inHeroRender).init(data)
                    render.on(cc.Node.EventType.TOUCH_END, () => {
                        ViewManager.instance.showNote(EnumManager.viewPath.NOTE_IN_GENERAL, ...[data])
                    }, this)
                }

            }

            this.btnHero.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[1]
            this.btnSkill.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[0]
            this.btnEquip.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[0]

        }, this)

        this.btnEquip.on(cc.Node.EventType.TOUCH_END, () => {
            let equipList = Object.keys(DataManager.GameData.Equips)
            this.contect.removeAllChildren()
            for (let i = 0; i < equipList.length; i++) {
                let render = cc.instantiate(this.pfb2)
                render.parent = this.contect
                let data = DataManager.GameData.Equips[equipList[i]]
                render.getComponent(inEquipRender).init(data)
                render.on(cc.Node.EventType.TOUCH_END, () => {
                    ViewManager.instance.showNote(EnumManager.viewPath.NOTE_IN_EQUIP, ...[data])
                }, this)
            }

            this.btnSkill.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[0]
            this.btnHero.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[0]
            this.btnEquip.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[1]

        }, this)


        this.btnClose.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.hideWnd(DataManager.curWndPath)
        }, this)
    }



    init() {
        this.btnSkill.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[1]
        this.btnHero.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[0]
        this.contect.removeAllChildren()

        let keySkillatList = Object.keys(DataManager.GameData.SkillStudy)
        // if (keySkillatList.indexOf(String(data.template_id)) != -1) {
        //     itemData = DataManager.GameData.SkillStudy[data.template_id]
        // }
        for (let i = 0; i < keySkillatList.length; i++) {
            let render = cc.instantiate(this.pfb0)
            render.parent = this.contect
            let data = DataManager.GameData.SkillStudy[keySkillatList[i]]
            render.getComponent(inSkillRender).init(data)
            render.on(cc.Node.EventType.TOUCH_END, () => {
                ViewManager.instance.showNote(EnumManager.viewPath.NOTE_IN_SKILL, ...[data])
            }, this)
        }
    }

    onClose() {

    }

    // update (dt) {}
}
