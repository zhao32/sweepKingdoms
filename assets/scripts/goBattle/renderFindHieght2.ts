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

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    lordLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        console.log(`data:`+JSON.stringify(data))
        let name = this.getName(data) //DataManager.mineData[data.group].name
        this.nameLabel.string = data.lv + '级' + name
        this.lordLabel.string = data.nickname ? `领主：${data.nickname}` : '领主：无'
        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)

    }

    getName(data) {
        let name: string
        if (data.group == 106) {
            if (data.country == 1) {
                //华夏遗迹
                name = '华夏遗迹'
            } else if (data.country == 4) {
                //蓬莱遗迹
                name = '蓬莱遗迹'
            } else if (data.country == 6) {
                //归墟遗迹
                name = '归墟遗迹'
            }
        } else if (data.group == 105) {
            if (data.country == 2) {
                //上古战场
                name = "上古战场"
            } else if (data.country == 7) {
                //财神庙
                name = "财神庙"
            }
        } else {
            name = DataManager.mineData[data.group].name
        }
        return name
    }


    // update (dt) {}
}
