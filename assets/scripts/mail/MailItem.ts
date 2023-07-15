// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AlertLayer from "../common/AlertLayer";
import DataManager from "../utils/Manager/DataManager";
import MailDetail from "./MailDetail";
import MailRewardItem from "./MailRewardItem";

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
    from: cc.Label = null

    @property(cc.Node)
    rewardContent: cc.Node = null

    @property(cc.Label)
    sendTime: cc.Label = null

    @property(cc.Sprite)
    beReadSprite: cc.Sprite = null

    @property(cc.Prefab)
    rewardItem: cc.Prefab = null

    @property(cc.SpriteFrame)
    mailFrames: cc.SpriteFrame[] = []

    _itemID: 0

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }




    init(pIndex) {
        this._itemID = pIndex;
        if (this._itemID >= DataManager.maillist.length) {
            this.node.active = false;
            return;
        } else {
            this.node.active = true;
        }
        var maildata = DataManager.maillist[this._itemID];
        this.sendTime.string = this._formatDate(maildata.create_time);
        if (maildata.is_read == 1) {//处理已读邮件
            this.node.getComponent(cc.Sprite).spriteFrame = this.mailFrames[3]//DataManager.wndMail.mailsprite[1];
            this.beReadSprite.spriteFrame = this.mailFrames[1]//DataManager.wndMail.mailsprite[0];
        } else if (maildata.is_read == 0) {
            this.node.getComponent(cc.Sprite).spriteFrame = this.mailFrames[2]//DataManager.wndMail.mailsprite[3];
            this.beReadSprite.spriteFrame = this.mailFrames[0]//DataManager.wndMail.mailsprite[2];
        }
        switch (maildata.mail_type) {
            case 0:
                this.title.string = maildata.title;
                this.from.string = maildata.send_name;
                break;
            case 1:
                var mailConfig = DataManager.GameData.Mail;
                var id = maildata.template_id;
                this.title.string = mailConfig[id].mail_title;
                this.from.string = mailConfig[id].sender;
                break;
        }
        //加入填充数据
        var lastType = -1;
        var count = 0;
        maildata.mailParamMsg.forEach(function (element) {
            if (element.type != lastType) {
                count = 0;
                lastType = element.type;
            } else {
                count++;
            }
            switch (element.type) {
                case 0://发件人
                    var str = this.from.string.replace("{" + count + "}", element.value);
                    this.from.string = str;
                    break;
                case 1://标题
                    var str = this.title.string.replace("{" + count + "}", element.value);
                    this.title.string = str;
                    break;
                case 2://内容
                    break;
                default:
                    break;
            }
        }, this);

        //更新奖励信息
        // GameUtils.destroyAllChildren(this.rewardContent);
        maildata.attach.forEach(function (element, count) {
            if (count >= 4) return;//最多显示4个奖励
            var newNode = cc.instantiate(this.rewardItem);
            this.rewardContent.addChild(newNode);
            newNode.getComponent(MailRewardItem).initData(element);
        }, this);
    }

    _formatDate(second) {
        var unixTimestamp = new Date(second * 1000);
        var date = unixTimestamp.getDate();
        var month = unixTimestamp.getMonth() + 1;
        var year = unixTimestamp.getFullYear();
        var str = year + "-" + month + "-" + date;
        //var commonTime = unixTimestamp.toLocaleDateString();
        return str;
    }

    deleteMailHandler(event) {

        if (DataManager.wndMail._isDeletingMail) {
            return;
        }
        var maildata = DataManager.maillist[this._itemID];
        if (maildata.attach != null && maildata.attach instanceof Array && maildata.attach.length > 0) {
            var _alert_layer = cc.instantiate(DataManager.Main.AlertLayer);
            cc.Canvas.instance.node.addChild(_alert_layer);
            _alert_layer.getComponent(AlertLayer).init("邮件中还有附件没有领取，\n是否继续删除？",
                function () {
                    DataManager.wndMail._isDeletingMail = true;
                    MyProtocols.send_C2SDelMail(DataManager._loginSocket, [maildata.mail_id]);//发送删除邮件数据请求
                    _alert_layer.destroy();
                });
        }
        else {
            DataManager.wndMail._isDeletingMail = true;
            MyProtocols.send_C2SDelMail(DataManager._loginSocket, [maildata.mail_id]);//发送删除邮件数据请求
        }
    }

    readMailHandler(event) {
        // SoundUtil.playBtnOpenEffect();//播放点击声音
        var maildata = DataManager.maillist[this._itemID];
        var newNode = cc.instantiate(DataManager.wndMail.mailDetail_prefab);
        cc.Canvas.instance.node.addChild(newNode);
        newNode.setPosition(0, 0);
        newNode.getComponent(MailDetail)._mailData = maildata;
        newNode.getComponent(MailDetail).fadeInStart();

        if (maildata.is_read == 0) {
            MyProtocols.send_C2SReadNewMailMsg(DataManager._loginSocket, maildata.mail_id);//发送读邮件邮件请求
        }
    }

    // update (dt) {}
}
