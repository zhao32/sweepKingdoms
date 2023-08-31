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
    coinLabel: cc.Label = null;

    @property(cc.Label)
    foodLabel: cc.Label = null;

    @property(cc.Label)
    fightLabel: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        console.log(`data:` + JSON.stringify(data))
        // data:{"hold_player":{"id":0,"nickname":"","level":0,"icon":0,"head_frame_id":0,"fight":0,"cd_time":0,"group":101,"lv":0,"page":25,"idx":12,"country":7,"reward":10000}}
        this.nameLabel.string = data.hold_player.nickname == '' ? '未被占领' + ` ` + `(` + data.hold_player.page + `,` + data.hold_player.idx + `)` : `${data.hold_player.nickname}` + ` ` + `(` + data.hold_player.page + `,` + data.hold_player.idx + `)`
        // this.foodLabel.string = data.hold_player.nickname
        let name = DataManager.mineData[data.hold_player.group].name
        this.coinLabel.string = data.hold_player.reward
        this.fightLabel.string = `兵力：` + data.hold_player.fight

        // + ` ` + `(` + data.page + `,` + data.idx + `)`
        ResManager.loadItemIcon(`goBattle/${name}`, this.icon)

    }

    // update (dt) {}
}
