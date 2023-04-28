// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "./net/NetEvent";
import ViewManager from "./utils/Manager/ViewManager";

//@ts-ignore
var LejiSocket = require("LejiSocket");
//@ts-ignore
var MyProtocols = require("MyProtocols");
//@ts-ignore
var MyEventDispatcher = require("MyEventDispatcher");


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    shortLoadLayer: cc.Prefab = null;

    /**重连提示 */
    shortMask: cc.Node = null



    onLoad() {
        // EventNetManager.getInstance().addListener(10014, this.login.bind(this))
        MyEventDispatcher.addListener(NetEvent.S2CLogin, this.login.bind(this))
    }
    _existInterval: number
    _loginSocket


    start() {
        cc.macro.ENABLE_MULTI_TOUCH = false
        // ViewManager.instance.showView(EnumManager.viewPath.START)

        let socketUrl = "ws://8.218.9.194:8550/ws"
        this._loginSocket = new LejiSocket(socketUrl);

        this.sendLogin2Server(() => {
            MyProtocols.send_C2SLogin(this._loginSocket, '1', '1');
        })

    }

    login(retObj) {
        console.log('----------登陆返回---------------')
        console.log(JSON.stringify(retObj))
    }

    /**链接服务器 */
    sendLogin2Server(cbFunc?: Function) {
        //
        if (this._existInterval != null) {
            clearInterval(this._existInterval);
        }
        //添加loading提示
        this.shortMask = cc.instantiate(this.shortLoadLayer);
        this.shortMask.setPosition(0, 0);
        cc.Canvas.instance.node.addChild(this.shortMask);
        var self = this;
        //判断是否连接成功
        var sumTime = 0;
        this._existInterval = setInterval(function () {
            cc.log("query login server status!");
            if (self._loginSocket.isConnected()) {
                if (cbFunc != null) {
                    cbFunc();
                    console.log('-------链接成功-------------')
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
            if (sumTime > 3000 || self._loginSocket.isError()) {
                //重连
                cc.log("reconnect login socket!");
                sumTime = 0;
                self._loginSocket.reconnect();
            }
        }, 200);
    }
    // update (dt) {}
}

