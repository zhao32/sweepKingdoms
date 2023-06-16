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

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {
        this.myContect.removeAllChildren()
        // this.onSelectSolider = true
        for (let i = 0; i < DataManager.playData.military_data.length; i++) {
            if (DataManager.playData.military_data[i] != 0) {
                let solider = cc.instantiate(this.soliderPfb)
                solider.x = 0
                solider.parent = this.myContect
                solider.getComponent(battleSoliderRender).init(i + 1, DataManager.playData.military_data[i])
            }
        }

        this.node.getChildByName('heroRender').getComponent(battleHeroRender).init(DataManager.cardsList[0])
        // this.myHeroData = DataManager.cardsList[0]
    }

    
    changeHero() {
        // this.onSelectSolider = false
        this.myContect.removeAllChildren()
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            let hero = cc.instantiate(this.heroPfb)
            hero.x = 0
            hero.parent = this.myContect
            hero.getComponent(battleHeroRender).init(DataManager.cardsList[i])
            hero.getChildByName('btnSelect').on(cc.Node.EventType.TOUCH_END, () => {
                // this.myHeroData = DataManager.cardsList[i]
                this.node.getChildByName('heroRender').getComponent(battleHeroRender).init(DataManager.cardsList[i])
                this.changeScrollView();
            }, this)
        }
    }

    changeScrollView() {
        // this.onSelectSolider = true
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

    onClose() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE_SELECT)
    }

    enterFight() {
        // let soliderList = 
      
        
    }

    doSave(){
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

    // update (dt) {}
}