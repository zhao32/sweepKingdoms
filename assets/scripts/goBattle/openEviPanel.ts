// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import eSoliderRender from "../battle/eSoliderRender";
import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    infoDisplay: cc.Label = null;

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    pfb: cc.Prefab = null;

    _data

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this._data = data
        this.contect.removeAllChildren()
        let soliders = DataManager.mineData[this._data.hold_player.group].soliders
        for (let i = 0; i < soliders.length; i++) {
            let render = cc.instantiate(this.pfb)
            render.x = 0
            render.parent = this.contect
            render.getComponent(eSoliderRender).init(soliders[i].arm, soliders[i].count)
        }

        let str: string
        if (this._data.hold_player.group == 106) {
            if (this._data.hold_player.country == 1) {
                //华夏遗迹
                str = DataManager.mineData[this._data.hold_player.group].prize[0]
            } else if (this._data.hold_player.country == 4) {
                //蓬莱遗迹
                str = DataManager.mineData[this._data.hold_player.group].prize[1]
            } else if (this._data.hold_player.country == 6) {
                //归墟遗迹
                str = DataManager.mineData[this._data.hold_player.group].prize[2]
            }
        } else if (this._data.hold_player.group == 105) {
            if (this._data.hold_player.country == 2) {
                //上古战场
                str = DataManager.mineData[this._data.hold_player.group].prize[0]
            } else if (this._data.hold_player.country == 7) {
                //财神庙
                str = DataManager.mineData[this._data.hold_player.group].prize[1]
            }
        } else {
            str = DataManager.mineData[this._data.hold_player.group].prize[0]
        }
        this.infoDisplay.string = str
    }

    onCloseOpHandler() {
        this.node.active = false
    }

    onOpenEviHandler() {
        MyProtocols.send_C2SEviGate(DataManager._loginSocket, this._data.hold_player.page, this._data.hold_player.idx, this._data.hold_player.country)
    }
    // update (dt) {}
}
