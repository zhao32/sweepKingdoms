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

    @property({ type: cc.Label, displayName: "昵称" })
    labelName: cc.Label = null;

    @property({ type: cc.Label, displayName: "职务" })
    labelDuties: cc.Label = null;

    @property({ type: cc.Label, displayName: "贡献度" })
    labelContribute: cc.Label = null;

    @property({ type: cc.Label, displayName: "级别" })
    labelLv: cc.Label = null;

    @property({ type: cc.Label, displayName: "声望" })
    labelReputation: cc.Label = null;

    @property({ type: cc.Node, displayName: "头像" })
    icon: cc.Node = null;





    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    //{"icon":10001,"playerName":"冰雪的宁夏壮士","playerId":79,"playerLv":0,"state":1,"contribution":0,"reputation":0}
    init(data) {
        this.labelName.string = `昵称：${data.playerName}`
        // this.labelDuties.string = 
        this.labelContribute.string = `贡献度：${data.contribution}`
        this.labelLv.string = `LV：${data.playerLv}`
        this.labelReputation.string = `声望：${data.reputation}`
        // 1 族长 2 精英  3 普通
        let duties = ['', '族长', '精英', '普通']
        this.labelDuties.string = `职位：` + duties[data.runk]
        if (data.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.icon)
        } else if (data.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.icon)
        } else {
            let defaultData = DataManager.GameData.Cards[data.icon]
            if (defaultData) {
                ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.icon)
            }
        }

    }

    // update (dt) {}
}
