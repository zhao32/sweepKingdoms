// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import battleHeroRender from "../battle/battleHeroRender";
import battleSoliderRender from "../battle/battleSoliderRender";
import eSoliderRender from "../battle/eSoliderRender";
import soliderRender from "../battleFiled/soliderRender";
import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    myContect: cc.Node = null;

    @property(cc.Prefab)
    heroPfb: cc.Prefab = null;

    @property(cc.Prefab)
    soliderPfb: cc.Prefab = null;


    @property(cc.Label)
    titleDisplay: cc.Label = null;

    @property(cc.Label)
    tipDisplay: cc.Label = null;

    @property(cc.Label)
    cardTipDisplay: cc.Label = null;

    myHeroData
    // LIFE-CYCLE CALLBACKS:

    _type: string


    data: any

    soliders = []

    cards = []

    // /**正在守城的将 */
    // defineCardId: number

    /**调动的士兵 */
    mobilizeSoliders = []

    onSelectSolider: boolean = false
    // onLoad () {}

    start() {

    }

    eviType: number


    initDetailData(data) {
        // exclude_cards  在其他矿里工作
        //  cards 这这里工作得将
        console.log("返回矿场阵容")
        console.log(JSON.stringify(data))
        // {"level_index":0,"point_index":22,"base_info":{"id":0,"nickname":"","level":0,"icon":0,"head_frame_id":1,"fight":0,"cd_time":0},"formation":{"fid":0,"formationId":0,"forward":0,"flip":0,"a":0,"b":0,"c":0},"soliderUsed":[],"soliderUse":[],"cards":[],"exclude_cards":[],"rand_key":0}
        this.soliders = []
        this.cards = []
        this.mobilizeSoliders = []

        if (this._type == 'in') {
            // this.soliders = data.soliderUse //在主城中的兵
            for (let i = 0; i < data.soliderUse.length; i++) {
                if (data.soliderUse[i].arm != 0) {
                    this.soliders.push(data.soliderUse[i])
                }
            }

            let workKeyList = []
            for (let i = 0; i < data.exclude_cards.length; i++) {
                workKeyList.push(data.exclude_cards[i])
            }

            // for (let i = 0; i < data.cards.length; i++) {
            //     workKeyList.push(data.cards[i])
            // }

            for (let i = 0; i < DataManager.cardsList.length; i++) {
                if (workKeyList.indexOf(DataManager.cardsList[i].id) == -1) {
                    this.cards.push(DataManager.cardsList[i])
                }
            }

        } else {
            // this.soliders = data.soliderUsed//已经在矿里的兵
            for (let i = 0; i < data.soliderUsed.length; i++) {
                if (data.soliderUsed[i].arm != 0) {
                    this.soliders.push(data.soliderUsed[i])
                }
            }
            this.cards = data.cards
        }

        console.log(`this.soliders:` + JSON.stringify(this.soliders))
        if (this.soliders.length == 0) {
            this.tipDisplay.string = `暂无可派遣兵力`
        } else {
            this.tipDisplay.string = ``
            this.myContect.removeAllChildren()
            // this.onSelectSolider = true
            for (let i = 0; i < this.soliders.length; i++) {
                let solider = cc.instantiate(this.soliderPfb)
                solider.x = 0
                solider.parent = this.myContect
                solider.getComponent(battleSoliderRender).init(this.soliders[i].arm, this.soliders[i].count)
            }
        }

        if (this.eviType == 0 || this.eviType == 1) return

        let hasHero = false
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (data.formation.a == DataManager.cardsList[i].id) {
                hasHero = true
            }
        }

        if (data.formation.a == 0 && hasHero) {
            this.node.getChildByName(`noHeroDefine`).active = true
            this.node.getChildByName(`heroRender`).active = false
            this.cardTipDisplay.string = `您有${this.cards.length}名将领可供调用`
        } else {
            this.node.getChildByName(`noHeroDefine`).active = false
            let heroRender = this.node.getChildByName(`heroRender`)
            heroRender.active = true
            this.myHeroData = DataManager.GameData.Cards[data.formation.a]

            let tempId
            let card
            for (let i = 0; i < DataManager.cardsList.length; i++) {
                if (DataManager.cardsList[i].id == data.formation.a) {
                    tempId = DataManager.cardsList[i].template_id
                    card = DataManager.cardsList[i]
                }
            }
            console.log(`tempId:` + tempId)
            if (card) {
                heroRender.getComponent(battleHeroRender).init(card)
            } else {
                this.node.getChildByName(`noHeroDefine`).active = true
                this.node.getChildByName(`heroRender`).active = false
            }

            // heroRender.getComponent(battleHeroRender).init(DataManager.GameData.Cards[tempId])

            // heroRender.getComponent(battleHeroRender).init(DataManager.GameData.Cards[data.formation.a])
        }
    }

    S2CMineDefFormationSave(data) {
        console.log(`-----阵容保存返回------`)
        console.log(JSON.stringify(data))
        ViewManager.instance.showToast(`阵容保存成功`)
    }

    init(data, type, eviType) {
        this.eviType = eviType
        this.soliders = []
        this.cards = []
        this.mobilizeSoliders = []
        this.onSelectSolider = true


        this._type = type
        this.data = data
        console.log('data:' + JSON.stringify(data))
        if (type == 'in') {
            //调兵驻防
            this.titleDisplay.string = '派遣主城兵力驻防'
        } else if (type == 'out') {
            //撤回主城
            this.titleDisplay.string = '兵力撤回主城'
        }

        if (eviType == 0) {
            this.titleDisplay.string = '协助防守'
            this.node.getChildByName('heroRender').active = false
            this.node.getChildByName(`noHeroDefine`).active = false
            this.titleDisplay.node.parent.y = 230
            this.onSelectSolider = true
        } else if (eviType == 1) {
            this.titleDisplay.string = '协助进攻'
            this.node.getChildByName('heroRender').active = false
            this.node.getChildByName(`noHeroDefine`).active = false
            this.titleDisplay.node.parent.y = 230
            this.onSelectSolider = true
        } else {
            this.titleDisplay.node.parent.y = 330

        }
        this.tipDisplay.string = ``
        this.myContect.removeAllChildren()

        // MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.page, data.idx, data.country)
        this.initDetailData(DataManager.curMineDetailData)
        // NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail,this)
        NetEventDispatcher.addListener(NetEvent.S2CMineDefFormationSave, this.S2CMineDefFormationSave, this)

        // this.node.getChildByName('heroRender').getComponent(battleHeroRender).init(DataManager.cardsList[0])
        // this.myHeroData = DataManager.cardsList[0]
    }


    changeHero() {
        console.log(`----------换将-----------`)
        this.mobilizeSoliders = []
        this.tipDisplay.string = ``
        this.myHeroData = null

        if (this.onSelectSolider) {
            for (let i = 0; i < this.myContect.children.length; i++) {
                let soliderItem = this.myContect.children[i]
                let data = soliderItem.getComponent(battleSoliderRender).getSelectNum()
                if (data.count != 0) {
                    this.mobilizeSoliders.push(data)
                }
            }
        }

        this.onSelectSolider = false
        // console.log('this.cards:' + JSON.stringify(this.cards))

        this.myContect.removeAllChildren()
        for (let i = 0; i < this.cards.length; i++) {
            let hero = cc.instantiate(this.heroPfb)
            hero.x = 0
            hero.parent = this.myContect
            hero.getComponent(battleHeroRender).init(this.cards[i])
            hero.getChildByName('btnSelect').on(cc.Node.EventType.TOUCH_END, () => {
                this.myHeroData = this.cards[i]
                this.node.getChildByName('heroRender').getComponent(battleHeroRender).init(this.cards[i])
                this.changeScrollView();
                this.node.getChildByName(`noHeroDefine`).active = false
                this.node.getChildByName(`heroRender`).active = true
            }, this)
        }
    }

    changeScrollView() {
        this.onSelectSolider = true
        this.myContect.removeAllChildren()
        if (this.soliders.length == 0) {
            this.tipDisplay.string = `暂无可派遣兵力`
        } else {
            for (let i = 0; i < this.soliders.length; i++) {
                let solider = cc.instantiate(this.soliderPfb)
                solider.x = 0
                solider.parent = this.myContect
                solider.getComponent(battleSoliderRender).init(this.soliders[i].arm, this.soliders[i].count)

                if (this.mobilizeSoliders[i]) {
                    solider.getComponent(battleSoliderRender).setSelectNum(this.mobilizeSoliders[i].count)
                }
            }
        }
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE_SELECT)
    }

    doSave() {
        if (this.onSelectSolider) {
            this.mobilizeSoliders = []
            for (let i = 0; i < this.myContect.children.length; i++) {
                let soliderItem = this.myContect.children[i]

                let data = soliderItem.getComponent(battleSoliderRender).getSelectNum()
                if (data.count != 0) {
                    this.mobilizeSoliders.push(data)
                }
            }
        }

        let id
        if (this.myHeroData) {
            id = this.myHeroData.id
        } else {
            id = 0
        }
        let data = { fid: 2, formationId: 0, forward: 0, flip: 0, a: id, b: 0, c: 0, soldier: this.mobilizeSoliders }
        console.log(`country:` + this.data.country)
        console.log(JSON.stringify(data))
        if (this._type == 'in') {
            if (this.eviType != undefined) {
                MyProtocols.send_C2SMineDefFormationSave(DataManager._loginSocket, this.data.page, this.data.idx, data, this.data.country, 1, this.eviType)
            } else {
                MyProtocols.send_C2SMineDefFormationSave(DataManager._loginSocket, this.data.page, this.data.idx, data, this.data.country, 1)
            }
        } else {
            MyProtocols.send_C2SMineDefFormationSave(DataManager._loginSocket, this.data.page, this.data.idx, data, this.data.country, 0)
        }
    }

    onClose() {
        // NetEventDispatcher.removeListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail,this)
        NetEventDispatcher.removeListener(NetEvent.S2CMineDefFormationSave, this.S2CMineDefFormationSave, this)
    }

    // update (dt) {}
}
