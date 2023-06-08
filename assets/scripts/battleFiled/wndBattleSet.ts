// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import battleHeroRender from "../battle/battleHeroRender";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import soliderRender from "./soliderRender";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    heroContect: cc.Node = null;

    @property(cc.Node)
    soliderContect: cc.Node = null;

    @property(cc.Prefab)
    heroPfb: cc.Prefab = null;

    @property(cc.Prefab)
    soliderPfb: cc.Prefab = null;

    selectCards = []

    soliderList = []

    // onLoad () {}

    start() {

    }

    init() {
        this.selectCards = [DataManager.cardsList[0], DataManager.cardsList[1], DataManager.cardsList[2]]
        this.heroContect.removeAllChildren()

        this.soliderList = [
            {
                arm: 1,
                count: 500

            },
            {
                arm: 2,
                count: 500
            },
            {
                arm: 3,
                count: 500
            },
        ]

        this.node.getChildByName('heroScroll').active = false
        this.node.getChildByName('soliderScroll').active = true

        this.soliderContect.removeAllChildren()
        // for (let i = 0; i < this.soliderList.length; i++) {
        //     let soliderItem = cc.instantiate(this.soliderPfb)
        //     soliderItem.getComponent(soliderRender).init(this.soliderList[i].arm, this.soliderList[i].count)
        //     soliderItem.parent = this.soliderContect
        // }

        for (let i = 0; i < DataManager.playData.military_data.length; i++) {
            if (DataManager.playData.military_data[i] != 0) {
                let soliderItem = cc.instantiate(this.soliderPfb)
                soliderItem.getComponent(soliderRender).init(i + 1, DataManager.playData.military_data[i])
                soliderItem.parent = this.soliderContect
            }
        }

        for (let i = 0; i < this.selectCards.length; i++) {
            let defaultData = DataManager.GameData.Cards[this.selectCards[i].template_id]
            ResManager.loadItemIcon(`hero/${defaultData.name}`, this.node.getChildByName('hero').getChildByName(`head${i}`))
            ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.node.getChildByName('hero').getChildByName(`bg${i}`))
        }
    }

    heroHandler(event, idx) {
        console.log(`-------点击英雄头像${idx}---------`)
        this.heroContect.removeAllChildren()

        this.node.getChildByName('heroScroll').active = true
        this.node.getChildByName('soliderScroll').active = false

        let cardsList = []
        let tempIdList = []
        for (let i = 0; i < this.selectCards.length; i++) {
            tempIdList.push(this.selectCards[i].id)
        }

        console.log(JSON.stringify(tempIdList))


        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (tempIdList.indexOf(DataManager.cardsList[i].id) == -1) {
                cardsList.push(DataManager.cardsList[i])
            }
        }



        console.log()

        for (let i = 0; i < cardsList.length; i++) {
            let hero = cc.instantiate(this.heroPfb)
            hero.x = 0
            hero.parent = this.heroContect
            hero.getComponent(battleHeroRender).init(cardsList[i])
            hero.getChildByName('btnSelect').on(cc.Node.EventType.TOUCH_END, () => {
                let data = cardsList[i]
                // this.node.getChildByName('stageHeroRender').getComponent(stageHeroRender).init(DataManager.cardsList[i])
                // this.changeScrollView();
                this.node.getChildByName('heroScroll').active = false
                this.node.getChildByName('soliderScroll').active = true

                this.selectCards[idx] = cardsList[i]

                let defaultData = DataManager.GameData.Cards[data.template_id]
                ResManager.loadItemIcon(`hero/${defaultData.name}`, this.node.getChildByName('hero').getChildByName(`head${idx}`))
                ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.node.getChildByName('hero').getChildByName(`bg${idx}`))

            }, this)
        }
    }

    // heroHandler1() {

    // }

    // heroHandler2() {

    // }

    doSaveHandler() {

    }

    onBackHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_BATTLE_TEAMSET, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_MYTEAM)

    }


    // update (dt) {}
}
