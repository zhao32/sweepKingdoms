// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AlertLayer from "../common/AlertLayer";
import DataManager from "../utils/Manager/DataManager";
import boxItem from "./boxItem";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null

    @property(cc.Label)
    content: cc.Label = null
    @property(cc.Node)
    rewardContent: cc.Node = null
    @property(cc.Prefab)
    itemBox_prefab: cc.Prefab = null
    @property(cc.Node)
    panel_node: cc.Node = null
    @property(cc.Button)
    btn_node: cc.Button = null
    @property(cc.Label)
    btn_label: cc.Label = null

    _mailData = null
    _isRuningAction = false
    _btnType = 0

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    initData(maildata) {
        console.log('maildata:' + JSON.stringify(maildata))
        this._mailData = maildata;
        switch (maildata.mail_type) {
            case 0:
                this.title.string = maildata.title;
                this.content.string = maildata.content;
                break;
            case 1:
                var mailConfig = DataManager.GameData.Mail;
                var id = maildata.template_id;
                this.title.string = mailConfig[id].mail_title;
                this.content.string = mailConfig[id].mail_content;
                break;
        }

        //加入填充数据
        var lastType = -1;
        var count = 0;
        var self = this;
        maildata.mailParamMsg.forEach(function (element) {
            if (element.type != lastType) {
                count = 0;
                lastType = element.type;
            } else {
                count++;
            }
            switch (element.type) {
                case 0://发件人
                    break;
                case 1://标题
                    var str = self.title.string.replace("{" + count + "}", element.value);
                    self.title.string = str;
                    break;
                case 2://内容
                    var str = self.content.string.replace("{" + count + "}", element.value);
                    self.content.string = str;
                    break;
                default:
                    break;
            }
        }, this);


        this.createReward(maildata.attach);

        if (maildata.attach.length == 0 || maildata.attach == null) {
            // this.btn_label.string=i18n.t('1110');
            this.btn_label.string = '删除'
            this._btnType = 1;
        } else {
            this._btnType = 0;
        }
    }
    createReward(list) {
        var self = this;
        list.forEach(function (element) {
            var newNode = cc.instantiate(self.itemBox_prefab);
            newNode.y = 0
            self.rewardContent.addChild(newNode);
            newNode.getComponent(boxItem).init(element)
            // newNode.getComponent('ItemBox').ChangeItemInfo(element.itemId, element.cnt, true, null, true);
        }, this);
    }

    getRewardHandler(event) {
        // var rewardPanel=cc.instantiate(MailPanelManager.getInstance().getRewardPanel_prefab);
        // cc.Canvas.instance.node.addChild(rewardPanel);
        // rewardPanel.getComponent('GetRewardPanel')._itemlist=(this._mailData.attach);

        switch (this._btnType) {//0接受，1删除
            case 0:
                if (this._mailData.attach.length > 0) {
                    MyProtocols.send_C2SGetAttach(DataManager._loginSocket, this._mailData.mail_id);//发送领取奖励请求
                }
                break;
            case 1:
                // SoundUtil.playBtnOpenEffect();//播放点击声音
                if (DataManager.wndMail._isDeletingMail) {
                    return;
                }
                if (this._mailData.attach != null && this._mailData.attach instanceof Array && this._mailData.attach.length > 0) {
                    var self = this;
                    var _alert_layer = cc.instantiate(DataManager.Main.AlertLayer);
                    cc.Canvas.instance.node.addChild(_alert_layer);
                    _alert_layer.getComponent(AlertLayer).init("邮件中还有附件没有领取，\n是否继续删除？",
                        function () {
                            DataManager.wndMail._isDeletingMail = true;
                            MyProtocols.send_C2SDelMail(DataManager._loginSocket, [self._mailData.mail_id]);//发送删除邮件数据请求
                            _alert_layer.destroy();
                        })
                } else {
                    DataManager.wndMail._isDeletingMail = true;
                    MyProtocols.send_C2SDelMail(DataManager._loginSocket, [this._mailData.mail_id]);//发送删除邮件数据请求
                }
                break;
            default:
                break;
        }
    }


    fadeInStart() {
        this._isRuningAction = true;
        this.initData(this._mailData);
        this.panel_node.scale = 0.5;
        var action = cc.scaleTo(0.2, 1);
        var finish = cc.callFunc(this._fadeInComplete, this);
        action = cc.sequence(action, finish);
        this.panel_node.runAction(action);
    }

    _fadeInComplete() {
        this._isRuningAction = false;
        //this.initData(this._mailData);
    }

    fadeOutStart() {
        //SoundUtil.playBtnOpenEffect();//播放点击声音
        if (this._isRuningAction) return;
        this._isRuningAction = true;
        this.panel_node.stopAllActions();
        var action = cc.scaleTo(0.2, 0.5);
        var finish = cc.callFunc(this._fadeOutComplete, this);
        action = cc.sequence(action, finish);
        this.panel_node.runAction(action);
    }

    _fadeOutComplete() {
        this._isRuningAction = false;
        this.backHandler();
    }

    backHandler() {
        this.node.removeFromParent();
        this.node.destroy();
    }

    // update (dt) {}
}
