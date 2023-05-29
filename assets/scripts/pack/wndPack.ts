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
    renderPfb: cc.Prefab = null;

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
                    Logger.log('选中' + i)
                }
            }, this)
        }
        MyProtocols.send_C2SBagItems(DataManager._loginSocket)

        NetEventDispatcher.addListener(NetEvent.S2CBagItems, this.S2CBagItems.bind(this))

    }

    init() {

        this.contect.removeAllChildren()
        for (let i = 0; i < 8; i++) {
            let render = cc.instantiate(this.renderPfb)
            render.parent = this.contect
            render.removeAllChildren()
            for (let j = 0; j < 4; j++) {
                let item = cc.instantiate(this.itemPfb)
                item.parent = render   
            }
        }

    }

    S2CBagItems(retObj){ 
        console.log(JSON.stringify(retObj))

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_PACK, true)
    }

    // update (dt) {}
}
