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
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
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

    @property(cc.Node)
    otherContect: cc.Node = null;


    @property(cc.Prefab)
    heroPfb: cc.Prefab = null;

    @property(cc.Prefab)
    soliderPfb: cc.Prefab = null;

    @property(cc.Prefab)
    eSoliderPfb: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onSelectSolider: boolean = false

    my_template_id: number

    myHeroData: any

    groupIdx: number

    enemyData: any

    filedData: any

    mySoliders = []

    myCards = []




    start() {

    }

    S2CMineEnemyDetail(retObj) {
        console.log(`--------我的主城兵力-----------`)
        console.log(JSON.stringify(retObj))
        // {"level_index":0,"point_index":0,"base_info":{"id":0,"nickname":"","level":0,"icon":0,"head_frame_id":1,"fight":0,"cd_time":0},"formation":{"fid":0,"formationId":0,"forward":0,"flip":0,"a":0,"b":0,"c":0},"soliderUsed":[],"soliderUse":[{"arm":0,"count":1000},{"arm":1,"count":1000},{"arm":2,"count":1000}],"cards":[],"exclude_cards":[],"rand_key":2923001863557120}
        // let soliderData = []
        // for (let i = 0; i < retObj.soliderUse.length; i++) {
        //     if (retObj.soliderUse[i].arm != 0) {
        //         soliderData.push({
        //             arm: retObj.soliderUse[i].arm,
        //             count: retObj.soliderUse[i].count,
        //             fight: 0,
        //             defense: 0
        //         })
        //     }
        // }
        // ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        // let defineData =
        // {
        //     cardId: retObj.formation.a,
        //     soliders: soliderData
        // }
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, ...[defineData, this._data])
        this.mySoliders = []

        this.myCards = []


        for (let i = 0; i < retObj.soliderUse.length; i++) {
            if (retObj.soliderUse[i].arm != 0) {
                this.mySoliders.push(retObj.soliderUse[i])
            }
        }

        let workKeyList = []
        for (let i = 0; i < retObj.exclude_cards.length; i++) {
            workKeyList.push(retObj.exclude_cards[i].template_id)
        }

        for (let i = 0; i < retObj.cards.length; i++) {
            workKeyList.push(retObj.cards[i].template_id)
        }

        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (workKeyList.indexOf(DataManager.cardsList[i].template_id) == -1) {
                this.myCards.push(DataManager.cardsList[i])
            }
        }

        this.myHeroData = this.myCards[0]

        this.myContect.removeAllChildren()
        for (let i = 0; i < this.mySoliders.length; i++) {
            if (this.mySoliders[i].arm != 0) {
                let solider = cc.instantiate(this.soliderPfb)
                solider.x = 0
                solider.parent = this.myContect
                solider.getComponent(battleSoliderRender).init(this.mySoliders[i].arm, this.mySoliders[i].count)
            }
        }

        this.node.getChildByName('stageHeroRender').getComponent(battleHeroRender).init(this.myHeroData)
    }

    init(enemyData, filedData) {
        console.log('filedData:' + JSON.stringify(filedData))
        this.enemyData = enemyData
        this.filedData = filedData

        console.log(`DataManager.pageGoBattle.myCityData:` + JSON.stringify(DataManager.pageGoBattle.myCityData))
        let cityData = DataManager.pageGoBattle.myCityData
        this.onSelectSolider = true

        if (DataManager.pageGoBattle.myCityData) {
            MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket, cityData.page, cityData.idx, cityData.country)
        } else {
            this.myContect.removeAllChildren()
            for (let i = 0; i < DataManager.playData.military_data.length; i++) {
                if (DataManager.playData.military_data[i] != 0) {
                    let solider = cc.instantiate(this.soliderPfb)
                    solider.x = 0
                    solider.parent = this.myContect
                    solider.getComponent(battleSoliderRender).init(i + 1, DataManager.playData.military_data[i])
                }
            }

            this.node.getChildByName('stageHeroRender').getComponent(battleHeroRender).init(DataManager.cardsList[0])
            this.myHeroData = DataManager.cardsList[0]
        }

        this.initEnemyData(enemyData.cardId, enemyData.soliders)
        NetEventDispatcher.addListener(NetEvent.S2CMineEnemyDetail, this.S2CMineEnemyDetail.bind(this))
    }

    initEnemyData(cardId, soliders) {
        console.log(`soliders:` + JSON.stringify(soliders))

        if (cardId == 0) {
            this.node.getChildByName("enemy").active = false
        } else {
            let defaultData = DataManager.GameData.Cards[cardId]
            let enemyContect = this.node.getChildByName("enemy");
            enemyContect.getChildByName('name').getComponent(cc.Label).string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, enemyContect.getChildByName('head'))
            ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, enemyContect.getChildByName('iconBg'))
            ResManager.loadItemIcon(`hero/heroNameBg${defaultData.quality - 1}`, enemyContect.getChildByName('heroNameBg0'))
        }

        this.otherContect.removeAllChildren()
        for (let i = 0; i < soliders.length; i++) {
            let solider = cc.instantiate(this.eSoliderPfb)
            solider.getComponent(eSoliderRender).init(soliders[i].arm, soliders[i].count)

            solider.x = 0
            solider.parent = this.otherContect
        }
    }

    changeHero() {
        this.onSelectSolider = false
        this.myContect.removeAllChildren()
        for (let i = 0; i < this.myCards.length; i++) {
            let hero = cc.instantiate(this.heroPfb)
            hero.x = 0
            hero.parent = this.myContect
            hero.getComponent(battleHeroRender).init(this.myCards[i])
            hero.getChildByName('btnSelect').on(cc.Node.EventType.TOUCH_END, () => {
                this.myHeroData = this.myCards[i]
                this.node.getChildByName('stageHeroRender').getComponent(battleHeroRender).init(this.myCards[i])
                this.changeScrollView();
            }, this)
        }
    }

    changeScrollView() {
        this.onSelectSolider = true
        this.myContect.removeAllChildren()
        for (let i = 0; i < this.mySoliders.length; i++) {
            if (this.mySoliders[i].arm != 0) {
                let solider = cc.instantiate(this.soliderPfb)
                solider.x = 0
                solider.parent = this.myContect
                solider.getComponent(battleSoliderRender).init(this.mySoliders[i].arm, this.mySoliders[i].count)
              
            }
        }
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE_SELECT)
    }

    enterFight() {
        
        // let soliderList = 
        if (!this.onSelectSolider) {
            ViewManager.instance.showToast('请选择上阵士兵')
        } else {
            let myData = {
                heroData: this.myHeroData,
                soliderList: []
            }

            let otherData = {
                heroData: DataManager.GameData.Cards[this.enemyData.cardId],
                soliderList: this.enemyData.soliders
            }

            let allNum = 0

            for (let i = 0; i < this.myContect.children.length; i++) {
                let render = this.myContect.children[i]
                let data = render.getComponent(battleSoliderRender).getSelectNum()
                let defineData = {
                    arm: data.arm,
                    count: data.count,
                    fight: 0,
                    defense: 0
                }
                if (data.count > 0) {
                    myData.soliderList.push(defineData)
                }
                allNum += data.count
            }


            if (allNum == 0) {
                ViewManager.instance.showToast('请选择上阵士兵')
                return
            }

            let data = { fid: 1, formationId: 0, forward: 0, flip: 0, a: this.myHeroData.template_id, b: 0, c: 0, soldier: myData.soliderList }
            console.log(JSON.stringify(data))
            MyProtocols.send_C2SBattleFormationSave(DataManager._loginSocket, data)

            console.log('my_template_id:' + this.my_template_id)
            ViewManager.instance.hideWnd(DataManager.curWndPath)
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_BATTLE, ...[myData, otherData, this.filedData])
        }
    }

    onClose() {

    }

    // update (dt) {}
}
