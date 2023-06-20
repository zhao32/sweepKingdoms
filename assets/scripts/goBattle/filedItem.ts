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
            let filed = DataManager.mineData[data.hold_player.group]
            this.icon.active = true
            this.bload.active = true

            if (data.hold_player.id) {//有主的矿
                ResManager.loadItemIcon(`goBattle/${filed.name}`, this.icon)
            } else {
                ResManager.loadItemIcon(`goBattle/${filed.name}`, this.icon)
                this.icon.color = cc.Color.GRAY
            }

            let str: string
            let name: string = data.hold_player.nickname
            this.nameLabel.string = data.hold_player.lv + '级' + filed.name + name.charAt(0) + name.charAt(1) + name.charAt(2) + '...'
        }


    }

    // update (dt) {}
}
