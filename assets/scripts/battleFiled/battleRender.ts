// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

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

        let honer = Math.max(365, Math.floor(15000 * Math.pow(1 - 0.01, idx - 1)))
        this.node.getChildByName('honer').getComponent(cc.Label).string = `x${honer} \n 每10分钟`


        if (data.playerId == DataManager.playData.id) {
            this.bgSprite.spriteFrame = this.bgFrame[1]
        } else {
            this.bgSprite.spriteFrame = this.bgFrame[0]
        }

        if (data.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.headNode)
        } else if (data.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.headNode)
        } else {
            let defaultData = DataManager.GameData.Cards[data.icon]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.headNode)
        }

        if (data.card[0] == 0) {
            this.generalHead0.parent.active = false
        } else {
            let defaultData = DataManager.GameData.Cards[data.card[0]]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.generalHead0)

            // this.generalHead0.on(cc.Node.EventType.TOUCH_END, () => {
            //     let str = DataManager.getGeneralDes(data.card[0].template_id, data.card[0].id)
            //     ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
            // }, this)
        }

        if (data.card[1] == 0) {
            this.generalHead1.parent.active = false
        } else {
            let defaultData = DataManager.GameData.Cards[data.card[1]]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.generalHead1)

            // this.generalHead1.on(cc.Node.EventType.TOUCH_END, () => {
            //     let str = DataManager.getGeneralDes(data.card[1].template_id, data.card[1].id)
            //     ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
            // }, this)
        }

        if (data.card[2] == 0) {
            this.generalHead2.parent.active = false
        } else {
            let defaultData = DataManager.GameData.Cards[data.card[2]]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.generalHead2)

            // this.generalHead2.on(cc.Node.EventType.TOUCH_END, () => {
            //     let str = DataManager.getGeneralDes(data.card[2].template_id, data.card[2].id)
            //     ViewManager.instance.showNote(EnumManager.viewPath.NOTE_DES, ...[str])
            // }, this)
        }

    }

    // update (dt) {}
}
