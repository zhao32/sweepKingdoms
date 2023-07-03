// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import { Logger } from "../utils/Manager/Logger";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.ToggleContainer })
    ToggleContainer: cc.ToggleContainer = null;

    @property({ type: cc.Node })
    contect: cc.Node = null;

    @property({ type: cc.Prefab })
    itemPfb: cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let ToggleList = this.ToggleContainer.getComponentsInChildren(cc.Toggle)
        ToggleList[0].isChecked = true
        for (let i = 0; i < ToggleList.length; i++) {
            ToggleList[i].node.on('toggle', (event: cc.Toggle) => {
                if (event.isChecked == true) {
                    console.log('选中' + i)
                    this.contect.removeAllChildren()
                 
                }
            }, this)
        }
        MyProtocols.send_C2SMallList(DataManager._loginSocket)
    }

    setPanelInfo(data) {

    }

    init() {
        NetEventDispatcher.addListener(NetEvent.S2CMallList, this.S2CMallList, this)
    }

    S2CMallList(data){
        console.log(`商场数据返回`)
        console.log(JSON.stringify(data))
        this.contect.removeAllChildren()
    }


    list0 = []
    list1 = []
    list2 = []
    list3 = []
    list4 = []

    

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }


    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CMallList, this.S2CMallList, this)

    }

    // update (dt) {}
}
