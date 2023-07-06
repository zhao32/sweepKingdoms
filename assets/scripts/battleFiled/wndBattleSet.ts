// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import battleHeroRender from "../battle/battleHeroRender";
import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import soliderRender from "./soliderRender";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

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

    // selectCards = []

    // soliderList = []

    // onLoad () {}

    start() {
    }

    S2CBattleFormationSave(data) {
        console.log('军队配置返回' + JSON.stringify(data))
        console.log('card:' + JSON.stringify(DataManager.myBattleFiledConfig.card))
        ViewManager.instance.showToast(`战队配置保存成功`)
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_BATTLE_TEAMSET)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_MYTEAM)
    }

    init() {
        NetEventDispatcher.addListener(NetEvent.S2CBattleFormationSave, this.S2CBattleFormationSave, this)

        // this.selectCards = selectCards//[DataManager.cardsList[0], DataManager.cardsList[1], DataManager.cardsList[2]]
        this.heroContect.removeAllChildren()

        // console.log(`selectCards:` + selectCards)

        // this.soliderList = [
        //     {
        //         arm: 1,
        //         count: 500

        //     },
        //     {
        //         arm: 2,
        //         count: 500
        //     },
        //     {
        //         arm: 3,
        //         count: 500
        //     },
        // ]

        this.node.getChildByName('heroScroll').active = false
        this.node.getChildByName('soliderScroll').active = true

        this.soliderContect.removeAllChildren()
        // for (let i = 0; i < this.soliderList.length; i++) {
        //     let soliderItem = cc.instantiate(this.soliderPfb)
        //     soliderItem.getComponent(soliderRender).init(this.soliderList[i].arm, this.soliderList[i].count)
        //     soliderItem.parent = this.soliderContect
        // }

        for (let i = 0; i < DataManager.myBattleFiledConfig.soliders.length; i++) {
            let soliderItem = cc.instantiate(this.soliderPfb)
            let soliderData = DataManager.myBattleFiledConfig.soliders[i]
            soliderItem.getComponent(soliderRender).init(soliderData.arm, soliderData.count, soliderData.countAll)
            soliderItem.parent = this.soliderContect
        }

        for (let i = 0; i < DataManager.myBattleFiledConfig.card.length; i++) {
            for (let j = 0; j < DataManager.cardsList.length; j++) {
                if (DataManager.myBattleFiledConfig.card[i] == DataManager.cardsList[j]) {
                    let tmpId = DataManager.myBattleFiledConfig.card[i].template_id
                    let defaultData = DataManager.GameData.Cards[tmpId]
                    ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.node.getChildByName('hero').getChildByName(`head${i}`))
                    ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.node.getChildByName('hero').getChildByName(`bg${i}`))
                }

            }
            // if (DataManager.myBattleFiledConfig.card[i]) {
            //     let defaultData = DataManager.GameData.Cards[DataManager.myBattleFiledConfig.card[i]]
            //     ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.node.getChildByName('hero').getChildByName(`head${i}`))
            //     ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.node.getChildByName('hero').getChildByName(`bg${i}`))
            // }
        }
    }

    heroHandler(event, idx) {
        console.log(`-------点击英雄头像${idx}---------`)
        this.heroContect.removeAllChildren()

        this.node.getChildByName('heroScroll').active = true
        this.node.getChildByName('soliderScroll').active = false

        let cardsList = []
        let idList = []
        for (let i = 0; i < DataManager.myBattleFiledConfig.card.length; i++) {
            idList.push(DataManager.myBattleFiledConfig.card[i])
        }

        console.log(JSON.stringify(idList))
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (idList.indexOf(DataManager.cardsList[i].id) == -1) {
                cardsList.push(DataManager.cardsList[i])
            }
        }


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

                DataManager.myBattleFiledConfig.card[idx] = cardsList[i].id

                let defaultData = DataManager.GameData.Cards[data.template_id]
                ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.node.getChildByName('hero').getChildByName(`head${idx}`))
                ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.node.getChildByName('hero').getChildByName(`bg${idx}`))

            }, this)
        }
    }

    // heroHandler1() {

    // }

    // heroHandler2() {

    // }

    doSaveHandler() {
        DataManager.myBattleFiledConfig.soliders = []
        for (let i = 0; i < this.soliderContect.children.length; i++) {
            let soliderItem = this.soliderContect.children[i]
            let data = soliderItem.getComponent(soliderRender).getSelectNum()
            if (data.count != 0) {
                DataManager.myBattleFiledConfig.soliders.push(data)
            }
        }
        let card = DataManager.myBattleFiledConfig.card
        let data = { fid: 2, formationId: 0, forward: 0, flip: 0, a: card[0], b: card[1], c: card[2], soldier: DataManager.myBattleFiledConfig.soliders }
        console.log(JSON.stringify(data))
        MyProtocols.send_C2SBattleFormationSave(DataManager._loginSocket, data)
    }

    onBackHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_BATTLE_TEAMSET)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_MYTEAM)

    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CBattleFormationSave, this.S2CBattleFormationSave, this)

    }


    // update (dt) {}
}
