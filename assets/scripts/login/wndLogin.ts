// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";

//@ts-ignore
var MyProtocols = require("MyProtocols");


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.EditBox, displayName: '账户' })
    editAccount: cc.EditBox = null;

    @property({ type: cc.EditBox, displayName: '密码' })
    editPwd: cc.EditBox = null;

    @property({ type: cc.Node, displayName: '登陆' })
    btnLogin: cc.Node = null;

    @property({ type: cc.Node, displayName: '游客' })
    btnTourist: cc.Node = null;

    strAccount: string

    strPwd: string

    /**重连提示 */
    shortMask: cc.Node = null

    _existInterval: number



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.editAccount.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.strAccount = editBox.string
            Logger.log(editBox.string)
        }, this)

        this.editPwd.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.strPwd = editBox.string
            Logger.log(editBox.string)
        }, this)


        this.btnLogin.on(cc.Node.EventType.TOUCH_END, () => {
            if (!this.strAccount) {
                ViewManager.instance.showToast('请输入账号')
                return
            }

            if (!this.strPwd) {
                ViewManager.instance.showToast('请输入密码')
                return
            }
            this.sendLogin2Server(() => {
                MyProtocols.send_C2SLogin(DataManager._loginSocket, this.strAccount, this.strPwd);
            })
        }, this)

        this.btnTourist.on(cc.Node.EventType.TOUCH_END, () => {
        }, this)
    }

    init() {


    }

    /**链接服务器 */
    sendLogin2Server(cbFunc?: Function) {
        //
        if (this._existInterval != null) {
            clearInterval(this._existInterval);
        }
        //添加loading提示
        this.shortMask = cc.instantiate(DataManager.Main.shortLoadLayer);
        this.shortMask.setPosition(0, 0);
        cc.Canvas.instance.node.addChild(this.shortMask);
        var self = this;
        //判断是否连接成功
        var sumTime = 0;
        this._existInterval = setInterval(function () {
            cc.log("query login server status!");
            if (DataManager._loginSocket.isConnected()) {
                if (cbFunc != null) {
                    cbFunc();
                    ViewManager.instance.showToast('链接成功')
                }
                clearInterval(self._existInterval);
                self._existInterval = null;
                //删除short loding
                if (self.shortMask != null) {
                    self.shortMask.removeFromParent();
                    self.shortMask.destroy();
                    self.shortMask = null;
                }
            }
            sumTime += 200;
            if (sumTime > 3000 || DataManager._loginSocket.isError()) {
                //重连
                cc.log("reconnect login socket!");
                sumTime = 0;
                DataManager._loginSocket.reconnect();
            }
        }, 200);
    }

    // update (dt) {}
}
