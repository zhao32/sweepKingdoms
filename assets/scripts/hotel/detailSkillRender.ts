// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.RichText)
    richLabel: cc.RichText = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    /**
     * 
     * @param data 技能数据
     * @param proficiency 熟练度
     * @param talents 熟练兵种
     */
    init(data, proficiency, talents) {
        this.nameLabel.string = data.name
        for (let i = 0; i < data.attribute.length; i++) {

        }

        // 三字奥义	熟练度减熟练度的10%	减去之后除以20		
        // 四字奥义	熟练度减熟练度的10%	减去之后除以18	减去之后除以40	
        // 五字奥义	熟练度减熟练度的10%	减去之后除以16.4	减去之后除以36	减去之后除以90
        let str = ''
        for (let i = 0; i < talents.length; i++) {
            str += DataManager.armList[talents[i]] + '兵';
            let plusStr = ''
            for (let j = 0; j < data.attribute.length; j++) {
                let skillAttr = DataManager.skillAttributeList[data.attribute[j]]
                let num = proficiency[i] * 0.9
                plusStr += skillAttr
                if (data.name.length == 2) {
                    if (j == 0) {
                        num = num / 21
                    }
                } else if (data.name.length == 3) {
                    if (j == 0) {
                        num = num / 20
                    }

                } else if (data.name.length == 4) {
                    if (j == 0) {
                        num = num / 18
                    } else if (j == 1) {
                        if (num / 18 > 40) {
                            num = num / 18 - 40
                        } else {
                            num = num / 18 / 2
                        }
                    }
                } else if (data.name.length == 5) {
                    if (j == 0) {
                        num = num / 16.4
                    } else if (j == 1) {
                        if (num / 16.4 > 36) {
                            num = num / 16.4 - 36
                        } else {
                            num = num / 16.4 / 2
                        }
                    } else if (j == 2) {
                        if (num / 16.4 > 36) {
                            num = (num / 16.4 - 36) / 90
                        } else {
                            num = (num / 16.4 / 2) / 90
                        }
                    }
                }

                plusStr = `${plusStr}+${num.toFixed(2)}`
                if (j != data.attribute.length - 1) {
                    plusStr += '，'
                }
            }
            str = `${str}：${plusStr}\n`
        }
        this.richLabel.string = str
    }

    // update (dt) {}
}
