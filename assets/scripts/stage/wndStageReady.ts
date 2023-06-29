// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import battleHeroRender from "../battle/battleHeroRender";
import battleSoliderRender from "../battle/battleSoliderRender";
import eSoliderRender from "../battle/eSoliderRender";
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

    // my_template_id: number

    myHeroData: any

    // otherHeroData: any
    _stageData

    groupIdx: number

    stageIdx: number
    start() {

    }


    init(stageData, groupIdx, stageIdx) {
        this.groupIdx = groupIdx
        this.stageIdx = stageIdx
        this._stageData = stageData
        // "cardId":1,"soliders":[{"arm":1,"count":100}]
        console.log('stageData:' + JSON.stringify(stageData))
        // DataManager.playData.military_data = [500, 500, 500]
        this.myContect.removeAllChildren()
        this.onSelectSolider = true
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
        this.initEnemyData(stageData.cardId, stageData.soliders)
    }

    initEnemyData(cardId, soliders) {
        console.log(`soliders:` + JSON.stringify(soliders))
        // {"arm":1,"count":100}
        // let template_id = 12
        // this.otherHeroData = DataManager.cardsList[cardId]
        let defaultData = DataManager.GameData.Cards[cardId]

        let enemyContect = this.node.getChildByName("enemy");
        enemyContect.getChildByName('name').getComponent(cc.Label).string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, enemyContect.getChildByName('head'))
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, enemyContect.getChildByName('iconBg'))
        ResManager.loadItemIcon(`hero/heroNameBg${defaultData.quality - 1}`, enemyContect.getChildByName('heroNameBg0'))

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
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            let hero = cc.instantiate(this.heroPfb)
            hero.x = 0
            hero.parent = this.myContect
            hero.getComponent(battleHeroRender).init(DataManager.cardsList[i])
            hero.getChildByName('btnSelect').on(cc.Node.EventType.TOUCH_END, () => {
                this.myHeroData = DataManager.cardsList[i]
                this.node.getChildByName('stageHeroRender').getComponent(battleHeroRender).init(DataManager.cardsList[i])
                this.changeScrollView();
            }, this)
        }
    }

    changeScrollView() {
        this.onSelectSolider = true
        this.myContect.removeAllChildren()
        for (let i = 0; i < DataManager.playData.military_data.length; i++) {
            if (DataManager.playData.military_data[i] != 0) {
                let solider = cc.instantiate(this.soliderPfb)
                solider.x = 0
                solider.parent = this.myContect
                solider.getComponent(battleSoliderRender).init(i + 1, DataManager.playData.military_data[i])
            }
        }
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_STAGE_READY)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE_SELECT)
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
                heroData: DataManager.GameData.Cards[this._stageData.cardId],
                soliderList: this._stageData.soliders
            }

            let allNum = 0

            for (let i = 0; i < this.myContect.children.length; i++) {
                let render = this.myContect.children[i]
                let data = render.getComponent(battleSoliderRender).getSelectNum()
                if (data.count > 0) {
                    myData.soliderList.push(data)
                }
                allNum += data.count
                // console.log(JSON.stringify(render.getComponent(stageSoliderRender).getSelectNum()))
            }


            if (allNum == 0) {
                ViewManager.instance.showToast('请选择上阵士兵')
                return
            }

            let data = { fid: 1, formationId: 0, forward: 0, flip: 0, a: this.myHeroData.id, b: 0, c: 0, soldier: myData.soliderList }
            console.log(JSON.stringify(data))
            MyProtocols.send_C2SBattleFormationSave(DataManager._loginSocket, data)

            // console.log('my_template_id:' + this.my_template_id)
            ViewManager.instance.hideWnd(DataManager.curWndPath)
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE_BATTLE, ...[myData, otherData, this.groupIdx, this.stageIdx])
        }
    }

    onClose() {

    }

    // update (dt) {}
}
