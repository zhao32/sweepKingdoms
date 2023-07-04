// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    runePfb: cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {
        this.contect.removeAllChildren()

        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            let item = DataManager.instance.itemsList[i]
            if (item.bagId == 3 ) {

            }

        }
    }

    onCloseHandler() {
        this.node.active = false
    }

    onTeachHandler() {

    }

    // update (dt) {}
}
