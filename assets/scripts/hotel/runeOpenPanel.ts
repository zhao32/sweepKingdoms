// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    decLablel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Label)
    numLablel0: cc.Label = null;

    @property(cc.Node)
    icon1: cc.Node = null;

    @property(cc.Label)
    numLablel1: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _idx;
    _data;

    start() {

    }

    onUpHandler() {
        this.onCloseHandler()
        MyProtocols.send_C2SOpenRuneSlot(DataManager._loginSocket, DataManager.wndHotelDetail._data.id, this._idx)
    }

    onCloseHandler() {
        this.node.active = false
    }

    init(data, idx) {
        this._data = data
        this._idx = idx
        // let precnce = [100, 80, 50, 40, 30, 20, 15, 10, 8, 5]
        // let useList = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [6, 15], [10, 20], [15, 25], [20, 30]]
        // {
        //     "leave":0,
        //     "rate":100,
        //     "good":[1015,0],
        //     "num":1
        //   },
        let runedata = DataManager.GameData.Enhanceconfig[`runeSoltOpen`][idx - 1]

        // let skillSt = DataManager.GameData.SkillStudy[data.id]
        // ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.icon)
        this.icon.active = false

        this.decLablel.string = `成功打开概率:${runedata.rate}%`
        this.numLablel1.string = `x${runedata.good[1]}`
        let name = DataManager.GameData.Items[runedata.good[0]].name
        ResManager.loadItemIcon(`UI/prop/${name}`, this.icon1)
       

    }

    // update (dt) {}
}
