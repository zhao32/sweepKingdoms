// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import GetRewardPanel from "./GetRewardPanel";
import MailItem from "./MailItem";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    pfb: cc.Prefab = null;
    @property(cc.Prefab)
    mailDetail_prefab = null
    @property(cc.Prefab)
    getRewardPanel_prefab

    _isDeletingMail: boolean = false
    // onLoad () {}

    start() {

    }

    init() {
        MyProtocols.send_C2SListMail(DataManager._loginSocket, null)
        NetEventDispatcher.addListener(NetEvent.S2CListMail, this.S2CListMail, this)
        NetEventDispatcher.addListener(NetEvent.S2CDelMail, this.S2CDelMail, this)
        NetEventDispatcher.addListener(NetEvent.S2CReadNewMailMsg, this.S2CReadNewMailMsg, this)
        NetEventDispatcher.addListener(NetEvent.S2CGetAttach, this.S2CGetAttach, this)




        DataManager.wndMail = this

    }

    S2CListMail(data) {
        console.log(`邮件数据：` + JSON.stringify(data))
        DataManager.maillist = data.mailInfoList
        this.contect.removeAllChildren()
        for (let i = 0; i < data.mailInfoList.length; i++) {
            let render = cc.instantiate(this.pfb)
            render.parent = this.contect
            render.getComponent(MailItem).init(i)
        }
    }

    S2CDelMail(retobj) {
        console.log(`邮件删除返回：` + JSON.stringify(retobj))
        // 邮件删除返回：{"mail_id":[2765]}

        for (var i = 0; i < retobj.mail_id.length; i++) {
            var deleteIndex = -1;
            var this_id = retobj.mail_id[i];
            DataManager.maillist.forEach(function (element, index) {
                if (element.mail_id == this_id) {
                    deleteIndex = index;
                }
            }, this);
            if (deleteIndex != -1) {
                DataManager.maillist.splice(deleteIndex, 1);
            } else {
                //MyUiManager.OpenFloatTipPanel(new cc.Vec2(0, 130), "删除邮件失败!");
            }
        }
        // MyUiManager.OpenFloatTipPanel(new cc.Vec2(0, 130), i18n.t('1109'));
        ViewManager.instance.showToast(`邮件删除成功`)
        var list = DataManager.maillist;
        // this.refreshScrollView();
        this._isDeletingMail = false;

        this.contect.removeAllChildren()
        for (let i = 0; i < list.length; i++) {
            let render = cc.instantiate(this.pfb)
            render.parent = this.contect
            render.getComponent(MailItem).init(i)
        }
    }

    S2CReadNewMailMsg(retobj) {//{"mail_id":"int"},{"is_del":"int","desc":"是否删除(0否、1是)"}
        ViewManager.instance.showToast(`邮件阅读返回`)
        this.contect.children.forEach(function (element) {
            var itemIndex = element.getComponent(MailItem)._itemID;
            var mailData = DataManager.maillist[itemIndex];
            if (mailData == null) {
                return;
            }
            if (mailData.mail_id == retobj.mail_id) {
                if (retobj.is_del == 1) {

                } else if (retobj.is_del == 0) {
                    cc.log("设置已读");
                    mailData.is_read = 1;
                    element.getComponent(MailItem).init(itemIndex);
                }
            }
        }, this);
    }

    S2CGetAttach(retobj) {
        console.log('retobj:' + JSON.stringify(retobj))
        var rewardPanel = cc.instantiate(this.getRewardPanel_prefab);
        cc.Canvas.instance.node.addChild(rewardPanel);
        console.log('---' + JSON.stringify(DataManager.maillist))
        let idx
        for (let i = 0; i < DataManager.maillist.length; i++) {
            if (DataManager.maillist[i].mail_id == retobj.mail_id) {
                idx = i
                rewardPanel.getComponent(GetRewardPanel)._itemlist = DataManager.maillist[i].attach
            }
        }
        // rewardPanel.getComponent(GetRewardPanel)._itemlist = DataManager.maillist[retobj.mail_id].attach;
        DataManager.maillist[idx].attach = [];
        console.log('---' + JSON.stringify(DataManager.maillist[retobj.mail_id]))
        this.contect.children.forEach(function (element) {
            var index = element.getComponent(MailItem)._itemID;
            if (DataManager.maillist[index] != null && DataManager.maillist[index].mail_id == retobj.mail_id) {
                element.getComponent(MailItem).init(index);
            }
        }, this);
    }


    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CListMail, this.S2CListMail, this)

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }

    // update (dt) {}
}
