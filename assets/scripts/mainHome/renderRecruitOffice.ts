// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: '名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '描述' })
    describeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '价格' })
    priceDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '战力' })
    powerDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '购买条件' })
    premiseDisplay: cc.Label = null;

    @property(cc.Sprite)
    soldierSprite: cc.Sprite = null;

    @property({ type: cc.Node, displayName: '头像' })
    head: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        console.error(JSON.stringify(data))
        this.nameDisplay.string = data.name
        this.describeDisplay.string = data.describe
        if (data.state == 0) {
            this.premiseDisplay.string = '招募条件'
            this.node.getChildByName('price').active = false

        } else if (data.state == 1) {
            this.premiseDisplay.string = ''
            this.node.getChildByName('price').active = true
            this.priceDisplay.string = `x${data.price}`
        }
        this.powerDisplay.string = `x${data.defense.attack_1 + data.defense.attack_2 + data.defense.attack_3}`
        ResManager.loadItemIcon(`soliderHead/${data.name}`, this.soldierSprite.node)

        this.head.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES)
        }, this)

    }

    // update (dt) {}
}
