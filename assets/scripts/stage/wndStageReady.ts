// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import stageHeroRender from "./stageHeroRender";
import stageSoliderRender from "./stageSoliderRender";

const { ccclass, property } = cc._decorator;

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

    start() {

    }

    init() {

        this.myContect.removeAllChildren()
        for (let i = 0; i < DataManager.playData.military_data.length; i++) {
            if (DataManager.playData.military_data[i] != 0) {
                let solider = cc.instantiate(this.soliderPfb)
                solider.x = 0
                solider.parent = this.myContect
                solider.getComponent(stageSoliderRender).init(i + 1)
            }
        }

        this.otherContect.removeAllChildren()
        for (let i = 0; i < 10; i++) {
            let solider = cc.instantiate(this.eSoliderPfb)
            solider.x = 0
            solider.parent = this.otherContect
        }

        this.node.getChildByName('stageHeroRender').getComponent(stageHeroRender).init(DataManager.cardsList[0])

    }

    changeHero() {
        this.myContect.removeAllChildren()
        for (let i = 0; i < 10; i++) {
            let hero = cc.instantiate(this.heroPfb)
            hero.x = 0
            hero.parent = this.myContect
            hero.getComponent(stageHeroRender).init(DataManager.cardsList[i])
            hero.getChildByName('btnSelect').on(cc.Node.EventType.TOUCH_END, () => {
                this.node.getChildByName('stageHeroRender').getComponent(stageHeroRender).init(DataManager.cardsList[i])
                this.changeScrollView()
            }, this)
        }
    }

    changeScrollView() {
        this.myContect.removeAllChildren()
        for (let i = 0; i < DataManager.playData.military_data.length; i++) {
            if (DataManager.playData.military_data[i] != 0) {
                let solider = cc.instantiate(this.soliderPfb)
                solider.x = 0
                solider.parent = this.myContect
                solider.getComponent(stageSoliderRender).init(i + 1)
            }
        }
    }

    // update (dt) {}
}
