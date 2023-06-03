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
                    this.contect.removeAllChildren()
                    let list = this[`list${i + 1}`]
                    for (let j = 0; j < list.length; j++) {
                        let render = cc.instantiate(this.renderPfb)
                        render.removeAllChildren()
                        render.parent = this.contect
                        for (let k = 0; k < list[j].length; k++) {
                            let item = cc.instantiate(this.itemPfb)
                            item.parent = render
                        }
                    }
                }
            }, this)
        }
        MyProtocols.send_C2SBagItems(DataManager._loginSocket)

        NetEventDispatcher.addListener(NetEvent.S2CBagItems, this.S2CBagItems.bind(this))

    }

    init() {
        // this.contect.removeAllChildren()
        // for (let i = 0; i < 8; i++) {
        //     let render = cc.instantiate(this.renderPfb)
        //     render.parent = this.contect
        //     render.removeAllChildren()
        //     for (let j = 0; j < 4; j++) {
        //         let item = cc.instantiate(this.itemPfb)
        //         item.parent = render
        //     }
        // }
    }
    list1 = []
    list2 = []
    list3 = []
    list4 = []
    S2CBagItems(retObj) {
        console.log(JSON.stringify(retObj))

        this.contect.removeAllChildren()
        for (let i = 0; i < retObj.item_list.length; i++) {
            if (retObj.item_list[i].bagId == 1) {
                this.list1.push(retObj.item_list[i])
            } else if (retObj.item_list[i].bagId == 2) {
                this.list2.push(retObj.item_list[i])
            } else if (retObj.item_list[i].bagId == 3) {
                this.list3.push(retObj.item_list[i])
            } else if (retObj.item_list[i].bagId == 4) {
                this.list4.push(retObj.item_list[i])
            }
        }

        this.list1 = DataManager.group(this.list1, 4)
        this.list2 = DataManager.group(this.list2, 4)
        this.list3 = DataManager.group(this.list3, 4)
        this.list4 = DataManager.group(this.list4, 4)

        for (let i = 0; i < this.list1.length; i++) {
            let render = cc.instantiate(this.renderPfb)
            render.removeAllChildren()
            render.parent = this.contect
            for (let j = 0; j < this.list1[i].length; j++) {
                let item = cc.instantiate(this.itemPfb)
                item.parent = render
            }
        }

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_PACK, true)
        NetEventDispatcher.removeListener(NetEvent.S2CBagItems, this.S2CBagItems.bind(this))

    }

    // update (dt) {}
}
