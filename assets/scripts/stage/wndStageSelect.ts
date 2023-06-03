// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import GameUtil from "../utils/Manager/GameUtil";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";
import StageSelectItem from "./StageSelectItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    awardCoinLabel: cc.Label = null;

    @property(cc.Label)
    awardExpLabel: cc.Label = null;

    @property(cc.Label)
    energyLabel: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    itemPfb: cc.Prefab = null;

    _selectIdx: number = 1

    _data

    _stateData
    // LIFE-CYCLE CALLBACKS:

    groupIdx: number

    stageIdx: number

    // onLoad () {}

    start() {

        // this.node.on(cc.Node.EventType.TOUCH_END, () => {
        //     let children = this.node.parent.children
        //     for (let i = 0; i < children.length; i++) {
        //         children[i].getChildByName('selected').active = false
        //     }
        //     this.node.getChildByName('selected').active = true

        //     for (let i = 0; i < children.length; i++) {
        //         if (children[i].getChildByName('selected').active == true) {
        //             this.selectIdx = i + 1
        //         }
        //     }
        //     console.log('this.selectIdx:' + this.selectIdx)
        // }, this)


    }
    curStageData: any
    // stateData:{"stages":[{"star":3,"times":5,"is_get_award":false},{"star":3,"times":19,"is_get_award":false}],"star_award":[]}
    init(data = this._data, stateData = this._stateData, groupIdx: number) {
        data = GameUtil.deepClone(data)
        this._data = data
        this._stateData = stateData
        this.curStageData = data.stage[0]
        this.groupIdx = groupIdx
        this.stageIdx = 0
        // console.log('stateData:'+ JSON.stringify(data))
        // console.log(`stageData:` + JSON.stringify(data))
        // console.log(`stateData:` + JSON.stringify(stateData))
        this.nameLabel.string = data.name;
        this.awardExpLabel.string = 'x' + data.stage[0].exp
        this.awardCoinLabel.string = 'x' + data.stage[0].gamemoney
        this.energyLabel.string = 'x' + data.stage[0].energy_cost
        this.contect.removeAllChildren()
        for (let i = 0; i < data.stage.length; i++) {
            let item = cc.instantiate(this.itemPfb)
            item.parent = this.contect
            let isopen = (i <= stateData.stages.length) ? true : false
            let rank = String(i + 1)
            item.getComponent(StageSelectItem).init(stateData.stages[i], isopen, rank, data.stage[0].attrs[0].unit_num)

            item.on(cc.Node.EventType.TOUCH_END, () => {
                for (let j = 0; j < this.contect.children.length; j++) {
                    this.contect.children[j].getChildByName('selected').active = false
                }
                item.getChildByName('selected').active = true
                this._selectIdx = i + 1
                this.stageIdx = i
                // console.log('this._selectIdx:' + this._selectIdx)
                this.curStageData = data.stage[i]
            }, this)
        }
    }

    onBack() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE)
    }

    onHandleStart() {
        Logger.log('-----开始副本----')
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE_READY, ...[this.curStageData, this.groupIdx, this.stageIdx])
    }

    // update (dt) {}
}
