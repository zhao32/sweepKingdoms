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

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    posLabel: cc.Label = null;

    @property(cc.Label)
    lordLabel: cc.Label = null;

    @property(cc.Label)
    troopsLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    _data

    start() {

    }

    // {
    // 	"hold_player": {
    // 		"id": 0,
    // 		"nickname": "",
    // 		"level": 0,
    // 		"icon": 0,
    // 		"head_frame_id": 0,
    // 		"fight": 0,
    // 		"cd_time": 0,
    // 		"group": 0,
    // 		"lv": 0
    // 	}
    // }

    /**列表数据 阵容详情数据*/
    init(data = this._data) {
        this._data = data
        let name = DataManager.getName(data)
        // let name = DataManager.mineData[data.group].name
        // this.nameLabel.string = data.lv + '级' + name
        if (data.group >= 101) {
            this.nameLabel.string = name
        } else {
            if (data.bulidLv == 0) {
                this.nameLabel.string = `未建造` + data.lv + '级' + name
            } else {
                let lvList = ["微型", "小型", "中型", "大型", "巨型"]
                this.nameLabel.string = data.lv + "级 " + lvList[data.bulidLv - 1] + name
            }
        }

        if (!data.lv) {
            this.nameLabel.string = data.lv + '级' + name
        }

        this.lordLabel.string = `领主：${data.nickname}`
        // this.posLabel.string = `(${data.x},${data.y})`  //`(${data.x,data.y})`
        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)
        this.troopsLabel.string = `兵力：${data.fight}`
        // this.posLabel.string = `坐标：` + DataManager.countyList[data.country] + '国'
        this.posLabel.string = `坐标：` + DataManager.countyList[data.country] + `国 (${data.page + 1},${data.idx + 1})` 

        // : function (senderSocket, p_level_index, p_point_index) {
        // MyProtocols.send_C2SMineEnemyDetail(DataManager._loginSocket,)

        // if(data.id){
        //     ResManager.loadItemIcon(`goBattle/icon1`,this.icon)
        // }else{
        //     ResManager.loadItemIcon(`goBattle/icon0`,this.icon)
        // }


    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onSetHandler() {
        console.log(`我的驻扎`)
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUT, ...[this._data])

        // MyProtocols.send_C2SMineBattleCalculate(DataManager._loginSocket, this._data.x, this._data.y, true, 10)
        // ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        // let defineData =
        // {
        //     cardId: 0,
        //     soliders: [
        //         {
        //             arm: 1,
        //             count: 1000,
        //             fight: 0,
        //             defense: 0
        //         }
        //     ]
        // }
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_CONFIG, ...[defineData, this._data])
    }

    onClose() {

    }


    /**调兵驻防 */
    ondispatchArmyHandler() {
        console.log(`------调兵驻防--------`)
        let _from = DataManager.curWndPath
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_GOBATTLE_ARMYHUTDISPATCH, ...[this._data, 'in', null, _from])
    }



    // update (dt) {}
}
