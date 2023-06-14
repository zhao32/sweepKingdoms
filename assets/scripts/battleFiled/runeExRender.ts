// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    _data

    // onLoad () {}

    start() {

    }

    // {
    //     "item": 5004,
    //     "gamemone": 75
    // }
    init(data) {
        this._data = data
        this.nameLabel.string = `兑换【${data.name}】`

    }

    btnExchange() {
        this.ExchangeRune(this._data.item, 1)

    }

    ExchangeRune(id, num) {
        console.log('id:'+id)
        console.log('num:'+num)
        MyProtocols.send_C2SArenaExchange(DataManager._loginSocket, id, num)
    }


    // update (dt) {}
}
