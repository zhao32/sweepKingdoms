// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
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

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    _data

    start() {

    }

    // {
    //     "x": 1,
    //     "y": 25,
    //     "type": 1,
    //     "name": "农田",
    //     "lv": 2,
    //     "troops": 1000,
    //     "min": 0,
    //     "max": 9500
    //   },
    init(data) {
        this._data = data
        this.nameLabel.string = data.lv + '级' + data.name
        this.posLabel.string =`(${data.x},${data.y})`  //`(${data.x,data.y})`
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    onBattleHandler() {
        MyProtocols.send_C2SMineBattleCalculate(DataManager._loginSocket, this._data.x, this._data.y, true, 10)
    }


    // update (dt) {}
}
