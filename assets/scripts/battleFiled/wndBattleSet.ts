// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import stageHeroRender from "../stage/stageHeroRender";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

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

    // onLoad () {}

    start() {

    }

    init() {
        this.selectCards = [DataManager.cardsList[0], DataManager.cardsList[1], DataManager.cardsList[2]]

    }

    heroHandler0() {
        this.heroContect.removeAllChildren()
        let cardsList = []
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (this.selectCards.indexOf(DataManager.cardsList[i]) == -1) {
                cardsList.push(DataManager.cardsList[i])
            }
        }

        for (let i = 0; i < cardsList.length; i++) {
            let hero = cc.instantiate(this.heroPfb)
            hero.x = 0
            hero.parent = this.heroContect
            hero.getComponent(stageHeroRender).init(cardsList[i])
            hero.getChildByName('btnSelect').on(cc.Node.EventType.TOUCH_END, () => {
                let data = cardsList[i]
                // this.node.getChildByName('stageHeroRender').getComponent(stageHeroRender).init(DataManager.cardsList[i])
                // this.changeScrollView();
                this.node.getChildByName('heroScroll').active = false
                this.node.getChildByName('soliderScroll').active = true

                let defaultData = DataManager.GameData.Cards[data.template_id]
                ResManager.loadItemIcon(`hero/${defaultData.name}`, this.node.getChildByName('hero').getChildByName(`hero0`))
                ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.node.getChildByName('hero').getChildByName(`bg0`))

            }, this)
        }
    }

    heroHandler1() {

    }

    heroHandler2() {

    }

    doSaveHandler() {

    }

    onBackHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_BATTLE_TEAMSET, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_MYTEAM)

    }


    // update (dt) {}
}
