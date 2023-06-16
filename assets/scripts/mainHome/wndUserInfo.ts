// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ViewManager from "../utils/Manager/ViewManager";
import headChangePanel from "./headChangePanel";
import nameChangePanel from "./nameChangePanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    vipLabel: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    fightLabel: cc.Label = null;

    @property(cc.Label)
    expLabel: cc.Label = null;


    @property(cc.Label)
    levelLabel: cc.Label = null;

    @property(cc.Label)
    playerIdLabel: cc.Label = null;

    @property(cc.Label)
    accountLabel: cc.Label = null;

    @property(cc.Node)
    headPanel: cc.Node = null;

    @property(cc.Node)
    namePanel: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init() {
        this.headPanel.active = false
        this.namePanel.active = false

        this.vipLabel.string = String(DataManager.playData.vip_level)
        this.nameLabel.string = DataManager.playData.name
        this.fightLabel.string = String(DataManager.playData.troops)
        this.levelLabel.string = 'x' + DataManager.playData.level
        this.playerIdLabel.string = String(DataManager.playData.id)
        this.accountLabel.string = String(DataManager.playData.account_id)
        this.expLabel.string = String(DataManager.playData.level_exp)

    }

    onChangeNameHandler() {
        this.namePanel.active = true
        this.namePanel.getComponent(nameChangePanel).open()
    }

    onChangeHeadHandler() {
        this.headPanel.active = true
        this.headPanel.getComponent(headChangePanel).open()
    }

    onBackHanlder() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }

    onClose() {

    }

    // update (dt) {}
}
