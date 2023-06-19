// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    runePfb: cc.Prefab = null;


    @property(cc.Label)
    noteDisplay: cc.Label = null;




    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    // {"uuid":"","template_id":5001,"enhance_level":0,"stars":0,"num":452,"bagId":4,"hpEx":0,"atkEx":0,"defEx":0,"attrEx":[],"unitAttr":{"id":0,"num":0},"exp":0}
    open() {
        this.node.active = true
        // this.selectName = 0
        this.noteDisplay.string = ''
        this.contect.removeAllChildren()
        for (let i = 0; i < DataManager.instance.curRuneList.length; i++) {
            let item = cc.instantiate(this.runePfb)
            item.parent = this.contect
            ResManager.loadItemIcon(`Rune/${DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].icon}`, item.getChildByName(`icon`))
            item.getChildByName('count').getComponent(cc.Label).string = 'x' + DataManager.instance.curRuneList[i].num
            let lv = parseInt(DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].quality) + 1

            item.getChildByName('level').getComponent(cc.Label).string = 'lv:' + lv
            item.getChildByName('count').color = cc.Color.WHITE
            item.getChildByName('level').color = cc.Color.WHITE

            item.getChildByName('light').active = false

            item.on(cc.Node.EventType.TOUCH_END, () => {
                for (let j = 0; j < this.contect.children.length; j++) {
                    let icon = this.contect.children[j]
                    icon.getChildByName('light').active = false
                    icon.getChildByName('count').color = cc.Color.WHITE
                    icon.getChildByName('level').color = cc.Color.WHITE
                }
                item.getChildByName('light').active = true

                item.getChildByName('count').color = cc.Color.YELLOW
                item.getChildByName('level').color = cc.Color.YELLOW
                this.noteDisplay.string = DataManager.GameData.Runes[DataManager.instance.curRuneList[i].template_id].name

            })
        }
    }

    onCloseHandler() {
        this.node.active = false
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
