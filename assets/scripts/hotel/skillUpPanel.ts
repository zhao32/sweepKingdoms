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
    lvLablel: cc.Label = null;


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
        MyProtocols.send_C2SSKillStUp(DataManager._loginSocket, DataManager.wndHotelDetail._data.id, this._idx, this._data.id, this._data.level + 1)

    }

    onCloseHandler() {
        this.node.active = false
    }

    init(data, idx) {
        // {"id":30015,"level":0,"type":0}
        console.log(JSON.stringify(data))
        this._data = data
        this._idx = idx
        this.lvLablel.string = `LV${data.level}   --->   LV${data.level + 1}`
        // let precnce = [100, 80, 50, 40, 30, 20, 15, 10, 8, 5]
        // let useList = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [6, 15], [10, 20], [15, 25], [20, 30]]
        // {
        //     "leave":0,
        //     "rate":100,
        //     "good":[1015,0],
        //     "num":1
        //   },
        let updata = DataManager.GameData.Enhanceconfig[`skillLeave`][Math.max(data.level - 1, 0)]

        let skillSt = DataManager.GameData.SkillStudy[data.id]
        ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.icon)

        this.decLablel.string = `升级成功概率:${updata.rate}%`
        this.numLablel0.string = `x${updata.num}`

        if (updata.good[1] == 0) {
            this.icon1.active = false
        } else {
            this.icon1.active = true
            this.numLablel1.string = `x${updata.good[1]}`
            let name = DataManager.GameData.Items[updata.good[0]].name
            ResManager.loadItemIcon(`UI/prop/${name}`, this.icon1)
        }

    }

    // update (dt) {}
}
