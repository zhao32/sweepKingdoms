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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    countLabel: cc.Label = null;

    @property(cc.RichText)
    richLabel: cc.RichText = null;

    @property(cc.Label)
    btnLabel0: cc.Label = null;

    @property(cc.Label)
    btnLabel1: cc.Label = null;

    @property(cc.Node)
    pic: cc.Node = null;

    start() {

    }

    // "4000": {
    //     "attrs": {
    //       "atk": 9
    //     },
    //     "name": "精兵铁剑",
    //     "require_level": 2,
    //     "id": 4000,
    //     "quality": 1,
    //     "icon": "4000.png",
    //     "des": "普通军械，生铁打造，略显笨拙。低阶步兵的进阶材料之一。"
    //   },

    // {"uuid":"","template_id":4100,"enhance_level":0,"stars":0,"num":148,"bagId":4,"hpEx":0,"atkEx":0,"defEx":0,"attrEx":[],"unitAttr":{"id":0,"num":0},"exp":0}
    _data
    init(data) {
        let defaultData
        this._data = data
        if (data.bagId == 4) {
            defaultData = DataManager.GameData.packItems[data.template_id]
            this.btnLabel0.string = `使用`
            this.btnLabel1.string = `出售`
        }

        if (!defaultData) return

        this.nameLabel.string = defaultData.name
        this.countLabel.string = 'x' + data.num
        this.richLabel.string = defaultData.des

        ResManager.loadItemIcon(`pack/${defaultData.id}`, this.pic)
    }

    btnHandler0() {
        if(this._data.bagId == 4){
            ViewManager.instance.showToast(`使用道具`)
        }


    }

    btnHandler1() {
        if(this._data.bagId == 4){
            ViewManager.instance.showToast(`卖出道具`)
            this.node.parent.getChildByName('sellPanel').active = true
        }
    }



    // update (dt) {}
}
