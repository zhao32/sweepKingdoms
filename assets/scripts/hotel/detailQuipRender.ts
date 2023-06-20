// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import equipPutPanel from "./equipPutPanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    displayLabel: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(idx, data) {

        this.node.getChildByName('equipBg').on(cc.Node.EventType.TOUCH_END, () => {
            DataManager.wndHotelDetail.node.getChildByName('equipPutPanel').getComponent(equipPutPanel).open(data, idx)
        }, this)


    }

    // update (dt) {}
}
