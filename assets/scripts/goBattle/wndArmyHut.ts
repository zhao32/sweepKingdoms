// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import battleHeroRender from "../battle/battleHeroRender";
import battleSoliderRender from "../battle/battleSoliderRender";
import eSoliderRender from "../battle/eSoliderRender";
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
    tipDisplay: cc.Label = null;

    @property(cc.Label)
    cardTipDisplay: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:
    myHeroData

    soliders = []

    cards = []

    _data:any

    // onLoad () {}

    start() {

    }

    S2CMineEnemyDetail(data) {
        console.log("返回矿场阵容")
        console.log(JSON.stringify(data))
        this._data = data

        this.soliders = []
        this.cards = []
        this.myHeroData = null

        // {"level_index":0,"point_index":22,"base_info":{"id":0,"nickname":"","level":0,"icon":0,"head_frame_id":1,"fight":0,"cd_time":0},"formation":{"fid":0,"formationId":0,"forward":0,"flip":0,"a":0,"b":0,"c":0},"soliderUsed":[],"soliderUse":[],"cards":[],"exclude_cards":[],"rand_key":0}



        for (let i = 0; i < data.soliderUsed.length; i++) {
            if (data.soliderUsed[i].arm != 0) {
                this.soliders.push(data.soliderUsed[i])
            }
        }
        this.cards = data.cards

        console.log(`this.soliders:` + JSON.stringify(this.soliders))
        if (this.soliders.length == 0) {
            this.tipDisplay.string = `暂无遣兵力`
        } else {
            this.tipDisplay.string = ``
            this.myContect.removeAllChildren()
            // this.onSelectSolider = true
            for (let i = 0; i < this.soliders.length; i++) {
                let solider = cc.instantiate(this.soliderPfb)
                solider.x = 0
                solider.parent = this.myContect
                solider.getComponent(eSoliderRender).init(this.soliders[i].arm, this.soliders[i].count)
            }
        }

        if (data.formation.a == 0) {
            this.node.getChildByName(`noHeroDefine`).active = true
            this.node.getChildByName(`heroRender`).active = false

            this.cardTipDisplay.string = `您有${this.cards.length}名将领可供调用`
        } else {
            this.node.getChildByName(`noHeroDefine`).active = false
            let heroRender = this.node.getChildByName(`heroRender`)
            heroRender.active = true
            this.myHeroData = DataManager.GameData.Cards[data.formation.a]
            heroRender.getComponent(battleHeroRender).init(DataManager.GameData.Cards[data.formation.a])
        }
    }

    init(data) {
        this.soliders = []
        this.cards = []
        this.myHeroData = null

        this.myContect.removeAllChildren()

        console.log('--------data------' + JSON.stringify(data))
        MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, data.page, data.idx,data.country)
        NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail.bind(this))


        // this.node.getChildByName('heroRender').getComponent(battleHeroRender).init(this.cards[0])
        // this.myHeroData = this.cards[0]
    }


    changeHero() {
        // this.onSelectSolider = false
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


                let data = { fid: 2, formationId: 0, forward: 0, flip: 0, a: this.myHeroData.template_id, b: 0, c: 0, soldier: this.soliders }
                console.log(JSON.stringify(data))
                console.log('this._data:'+ JSON.stringify(this._data))
                // MyProtocols.send_C2SBattleFormationSave(DataManager._loginSocket, data)
                MyProtocols.send_C2SMineDefFormationSave(DataManager._loginSocket, this._data.page, this._data.idx, data, this._data.country, 2)
            }, this)
        }
    }

    changeScrollView() {
        // this.onSelectSolider = true
        this.myContect.removeAllChildren()
        for (let i = 0; i < this.soliders.length; i++) {
            let solider = cc.instantiate(this.soliderPfb)
            solider.x = 0
            solider.parent = this.myContect
            solider.getComponent(eSoliderRender).init(this.soliders[i].arm, this.soliders[i].count)
        }
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail.bind(this))

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE_SELECT)
    }

    enterFight() {
        // let soliderList = 
    }

    // doSove() {
    //     let data = { fid: 2, formationId: 0, forward: 0, flip: 0, a: this.myHeroData.template_id, b: 0, c: 0, soldier: DataManager.myBattleFiledConfig.soliders }
    //     console.log(JSON.stringify(data))
    //     MyProtocols.send_C2SBattleFormationSave(DataManager._loginSocket, data)
    // }


    // update (dt) {}
}
