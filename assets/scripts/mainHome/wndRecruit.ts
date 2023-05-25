// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    contect: cc.Node = null;

    @property({ type: cc.Sprite, displayName: '士兵图片' })
    soldierSprite: cc.Sprite = null;

    @property({ type: cc.Label, displayName: '人口' })
    populationDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '兵力' })
    troopsDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '士兵名称' })
    soldierNameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '士兵单价' })
    soldierPriceDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '士兵战力' })
    soldierPowerDisplay: cc.Label = null;


    @property({ type: cc.Label, displayName: '可招募兵力1' })
    troopsDisplay1: cc.Label = null;


    @property({ type: cc.Label, displayName: '可招募兵力2' })
    troopsDisplay2: cc.Label = null;

    @property({ type: cc.Label, displayName: '可招募兵总价1' })
    priceDisplay1: cc.Label = null;

    @property({ type: cc.Label, displayName: '可招募兵总价2' })
    priceDisplay2: cc.Label = null;

    @property({ type: cc.Label, displayName: '恢复兵力价格' })
    recoverPriceDisplay: cc.Label = null;

    @property({ type: cc.Node, displayName: '恢复兵力Node' })
    recoverNode: cc.Node = null;

    @property({ type: cc.Node, displayName: '已恢复兵力Node' })
    recoverdNode: cc.Node = null;

    soliderType: number = 0

    _idx: number = 0

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.schedule(() => { this.updateData(this._idx) }, 1)
    }

    init(idx: number) {
        for (let i = 0; i < 4; i++) {
            let render = this.contect.getChildByName(`bgRender${i}`)
            render.x = 1000
            this.scheduleOnce(() => {
                render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
            }, 0.3 * i)
        }
        this._idx = idx

        // let barracksList = ["军营", '盾卫训练场', '骑士训练场', '枪兵训练场', '箭手训练场', '法师', '木牛工厂', '军魂祭坛', '部队强化']
        let group = 'barracks'
        // let idx = 0
        // if (barracksList.indexOf(name) != -1) {
        //     for (let i = 0; i < barracksList.length; i++) {
        //         if (barracksList[i] == name) {
        //             idx = i + 1
        //         }
        //     }
        // }
        let grade = DataManager.GameData.build[group][idx - 1].grade
        console.log('兵：' + JSON.stringify(DataManager.GameData.buildUp[group][1][grade - 1]))
        let maxSolider = DataManager.GameData.buildUp[group][1][grade - 1].Soldier

        /**居民区等级 */
        let jmqGrade = DataManager.GameData.build['basic'][0].grade
        let maxProportion = DataManager.GameData.buildUp["basic"][1][jmqGrade - 1].proportion[2]

        console.log('maxSolider:' + maxSolider)
        console.log('maxProportion:' + maxProportion)
        DataManager.GameData.buildUp['barracks']

        this.soldierNameDisplay.string = DataManager.GameData.Soldier[idx - 1].name
        this.populationDisplay.string = `${DataManager.playData.population}/${maxProportion}`
        this.troopsDisplay.string = `${DataManager.playData.troops}/${maxSolider}`
        let price = DataManager.GameData.Soldier[idx - 1].price
        this.soldierPriceDisplay.string = `粮草 x${price}`
        this.troopsDisplay1.string = String(DataManager.playData.population)
        this.priceDisplay1.string = `x` + String(DataManager.GameData.buildUp[group][idx][grade - 1].population[1] * 0.01 * (DataManager.playData.population) * price);

        this.soliderType = DataManager.GameData.buildUp[group][idx][grade - 1].soldier[0];

        ResManager.loadItemIcon(`soliderHead/${DataManager.GameData.Soldier[idx - 1].name}`, this.soldierSprite.node)
    }

    updateData(idx) {
        // let barracksList = ["军营", '盾卫训练场', '骑士训练场', '枪兵训练场', '箭手训练场', '法师', '木牛工厂', '军魂祭坛', '部队强化']
        let group = 'barracks'
        // let idx = 0
        // if (barracksList.indexOf(name) != -1) {
        //     for (let i = 0; i < barracksList.length; i++) {
        //         if (barracksList[i] == name) {
        //             idx = i + 1
        //         }
        //     }
        // }
        let grade = DataManager.GameData.build[group][idx - 1].grade
        // console.log('兵：' + JSON.stringify(DataManager.GameData.buildUp[group][1][grade - 1]))
        let maxSolider = DataManager.GameData.buildUp[group][1][grade - 1].Soldier

        /**居民区等级 */
        let jmqGrade = DataManager.GameData.build['basic'][0].grade
        let maxProportion = DataManager.GameData.buildUp["basic"][1][jmqGrade - 1].proportion[2]

        // console.log('maxSolider:' + maxSolider)
        // console.log('maxProportion:' + maxProportion)
        DataManager.GameData.buildUp['barracks']

        this.soldierNameDisplay.string = DataManager.GameData.Soldier[idx - 1].name
        this.populationDisplay.string = `${DataManager.playData.population}/${maxProportion}`
        this.troopsDisplay.string = `${DataManager.playData.troops}/${maxSolider}`
        let price = DataManager.GameData.Soldier[idx - 1].price
        this.soldierPriceDisplay.string = `粮草 x${price}`
        this.troopsDisplay1.string = String(DataManager.playData.population)
        this.priceDisplay1.string = `x` + String(DataManager.GameData.buildUp[group][idx][grade - 1].population[1] * 0.01 * (DataManager.playData.population) * price);

        this.soliderType = DataManager.GameData.buildUp[group][idx][grade - 1].soldier[0];

    }

    recruitHandler(event, data) {
        console.log('-------招募请求-------', this._idx, this.soliderType)
        MyProtocols.send_C2SRecSoldiers(DataManager._loginSocket, this._idx, 0, this.soliderType)
    }

    recoverHandler() {

    }

    backHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)

    }

    // update (dt) {}
}
