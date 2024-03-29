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

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    bload: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // {
    // 	"hold_player": {
    // 		"id": 0,
    // 		"nickname": "",
    // 		"level": 0,
    // 		"icon": 0,
    // 		"head_frame_id": 0,
    // 		"fight": 0,
    // 		"cd_time": 0,
    // 		"group": 0,
    // 		"lv": 0
    // 	}
    // }



    init(data) {

        if (!data.hold_player) {//城池
            this.icon.active = false
            this.bload.active = false
            this.nameLabel.string = ''
        } else {
            let filedName = DataManager.getName(data.hold_player) //DataManager.mineData[data.hold_player.group]
            this.icon.active = true
            this.bload.active = true

            if (data.hold_player.id) {//有主的矿
                ResManager.loadItemIcon(`goBattle/${filedName}`, this.icon)
            } else {
                ResManager.loadItemIcon(`goBattle/${filedName}`, this.icon)
                this.icon.color = cc.Color.GRAY
            }

            let str: string
            let name: string = data.hold_player.nickname
            if (data.hold_player.group >= 101) {

                if (filedName == '主城') {
                    this.nameLabel.string = name
                } else {
                    this.nameLabel.string = filedName + name.charAt(0) + '...'
                }
            } else {
                if (data.hold_player.bulidLv == 0) {
                    this.nameLabel.string = `未建造` + data.hold_player.lv + "级" + filedName + name.charAt(0) + '...'
                } else {
                    let lvList = ["微型", "小型", "中型", "大型", "巨型"]
                    this.nameLabel.string = data.hold_player.lv + "级" + lvList[data.hold_player.bulidLv - 1] + name.charAt(0) + '...'
                }
            }
            if (!data.hold_player.id) {
                this.nameLabel.string = data.hold_player.lv + `级` + filedName
            }
        }
    }

    // update (dt) {}
}
