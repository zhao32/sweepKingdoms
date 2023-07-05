// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import detailSkillStBookRender from "./detailSkillStBookRender";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    skBookPfb: cc.Prefab = null;

    @property(cc.Label)
    tipLabel: cc.Label = null;

    idx
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    // "skills_equips":[{"id":0,"level":0,"type":2},{"id":0,"level":0,"type":1},{"id":0,"level":0,"type":2}]
    init(data, idx) {
        this.contect.removeAllChildren()
        this.idx = idx
        let skillStList = []
        for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
            let item = DataManager.instance.itemsList[i]
            if (item.bagId == 3) {
                let skillSt = DataManager.GameData.SkillStudy[item.template_id]
                if (skillSt.type == data.type) {
                    skillStList.push(skillSt)
                }
            }
        }

        if (skillStList.length == 0) {
            this.tipLabel.string = `暂无可学习技能`
        } else {
            this.tipLabel.string = ``
            for (let i = 0; i < skillStList.length; i++) {
                let render = cc.instantiate(this.skBookPfb)
                render.parent = this.contect
                render.getComponent(detailSkillStBookRender).init(skillStList[i],this.idx)
            }
        }

        console.log('skillStList:' + JSON.stringify(skillStList))
    }

    onCloseHandler() {
        this.node.active = false
    }

    onTeachHandler() {

    }

    // update (dt) {}
}
