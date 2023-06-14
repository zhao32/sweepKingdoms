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
        // 102： 重镇，  103：名城 ， 104 圣都 ， 105 特殊   ，106 遗迹    
        let filedData = {
            101: {
                name: "主城",
            },
            102: {
                name: "重镇",
            },
            103: {
                name: "名城",
            },
            104: {
                name: "圣都",
            },
            105: {
                name: "特殊",
            },
            106: {
                name: "遗迹",
            },
            0: {
                name: "",
            },
            1: {
                name: "魏国矿场",
            },
            2: {
                name: "燕国矿场",
            },
            3: {
                name: "秦国矿场",
            },
            4: {
                name: "赵国矿场",
            },
            5: {
                name: "齐国矿场",
            },
            6: {
                name: "韩国矿场",
            },
            7: {
                name: "楚国矿场",
            },
            8: {
                name: "农田",
            },
            9: {
                name: "金矿",
            },
        }
        if (!data.hold_player) {//城池
            this.icon.active = false
            this.bload.active = false
            this.nameLabel.string = ''

        } else {
            let filed = filedData[data.hold_player.group]
            this.icon.active = true
            this.bload.active = true

            if (data.hold_player.id) {
                ResManager.loadItemIcon(`goBattle/icon1`, this.icon)
            } else {
                ResManager.loadItemIcon(`goBattle/icon0`, this.icon)
            }

            let str: string
            let name: string = data.hold_player.nickname
            this.nameLabel.string = data.hold_player.lv + '级' + filed.name + name.charAt(0) + name.charAt(1) + name.charAt(2) + '...'
        }


    }

    // update (dt) {}
}
