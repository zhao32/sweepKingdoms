// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EventManager from "../utils/Manager/EventManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    headPfb: cc.Prefab = null;

    selectName

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CChangeIcon, this.S2CChangeIcon,this)

    }

    S2CChangeIcon(data) {
        console.log(`修改头像返回`)
        ViewManager.instance.showToast(`更改头像成功`)
        console.log(JSON.stringify(data))
        // {"iconId":32}
        DataManager.playData.icon = data.iconId
        EventManager.getInstance().sendListener(EventManager.UPDATE_MAINHOME_INFO)
        this.node.active = false
    }

    open() {
        this.selectName = 0
        this.contect.removeAllChildren()
        for (let i = 27; i <= 68; i++) {
            let item = cc.instantiate(this.headPfb)
            item.parent = this.contect
            ResManager.loadItemIcon(`hero/icon/${DataManager.GameData.Cards[i].name}`, item.getChildByName(`icon`))
            item.getChildByName('name').getComponent(cc.Label).string = DataManager.GameData.Cards[i].name
            item.getChildByName('name').color = cc.Color.WHITE
            item.getChildByName('light').active = false

            item.on(cc.Node.EventType.TOUCH_END, () => {
                for (let j = 0; j < this.contect.children.length; j++) {
                    let icon = this.contect.children[j]
                    icon.getChildByName('light').active = false
                    icon.getChildByName('name').color = cc.Color.WHITE
                }
                item.getChildByName('light').active = true
                item.getChildByName('name').color = cc.Color.YELLOW
                this.selectName = i
            })
        }

    }

    onCancel() {
        this.node.active = false
    }

    onChange() {
        if (!this.selectName) {
            ViewManager.instance.showToast(`请选择头像`)
            return
        }
        MyProtocols.send_C2SChangeIcon(DataManager._loginSocket, this.selectName)
    }

    // update (dt) {}
}
