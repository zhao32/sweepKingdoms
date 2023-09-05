// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import GameUtil from "../utils/Manager/GameUtil";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    typeNode: cc.Node = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    desLabel: cc.Label = null;

    @property({ type: cc.RichText, displayName: '生命' })
    生命: cc.RichText = null;

    @property({ type: cc.RichText, displayName: '射程' })
    射程: cc.RichText = null;

    @property({ type: cc.RichText, displayName: '暴击' })
    暴击: cc.RichText = null;

    @property({ type: cc.RichText, displayName: '韧性' })
    韧性: cc.RichText = null;

    @property({ type: cc.RichText, displayName: '挥砍攻击' })
    挥砍攻击: cc.RichText = null;

    @property({ type: cc.RichText, displayName: '穿刺攻击' })
    穿刺攻击: cc.RichText = null;

    @property({ type: cc.RichText, displayName: '法术攻击' })
    法术攻击: cc.RichText = null;

    @property({ type: cc.RichText, displayName: '挥砍防御' })
    挥砍防御: cc.RichText = null;

    @property({ type: cc.RichText, displayName: '穿刺防御' })
    穿刺防御: cc.RichText = null;

    @property({ type: cc.RichText, displayName: '法术防御' })
    法术防御: cc.RichText = null;

    @property({ type: cc.Label, displayName: '出征消耗' })
    出征消耗: cc.Label = null;

    @property({ type: cc.Label, displayName: '驻防消耗' })
    驻防消耗: cc.Label = null;





    // onLoad () {}

    start() {
        this.node.getChildByName('mask').on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.hideNote(EnumManager.viewPath.NOTE_SOLIDER, true)
        }, this)
    }

    onClose() {

    }

    init(data, cardData?: any) {
        // this.noteLabel.string = str
        // let str = `兵种名称  ${data.name}  兵种国籍  ${DataManager.countyList[data.country]}\n挥砍攻击  ${data.defense.attack_1} 穿刺攻击  ${data.defense.attack_2}\n法术攻击  ${data.defense.attack_3} 挥砍防御  ${data.defense.attack_4}\n穿刺防御  ${data.defense.attack_5} 法术防御  ${data.defense.attack_6}`

        ResManager.loadItemIcon(`soliderHead/${data.name}`, this.head)
        ResManager.loadItemIcon(`hero/soldierType${data.arm}`, this.typeNode)

        this.nameLabel.string = data.name
        this.desLabel.string = data.describe
        this.生命.string = `<color=#ffffff>生命：</c><color=#0fffff>${data.attr.addition_1}</color>`
        this.射程.string = `<color=#ffffff>射程：</c><color=#0fffff>${data.attr.addition_2}</color>`
        this.暴击.string = `<color=#ffffff>暴击：</c><color=#0fffff>${data.attr.addition_3}</color>`
        this.韧性.string = `<color=#ffffff>韧性：</c><color=#0fffff>${data.attr.addition_3}</color>`
        this.挥砍攻击.string = `<color=#ffffff>挥砍攻击：</c><color=#0fffff>${data.defense.attack_1}</color>`
        this.穿刺攻击.string = `<color=#ffffff>穿刺攻击：</c><color=#0fffff>${data.defense.attack_2}</color>`
        this.法术攻击.string = `<color=#ffffff>法术攻击：</c><color=#0fffff>${data.defense.attack_3}</color>`

        this.挥砍防御.string = `<color=#ffffff>挥砍防御：</c><color=#0fffff>${data.defense.attack_4}</color>`
        this.穿刺防御.string = `<color=#ffffff>穿刺防御：</c><color=#0fffff>${data.defense.attack_5}</color>`
        this.法术防御.string = `<color=#ffffff>法术防御：</c><color=#0fffff>${data.defense.attack_6}</color>`

        this.出征消耗.string = 'x' + data.consume.battle + `/次`
        this.驻防消耗.string = 'x' + data.consume.garrison + `/时`

        if (cardData) {
            console.log(`cardData:` + JSON.stringify(cardData))
            let adds = GameUtil.instance.skillstBaseAdd(cardData)
            if (adds[data.arm - 1].attack_1 > 0) {
                this.挥砍攻击.string += `+${adds[data.arm - 1].attack_1}`
            }
            if (adds[data.arm - 1].attack_2 > 0) {
                this.穿刺攻击.string += `+${adds[data.arm - 1].attack_2}`
            }
            if (adds[data.arm - 1].attack_3 > 0) {
                this.法术攻击.string += `+${adds[data.arm - 1].attack_3}`
            }
            if (adds[data.arm - 1].attack_4 > 0) {
                this.挥砍防御.string += `+${adds[data.arm - 1].attack_4}`
            }
            if (adds[data.arm - 1].attack_5 > 0) {
                this.穿刺防御.string += `+${adds[data.arm - 1].attack_5}`
            }
            if (adds[data.arm - 1].attack_6 > 0) {
                this.法术防御.string += `+${adds[data.arm - 1].attack_6}`
            }
        }


    }

    // update (dt) {}
}
