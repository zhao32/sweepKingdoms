// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    curTemplateid = ``

    curNum = 0

    start() {
        let nameList = [`全能传承符`, `盾卫传承符`, `骑士传承符`, `弓手传承符`, `法师传承符`, `枪兵传承符`]
        let templateList = [`1066`, `1067`, `1068`, `1069`, `1070`, `1071`]



        for (let i = 0; i < nameList.length; i++) {
            ResManager.loadItemIcon(`UI/prop/${nameList[i]}`, this.node.getChildByName(nameList[i]))
            this.node.getChildByName(nameList[i]).on(cc.Node.EventType.TOUCH_END, () => {
                for (let j = 0; j < nameList.length; j++) {
                    this.node.getChildByName(nameList[j]).color = cc.Color.WHITE
                }
                this.node.getChildByName(nameList[i]).color = cc.Color.YELLOW
                this.curTemplateid = templateList[i]
                for (let k = 0; k < DataManager.instance.itemsList.length; k++) {
                    if (DataManager.instance.itemsList[k].template_id == this.curTemplateid) {
                        let data = DataManager.instance.itemsList[k]
                        for (let j = 0; j < templateList.length; j++) {
                            if (this.curTemplateid == templateList[k]) {
                                this.curNum = data.num
                            }
                        }
                    }
                }

            }, this)

        }



    }

    id
    list
    open(id, list) {
        this.id = id
        this.list = list
        this.curNum = 0
        this.node.active = true
        let nameList = [`全能传承符`, `盾卫传承符`, `骑士传承符`, `弓手传承符`, `法师传承符`, `枪兵传承符`]
        let templateList = [`1066`, `1067`, `1068`, `1069`, `1070`, `1071`]

        for (let i = 0; i < nameList.length; i++) {
            for (let j = 0; j < nameList.length; j++) {
                this.node.getChildByName(nameList[j]).color = cc.Color.WHITE
                this.node.getChildByName(nameList[i]).children[0].getComponent(cc.Label).string = `x${0}`

            }
        }

        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            if (DataManager.instance.itemsList[i].template_id == this.curTemplateid) {
                let data = DataManager.instance.itemsList[i]
                for (let j = 0; j < templateList.length; j++) {
                    if (this.curTemplateid == templateList[i]) {
                        this.node.getChildByName(nameList[i]).children[0].getComponent(cc.Label).string = `x${data.num}`
                    }
                }
            }
        }


        this.curTemplateid = ``
    }

    btnOk() {
        if (!this.curTemplateid) {
            ViewManager.instance.showToast(`请选择要使用的传承符`)
        } else {
            if (this.curNum) {
                MyProtocols.send_C2SCardAddLevel(DataManager._loginSocket, this.id, this.list, null, 1, this.curTemplateid)
                this.node.active = false
            } else {
                ViewManager.instance.showToast(`您不拥有该传承符，请选择其他，或在商店购买`)
            }
        }
    }

    btnChanel() {
        this.node.active = false
    }

    // update (dt) {}
}
