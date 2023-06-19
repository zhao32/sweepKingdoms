// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    runePfb: cc.Prefab = null;


    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    open() {
        this.node.active = true
        // this.selectName = 0
        this.contect.removeAllChildren()
        for (let i = 0; i < DataManager.instance.curRuneList.length; i++) {
            let item = cc.instantiate(this.runePfb)
            item.parent = this.contect
            // ResManager.loadItemIcon(`hero/icon/${DataManager.GameData.Cards[i].name}`, item.getChildByName(`icon`))
            item.getChildByName('name').getComponent(cc.Label).string = DataManager.GameData.Cards[i].name
            // item.getChildByName('name').color = cc.Color.WHITE
            // item.getChildByName('light').active = false

            item.on(cc.Node.EventType.TOUCH_END, () => {
                for (let j = 0; j < this.contect.children.length; j++) {
                    let icon = this.contect.children[j]
                    // icon.getChildByName('light').active = false
                    // icon.getChildByName('name').color = cc.Color.WHITE
                }
                // item.getChildByName('light').active = true
                // item.getChildByName('name').color = cc.Color.YELLOW
            })
        }

    }

    onCancel() {
        this.node.active = false
    }

    onChange() {
        // if (!this.selectName) {
        //     ViewManager.instance.showToast(`请选择头像`)
        //     return
        // }
        // MyProtocols.send_C2SChangeIcon(DataManager._loginSocket, this.selectName)
    }

    // update (dt) {}
}
