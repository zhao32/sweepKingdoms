// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import hotelRender from "./hotelRender";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    renderPfb: cc.Prefab = null;

    @property(cc.SpriteFrame)
    iconFrame: cc.SpriteFrame[] = [];

    @property(cc.Label)
    populationDisplay: cc.Label = null;




    hotelData = [
        {
            idx: 0,
            name: '将领招募',
            describe: '可以招募到更优秀的将领，大幅提高军队实力',
        },
        {
            idx: 1,
            name: '查看将领',
            describe: '可以查看自己所拥有的全部将领属性、技能，可以分解无用的将领'
        },
        {
            idx: 2,
            name: '将领强化',
            describe: '提升将领的兵种熟练程度，使将领的技能效果变强'
        },
        {
            idx: 3,
            name: '将领升级',
            describe: '使指定的将领通过吞噬其他将领，直接获取经验'
        },
        {
            idx: 4,
            name: '将领进化',
            describe: '提升将领的星级最高至六星，星级越高属性越强'
        },
        {
            idx: 5,
            name: '将领传承',
            describe: '提升将领的成长潜质，使其升级后拥有更高的熟练度上限加成'
        },
        {
            idx: 6,
            name: '将领转生',
            describe: '天选以上将领可以通过转生进化至更高阶品质'
        },
    ]


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {
        this.node.getChildByName('scrollView').getComponent(cc.ScrollView).scrollToTop()
        this.contect.removeAllChildren()
        for (let i = 0; i < this.hotelData.length; i++) {
            let render = cc.instantiate(this.renderPfb)
            render.parent = this.contect
            render.getComponent(hotelRender).init(this.hotelData[i])

            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }

            render.on(cc.Node.EventType.TOUCH_END, () => {
                if (i == 0) {
                    console.log('-------打开招募--------')
                    ViewManager.instance.hideWnd(DataManager.curWndPath)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_RECRUIT)
                } else {
                    ViewManager.instance.hideWnd(DataManager.curWndPath)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL_LIST, ...[EnumManager.viewPath.WND_HOTEL, this.hotelData[i]])
                }
            }, this)
        }

        /**居民区 */
        let jmqGrade = DataManager.GameData.build['basic'][1].grade
        if (jmqGrade < 1) jmqGrade = 1
        let maxProportion = DataManager.GameData.buildUp["basic"][2][jmqGrade - 1].proportion[2]
        this.populationDisplay.string = `${DataManager.playData.population}/${maxProportion}`

        let keys = Object.keys(DataManager.GameData.MineStone)
        console.log(`keys:` + JSON.stringify(keys))
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                if (keys[j] == DataManager.instance.itemsList[i].template_id) {
                    this.node.getChildByName(`pearls`).children[7 + j].getComponent(cc.Label).string = `x` + DataManager.instance.itemsList[i].num
                }
            }
        }

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_HOTEL, true)
    }

    onClose() {

    }

    // update (dt) {}
}
