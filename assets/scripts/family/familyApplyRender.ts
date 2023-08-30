// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AlertLayer from "../common/AlertLayer";
import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: "昵称" })
    labelName: cc.Label = null;

    @property({ type: cc.Label, displayName: "级别" })
    labelLv: cc.Label = null;

    @property({ type: cc.Label, displayName: "玩家id" })
    labelID: cc.Label = null;

    @property({ type: cc.Node, displayName: "头像" })
    icon: cc.Node = null;


    data



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    //{"icon":10001,"playerName":"冰雪的宁夏壮士","playerId":79,"playerLv":0,"state":1,"contribution":0,"reputation":0}
    init(data) {
        this.labelName.string = `昵称：${data.playerName}`
        this.labelID.string = `ID:${data.playerId}`
        this.labelLv.string = `Lv:${data.playerLv}`
        this.data = data

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

    // C2SExamineEnterFamily

    agreeHandler() {
        // MyProtocols.send_C2SExamineEnterFamily(DataManager._loginSocket,this.data.playerId,)
        //打开复核窗口
        let self = this
        var _alert_layer = cc.instantiate(DataManager.Main.AlertLayer);
        cc.Canvas.instance.node.addChild(_alert_layer);
        _alert_layer.getComponent(AlertLayer).init("是否同意玩家的入会申请？",
            function () {
                MyProtocols.send_C2SExamineEnterFamily(DataManager._loginSocket, self.data.playerId, 0);
                _alert_layer.destroy();
            })
    }

    disAgreeHandler() {
        let self = this
        var _alert_layer = cc.instantiate(DataManager.Main.AlertLayer);
        cc.Canvas.instance.node.addChild(_alert_layer);
        _alert_layer.getComponent(AlertLayer).init("是否拒绝玩家的入会申请\n并删除此申请？",
            function () {
                MyProtocols.send_C2SExamineEnterFamily(DataManager._loginSocket, self.data.playerId, 0);
                _alert_layer.destroy();
            })
    }
    // update (dt) {}
}
