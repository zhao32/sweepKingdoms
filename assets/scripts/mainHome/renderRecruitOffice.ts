// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
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

    @property({ type: cc.Label, displayName: '已有兵力' })
    hasTroopsDisplay: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        // console.error(JSON.stringify(data))
        this.nameDisplay.string = data.name
        this.describeDisplay.string = data.describe
        // if (data.state == 0) {
        //     this.premiseDisplay.string = '招募条件'
        //     this.node.getChildByName('price').active = false

        // } else if (data.state == 1) {
        //     this.premiseDisplay.string = ''
        //     this.node.getChildByName('price').active = true
        //     this.priceDisplay.string = `x${data.price}`
        // }
        this.premiseDisplay.string = ''
        this.node.getChildByName('price').active = true
        this.priceDisplay.string = `x${data.price}`

        if (data.idx >= 13) {
            this.node.getChildByName('price').active = false
            this.premiseDisplay.string = '不可在此招募'
        }

        this.powerDisplay.string = `x${data.defense.attack_1 + data.defense.attack_2 + data.defense.attack_3}`
        ResManager.loadItemIcon(`soliderHead/${data.name}`, this.soldierSprite.node)
        this.hasTroopsDisplay.string = `已拥有：` + String(DataManager.playData.military_data[data.idx - 1])


        // {"arm":1,"country":0,"restrain":4,"icon":"","name":"盾兵","attr":{"addition_1":1,"addition_2":10,"addition_3":220,"addition_4":110,"addition_5":10,"addition_6":5},"defense":{"attack_1":60,"attack_2":0,"attack_3":0,"attack_4":50,"attack_5":90,"attack_6":0},"consume":{"battle":0.04,"garrison":0},"state":1,"price":3,"describe":"擅长使用矩阵防御技能（防御增强），克制【弓兵】"}

        // "defense": {
        //     "attack_1": 60,  挥砍攻击	
        //     "attack_2": 0, 穿刺攻击	
        //     "attack_3": 0, 法术攻击	
        //     "attack_4": 50, 挥砍防御	
        //     "attack_5": 90, 穿刺防御	
        //     "attack_6": 0 法术防御
        //   },
        let str = DataManager.getSoliderDes(data)
        this.head.on(cc.Node.EventType.TOUCH_END, () => {
            // ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_SOLIDER, ...[data])

        }, this)

    }

    // update (dt) {}
}
