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
import firendFindFRender from "./firendFindFRender";
import firendSeekRender from "./firendSeekRender";
import friendFindPanel from "./friendFindPanel";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    pfbRender1: cc.Prefab = null;

    @property(cc.Prefab)
    pfbRender2: cc.Prefab = null;

    @property(cc.Node)
    contect: cc.Node = null;

    showType: number = 0 // 0 分组 1 分组内

    groupsData = [
        {
            group: '同国玩家',
            describe: '查找和你同国的玩家',
            frameIdx: 1
        },
        {
            group: '按条件查询',
            describe: '通过指定的条件查询',
            frameIdx: 2
        }
    ]

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.showGroups()
    }

    showGroups() {
        this.showType = 0
        this.contect.removeAllChildren()
        for (let i = 0; i < this.groupsData.length; i++) {
            let render = cc.instantiate(this.pfbRender1)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
            render.getComponent(firendSeekRender).init(this.groupsData[i])
            render.on(cc.Node.EventType.TOUCH_END, () => {
                if (i == 0) {
                    console.log('DataManager.playData.nation_id:' + DataManager.playData.nation_id)
                    MyProtocols.send_C2SFriendsSearch(DataManager._loginSocket, 0, 0, -1, DataManager.playData.nation_id)
                } else if (i == 1) {
                    // ViewManager.instance.hideWnd(DataManager.curWndPath)
                    // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FIREND_FIND)
                    this.node.getChildByName(`friendFindPanel`).getComponent(friendFindPanel).open()
                }
                // this.showIntragroup(i)
            }, this)
        }
    }

    S2CFriendsSearch(retObj) {
        console.log(`查询玩家：` + JSON.stringify(retObj))
        this.showType = 1
        this.contect.removeAllChildren()
        for (let i = 0; i < retObj.friend.length; i++) {
            let render = cc.instantiate(this.pfbRender2)
            render.parent = this.contect
            render.getComponent(firendFindFRender).init(retObj.friend[i])
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(DataManager.SCROLLTIME1, cc.v2(0, render.y)))
                }, DataManager.SCROLLTIME2 * i)
            }
        }
    }

    init() {
        // this.showGroups()
        this.node.getChildByName(`friendFindPanel`).active = false
        NetEventDispatcher.addListener(NetEvent.S2CFriendsSearch, this.S2CFriendsSearch, this)
        NetEventDispatcher.addListener(NetEvent.S2CFriendAdd, this.S2CFriendAdd, this)
    }

    S2CFriendAdd(retObj) {
        console.log(`朋友添加返回：` + JSON.stringify(retObj))
        ViewManager.instance.showToast(`好友添加成功`)
    }

    onCloseHandler() {
        if (this.showType == 0) {
            Logger.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath)
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_FIREND_LIST)

        } else if (this.showType == 1) {
            this.showGroups()
        }
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CFriendsSearch, this.S2CFriendsSearch, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFriendAdd, this.S2CFriendAdd, this)
    }

    // update (dt) {}
}
