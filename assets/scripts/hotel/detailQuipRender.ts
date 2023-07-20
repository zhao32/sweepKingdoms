// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AlertLayer from "../common/AlertLayer";
import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";
import equipPutPanel from "./equipPutPanel";


//@ts-ignore
var MyProtocols = require("MyProtocols");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    displayLabel: cc.Label = null;
    data

    idx

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let data = this.data
        let idx = this.idx

        this.node.getChildByName('equipBg').on(cc.Node.EventType.TOUCH_END, () => {
            // data.equips[idx] = 1
            if (data.equips[idx] == "0") {
                DataManager.wndHotelDetail.node.getChildByName('equipPutPanel').getComponent(equipPutPanel).open(data, idx)
            } else {
                var _alert_layer = cc.instantiate(DataManager.Main.AlertLayer);
                cc.Canvas.instance.node.addChild(_alert_layer);
                _alert_layer.getComponent(AlertLayer).init("是否遗忘此装备？",
                    function () {
                        MyProtocols.send_C2SCardTakeOffItem(DataManager._loginSocket, data.id, idx);//发送删除邮件数据请求
                        _alert_layer.destroy();
                    });
            }
        }, this)

    }

    init(idx, data) {
        this.idx = idx

        this.data = data
        this.node.getChildByName("equip").active = false
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            if (DataManager.instance.itemsList[i].uuid == data.equips[idx]) {
                let template_id = DataManager.instance.itemsList[i].template_id
                let defaultData = DataManager.GameData.Equips[template_id]
                this.node.getChildByName("equip").active = true
                this.node.getChildByName("equip").scale = 1.5
                ResManager.loadItemIcon(`UI/equips/${defaultData.name}`, this.node.getChildByName("equip"))
                this.nameLabel.string = defaultData.name
                this.displayLabel.string = defaultData.des

            }

        }

    }

    // update (dt) {}
}
