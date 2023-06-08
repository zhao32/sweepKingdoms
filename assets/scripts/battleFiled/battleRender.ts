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
    idxLabel: cc.Label = null;

    @property(cc.Node)
    headNode: cc.Node = null;

    @property(cc.Sprite)
    bgSprite: cc.Sprite = null;

    @property(cc.SpriteFrame)
    bgFrame: cc.SpriteFrame[] = [];

    @property(cc.Node)
    generalHead0: cc.Node = null;

    @property(cc.Node)
    generalHead1: cc.Node = null;

    @property(cc.Node)
    generalHead2: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    // {"playerId":9971,"nickname":"内向的谯郡狱卒","sexId":1,"icon":1,"head_frame":1,"level":22,"fight":0,"vipLevel":0,"rank_change":0,"hero_count":10,"hero_stars":0,"win_count":0,"like_count":0,"card":[0,0,0]}
    init(data, idx) {
        this.nameLabel.string = data.nickname
        this.idxLabel.string = `No.${idx}`

        if (data.playerId == DataManager.playData.id) {
            this.bgSprite.spriteFrame = this.bgFrame[1]
        } else {
            this.bgSprite.spriteFrame = this.bgFrame[0]
        }

        if (data.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.headNode)
        } else if (data.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.headNode)
        }

        if (data.card[0] == 0) {
            this.generalHead0.parent.active = false
        } else {

        }

        if (data.card[1] == 0) {
            this.generalHead1.parent.active = false
        } else {

        }

        if (data.card[2] == 0) {
            this.generalHead2.parent.active = false
        } else {

        }

    }

    // update (dt) {}
}
