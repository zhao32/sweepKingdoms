// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    m_pInput: cc.EditBox = null;

    @property
    text: string = 'hello';

    onLoad() {
        NetEventDispatcher.addListener(NetEvent.S2CGmCmd, this.gmcmd_auth_cb,this);
    }
    gmcmd_auth_cb(retObj) {
        cc.log("消息发送成功===" + retObj.ret_code);
        var showvalue = "消息发送成功";
        if (retObj.ret_code != 0) {
            showvalue = "消息发送失败";
        }
        ViewManager.instance.showToast(showvalue);
    }
    Send_OnClickHandler() {
        Logger.log(this.m_pInput.string)
        if (this.m_pInput.string == "") {
            ViewManager.instance.showToast('请输入内容')
            return;
        }
        MyProtocols.send_C2SGmCmd(DataManager._loginSocket, this.m_pInput.string);
    }
    onDestroy() {
        //网络消息移除
        NetEventDispatcher.removeListener(NetEvent.S2CGmCmd, this.gmcmd_auth_cb);
    }
    Close_OnClickHandler(event) {
        this.node.active = false
    }
}
