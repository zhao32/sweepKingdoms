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

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    label: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _data

    start() {

    }

    init(data, idx) {
        this._data = data
        data.result.eHurt;
        data.result.myWin;

        let defaultData0 = DataManager.GameData.Cards[data.myData.card.template_id]
        ResManager.loadItemIcon(`hero/icon/${defaultData0.name}`, this.node.getChildByName(`head0`))
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData0.quality - 1}`, this.node.getChildByName(`bg0`))

        let defaultData1 = DataManager.GameData.Cards[data.eData.card.template_id]
        ResManager.loadItemIcon(`hero/icon/${defaultData1.name}`, this.node.getChildByName(`head1`))
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData1.quality - 1}`, this.node.getChildByName(`bg1`))
        this.node.getChildByName('result0').getComponent(cc.Label).string = data.result.myWin ? "赢" : "输"
        this.node.getChildByName('result1').getComponent(cc.Label).string = !data.result.myWin ? "赢" : "输"
        this.node.getChildByName('hurt0').getComponent(cc.Label).string = `x${data.result.mHurt}`
        this.node.getChildByName('hurt1').getComponent(cc.Label).string = `x${data.result.eHurt}`

        this.node.getChildByName('VS').getComponent(cc.Label).string = `第${idx}局\nVS`
    }

    onBackBattle() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_BATTLE,...[this._data.myData,this._data.eData])


    }

    // update (dt) {}
}
