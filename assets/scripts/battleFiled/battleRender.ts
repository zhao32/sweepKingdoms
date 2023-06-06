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

    @property(cc.Label)
    idxLabel: cc.Label = null;

    @property(cc.Node)
    headNode: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    // "playerId":9953,"nickname":"肥胖的怀安浪子","sexId":0,"icon":0,"head_frame":1,"level":100,"fight":0,"vipLevel":0,"rank_change":0,"hero_count":0,"hero_stars":0,"win_count":0,"like_count":0}
    init(data, idx) {
        this.nameLabel.string = data.nickname
        this.idxLabel.string = `No.${idx}`

        if (data.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.headNode)
        } else if (data.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.headNode)
        }

    }

    // update (dt) {}
}
