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
import firendRender from "./firendRender";
import friendEFindPanel from "./friendEFindPanel";
import opFirendPanel from "./opFirendPanel";

const { ccclass, property } = cc._decorator;


//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    LabelTitle: cc.Label = null;

    @property(cc.Label)
    LabelDisplay: cc.Label = null;

    @property(cc.Label)
    LabelTopBtn: cc.Label = null;

    @property(cc.Label)
    LabelBottomBtn: cc.Label = null;

    @property(cc.Node)
    btnList: cc.Label = null;

    @property(cc.Node)
    btnAdd: cc.Label = null;

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    renderPfb: cc.Prefab = null;

    type: number = 0//0 好友录 1 仇人录



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    openOppanel(data,type){
        this.node.getChildByName("opFirendPanel").getComponent(opFirendPanel).open(data,type)
    }

    init() {
        this.node.getChildByName("opFirendPanel").active = false
        DataManager.wndFirendList = this
        this.type = 0
        this.LabelTopBtn.string = `仇人录`
        this.LabelTitle.string = `好友录`
        this.LabelBottomBtn.string = `添加好友`
        this.node.getChildByName(`friendEFindPanel`).active = false
        MyProtocols.send_C2SFriendList(DataManager._loginSocket)

        NetEventDispatcher.addListener(NetEvent.S2CFriendList, this.S2CFriendList, this)
        NetEventDispatcher.addListener(NetEvent.S2CFriendBlackList, this.S2CFriendBlackList, this)
        NetEventDispatcher.addListener(NetEvent.S2CBlackFriendAdd, this.S2CBlackFriendAdd, this)
        NetEventDispatcher.addListener(NetEvent.S2CFriendBlackRemove, this.S2CFriendBlackRemove, this)

        
    }

    S2CFriendBlackRemove(retObj){
        console.log(`黑名单删除返回：` + JSON.stringify(retObj))
        this.node.getChildByName("opFirendPanel").active = false
        MyProtocols.send_C2SFriendBlackList(DataManager._loginSocket)
    }

    S2CFriendList(retObj) {
        console.log(`好友列表：` + JSON.stringify(retObj))
        this.contect.removeAllChildren()
        let count = 0
        for (let i = 0; i < retObj.friend.length; i++) {
            if (retObj.friend[i].state != 2) {
                let render = cc.instantiate(this.renderPfb)
                render.getComponent(firendRender).init(retObj.friend[i], 1)
                render.parent = this.contect
                count++
            }

        }
        this.LabelDisplay.string = `现有好友${count}人（最多50人）`
    }

    S2CFriendBlackList(retObj) {
        console.log(`黑名单列表：` + JSON.stringify(retObj))
        this.contect.removeAllChildren()
        for (let i = 0; i < retObj.friend.length; i++) {
            let render = cc.instantiate(this.renderPfb)
            render.getComponent(firendRender).init(retObj.friend[i], 2)
            render.parent = this.contect
        }
        this.LabelDisplay.string = `现有仇人${retObj.friend.length}人（最多50人）`
    }

    S2CBlackFriendAdd(retObj) {
        console.log(`添加黑名单返回：` + JSON.stringify(retObj))
        this.node.getChildByName("opFirendPanel").active = false
        MyProtocols.send_C2SFriendBlackList(DataManager._loginSocket)

    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_FIREND_LIST, true)
    }

    onListHandler() {
        if (this.type == 0) {
            this.type = 1
            this.LabelTopBtn.string = `好友录`
            this.LabelTitle.string = `仇人录`
            this.LabelBottomBtn.string = `添加仇人`
            MyProtocols.send_C2SFriendBlackList(DataManager._loginSocket)
        } else if (this.type == 1) {
            this.type = 0
            this.LabelTopBtn.string = `仇人录`
            this.LabelTitle.string = `好友录`
            this.LabelBottomBtn.string = `添加好友`
            MyProtocols.send_C2SFriendList(DataManager._loginSocket)
        }
    }

    onAddHandler() {
        if (this.type == 0) {
            ViewManager.instance.hideWnd(EnumManager.viewPath.WND_FIREND_LIST, true)
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_FIREND_ADD)
        } else {
            this.node.getChildByName(`friendEFindPanel`).getComponent(friendEFindPanel).open()
        }

    }


    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFriendList, this.S2CFriendList, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFriendBlackList, this.S2CFriendBlackList, this)
        NetEventDispatcher.removeListener(NetEvent.S2CBlackFriendAdd, this.S2CBlackFriendAdd, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFriendBlackRemove, this.S2CFriendBlackRemove, this)


    }

    // update (dt) {}
}
