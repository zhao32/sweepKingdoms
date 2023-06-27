// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";

//@ts-ignore
var MyProtocols = require("MyProtocols");
//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


//@ts-ignore
var LejiSocket = require("LejiSocket");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Prefab, displayName: '服务器render' })
    serverPfb: cc.Prefab = null;

    @property({ type: cc.Node, displayName: '服务器Contect' })
    serverContect: cc.Node = null;

    @property({ type: cc.Node, displayName: '服务器容器' })
    serversNode: cc.Node = null;

    @property({ type: cc.Label, displayName: '服务器名称' })
    serverNameDisplay: cc.Label = null;

    serverList = []

    selectSeverData = null


    /**重连提示 */
    shortMask: cc.Node = null

    _existInterval: number

    //  session_id: number = 1

    uid = 2

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {


    }

    protected onDestroy(): void {


    }

    init() {

        // console.log(`进入游戏  `, this.selectSeverData.id)
        console.log('DataManager._loginSocket:' + JSON.stringify(DataManager._loginSocket))

        this.serversNode.active = false
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_LOGIN)

        NetEventDispatcher.addListener(NetEvent.S2CLogin, this.loginBack, this)
        NetEventDispatcher.addListener(NetEvent.S2CServerList, this.scSeverList, this)
        NetEventDispatcher.addListener(NetEvent.S2CSelectServer, this.selectServerBack, this)
        NetEventDispatcher.addListener(NetEvent.S2CEnterGame, this.enterGameBack, this)
        NetEventDispatcher.addListener(NetEvent.S2CQueryHasRole, this.QueryHasRoleBack, this)
    }


    loginBack(retObj) {
        // {"uid":4682,"session_id":"2891339660185600"}
        Logger.log('----------登陆返回---------------')
        console.log(JSON.stringify(retObj))
        // let socketUrl = `ws://8.218.9.194:${retObj.uid}/ws`
        // this._loginSocket = new LejiSocket(socketUrl);
        // this.sendLogin2Server()
        DataManager.instance.session_id = retObj.session_id
        MyProtocols.send_C2SServerList(DataManager._loginSocket)
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
    }

    enterGameBack(retObj) {
        Logger.log('----------登陆验证---------------')
        console.log(JSON.stringify(retObj))
        MyProtocols.send_C2SListRedPoints(DataManager._loginSocket)

    }

    QueryHasRoleBack(retObj) {
        Logger.log('----------角色验证---------------')
        console.log(JSON.stringify(retObj))
        ViewManager.instance.hideView(EnumManager.viewPath.PAGE_LOGIN, true)
        if (retObj.has_role) {
            MyProtocols.send_C2SEnterGame(DataManager._loginSocket, DataManager.instance.session_id)
        } else {
            //打开选角页
            ViewManager.instance.showView(EnumManager.viewPath.PAGE_ROLE)
        }
    }

    /**获取服务器列表 */
    scSeverList(retObj) {
        Logger.log('----------获取服务器列表返回---------------')
        console.log(JSON.stringify(retObj))
        this.node.getChildByName('bottomNode').runAction(cc.moveTo(0.5, cc.v2(0, -150)))
        this.serverList = retObj.items
        this.selectSeverData = this.serverList[0]
        this.serverNameDisplay.string = this.serverList[0].name

        // DataManager._loginSocket =  
        // {"items":[{"id":1,"name":"月光平原","ip_addr":"8.218.9.194","port":13001,"status":1,"port_nossl":13001},{"id":2,"name":"测试服","ip_addr":"192.168.1.50","port":13001,"status":1,"port_nossl":13001}]}

    }

    selectServer() {
        this.serverContect.removeAllChildren()
        this.serversNode.active = !this.serversNode.active
        if (this.serversNode.active == true) {
            for (let i = 0; i < this.serverList.length; i++) {
                let render = cc.instantiate(this.serverPfb)
                render.parent = this.serverContect
                render.getComponentInChildren(cc.Label).string = this.serverList[i].name
                render.on(cc.Node.EventType.TOUCH_END, () => {
                    this.selectSeverData = this.serverList[i]
                    this.serverNameDisplay.string = this.selectSeverData.name
                    this.serversNode.active = false
                }, this)
            }
        }
    }

    onStart() {
        // if (this.selectSeverData) {
        //     let socketUrl = `ws://${this.selectSeverData.ip_addr}:${7550}/ws`
        //     DataManager._loginSocket = new LejiSocket(socketUrl);
        // }
        console.log(JSON.stringify(DataManager._loginSocket))
        MyProtocols.send_C2SSelectServer(DataManager._loginSocket, this.selectSeverData.id)

    }

    selectServerBack(retObj) {
        Logger.log('----------选择服务器---------------')
        console.log(JSON.stringify(retObj))

        let socketUrl = `ws://${this.selectSeverData.ip_addr}:${this.selectSeverData.port}/ws`
        DataManager._loginSocket = new LejiSocket(socketUrl);

        Logger.log('this.session_id  1:' + DataManager.instance.session_id)
        var self = this
        this.sendLogin2Server(() => {
            Logger.log('self.session_id  2:' + DataManager.instance.session_id)
            // Logger.log(DataManager._loginSocket)
            MyProtocols.send_C2SQueryHasRole(DataManager._loginSocket, DataManager.instance.session_id)
        })


        // {"ret":0}
    }

    /**链接游戏服务器 */
    sendLogin2Server(cbFunc?: Function) {
        //
        if (this._existInterval != null) {
            clearInterval(this._existInterval);
        }
        //添加loading提示
        if (!this.shortMask) {
            Logger.log('1111111111111111')
            this.shortMask = cc.instantiate(DataManager.Main.shortLoadLayer);
            this.shortMask.setPosition(0, 0);
            cc.Canvas.instance.node.addChild(this.shortMask);
        }

        var self = this;
        //判断是否连接成功
        var sumTime = 0;
        this._existInterval = setInterval(function () {
            cc.log("query login server status!");
            if (DataManager._loginSocket.isConnected()) {
                if (cbFunc != null) {
                    cbFunc();
                    Logger.log('-------链接成功-------------')
                    ViewManager.instance.showToast('链接成功')
                }
                clearInterval(self._existInterval);
                self._existInterval = null;
                //删除short loding
                Logger.log(self.shortMask)
                if (self.shortMask != null) {
                    Logger.log('-------------------------')
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


    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CLogin, this.loginBack, this)
        NetEventDispatcher.removeListener(NetEvent.S2CServerList, this.scSeverList, this)
        NetEventDispatcher.removeListener(NetEvent.S2CSelectServer, this.selectServerBack, this)
        NetEventDispatcher.removeListener(NetEvent.S2CEnterGame, this.enterGameBack, this)
        NetEventDispatcher.removeListener(NetEvent.S2CQueryHasRole, this.QueryHasRoleBack, this)
    }

    // update (dt) {}
}
