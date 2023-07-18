// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Sprite, displayName: '士兵图片' })
    soliderFrame: cc.Sprite = null;

    @property({ type: cc.Label, displayName: '士兵名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '强化属性' })
    attributeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '强化条件' })
    premiseDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '战力' })
    powerDisplay: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        ResManager.loadItemIcon(`soliderHead/${data.name}`, this.soliderFrame.node)
        this.nameDisplay.string = `强化：`+ data.name
        // this.attributeDisplay.string = 
        let str = ''
        data.defense.attack_1 > 0 ? str += "挥砍攻击 " : ""
        data.defense.attack_2 > 0 ? str += "穿刺攻击 " : ""
        data.defense.attack_3 > 0 ? str += "法术攻击 " : ""

        data.defense.attack_4 > 0 ? str += "挥砍防御 " : ""
        data.defense.attack_5 > 0 ? str += "穿刺防御 " : ""
        data.defense.attack_6 > 0 ? str += "法术防御 " : ""

        // let tranArr = []
        // data.defense.attack_1 > 0 ? tranArr.push({ type: 1, name: "挥砍攻击" }) : tranArr = tranArr
        // data.defense.attack_2 > 0 ? tranArr.push({ type: 2, name: "穿刺攻击" }) : tranArr = tranArr
        // data.defense.attack_3 > 0 ? tranArr.push({ type: 3, name: "法术攻击" }) : tranArr = tranArr
        // data.defense.attack_4 > 0 ? tranArr.push({ type: 4, name: "挥砍防御" }) : tranArr = tranArr
        // data.defense.attack_5 > 0 ? tranArr.push({ type: 5, name: "穿刺防御" }) : tranArr = tranArr
        // data.defense.attack_6 > 0 ? tranArr.push({ type: 6, name: "法术防御" }) : tranArr = tranArr


        this.attributeDisplay.string = `主属性：` + str
        // this.挥砍攻击.string = `<color=#ffffff>挥砍攻击：</c><color=#0fffff>${data.defense.attack_1}</color>`
        // this.穿刺攻击.string = `<color=#ffffff>穿刺攻击：</c><color=#0fffff>${data.defense.attack_2}</color>`
        // this.法术攻击.string = `<color=#ffffff>法术攻击：</c><color=#0fffff>${data.defense.attack_3}</color>`

        // this.挥砍防御.string = `<color=#ffffff>挥砍防御：</c><color=#0fffff>${data.defense.attack_4}</color>`
        // this.穿刺防御.string = `<color=#ffffff>穿刺防御：</c><color=#0fffff>${data.defense.attack_5}</color>`
        // this.法术防御.string = `<color=#ffffff>法术防御：</c><color=#0fffff>${data.defense.attack_6}</color>`
    }




    // update (dt) {}
}
