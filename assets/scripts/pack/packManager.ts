// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");
@ccclass
export default class packManager extends cc.Component {

    private _RuneList

    _isRefish: boolean = false

    protected static instance: packManager;
    public static getInstance(): packManager {
        if (!this.instance) {
            this.instance = new packManager();
        }
        return this.instance;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CBagItems, this.S2CBagItems,this)
    }

    reflishBag() {
        console.log(`---------请求背包-----------`)
        this._isRefish = false
        MyProtocols.send_C2SBagItems(DataManager._loginSocket)
    }

    S2CBagItems(retObj) {
        console.log('retObj:'+ JSON.stringify(retObj))
        this._isRefish = true
        DataManager.instance.curRuneList = []
        for (let i = 0; i < retObj.item_list.length; i++) {
            if (retObj.item_list[i].template_id >= 5001 && retObj.item_list[i].template_id <= 5040) {
                DataManager.instance.curRuneList.push(retObj.item_list[i])
            }
        }
        console.log(`this.RuneList:`+JSON.stringify( DataManager.instance.curRuneList))
    }

    isRefish() {
        return this._isRefish
    }


    // getRuneList(){
    //     return this._RuneList
    // }
    // update (dt) {}
}
