// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    m_pInput: cc.EditBox = null;

    @property(cc.Button)
    m_pTopBtnList: cc.Button[] = [];

    @property(cc.Node)
    m_pContent: cc.Node = null;

    @property(cc.Node)
    m_pChatPlayerInfo: cc.Node = null;

    @property(cc.Node)
    m_pNewMessageNode: cc.Node = null;

    @property(cc.Label)
    m_pNewMessageLab: cc.Label = null;

    @property(cc.Node)
    m_pReddot: cc.Node = null;

    @property(cc.Node)
    node_private_redpoint: cc.Node = null;

    @property(cc.Node)
    node_nation_redpoint: cc.Node = null;

    @property(cc.Label)
    lab_nation_name: cc.Label = null;

    @property(cc.ScrollView)
    mScrollView: cc.ScrollView = null;

    @property(cc.Prefab)
    itemTemplate: cc.Prefab = null;

    @property
    itemTemplateHeight = 110;
    @property
    spawnCount = 12; // how many items we actually spawn
    @property
    spacing = 0; // space between each item
    @property
    bufferZone = 600; // when item is away from bufferZone, we relocate it

    @property(cc.SpriteFrame)
    m_pBtnSpriteFrame: cc.SpriteFrame[] = [];


    _isShow = null;

    // _NormalPos:null,
    // _ShowPos:null,


    _lastSelectTabMenu: cc.Button = null;
    _curselectIndex = null;

    _chatviewList = [];

    _chatitemList = [];

    _curZOrder = null;
    _pushZOrder = null;
    _intervalId = null;
    // _targetID:0,
    _targetchatinfo = null;
    _sendvalue = null;
    _newmesNum = 0

    content
    _spawnItems
    updateTimer
    lastContentPosY
    updateInterval


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // statics: {
    //     instance: null,
    //     getInstance(){
    //         return ChatPanel.instance;
    //     }
    // }
    // use this for initialization
    onLoad() {
        DataManager.ChatPanel = this
        this._isShow = false;
        // this._NormalPos = new cc.Vec2(-603,0);
        // this._ShowPos =new cc.Vec2(0,0);
        this._curZOrder = 1;
        this._pushZOrder = -100;
        NetEventDispatcher.addListener(NetEvent.S2CChatView, this.chatview_auth_cb, this);

        NetEventDispatcher.addListener(NetEvent.S2CChatPush, this.ChatPush_auth_cb, this);

        NetEventDispatcher.addListener(NetEvent.S2CChat, this.s2cchat_auth_cb, this);
        this.RefreshData();
        this.node.on("touchstart", this.touch_start, this);
        this.m_pInput.node.on('editing-did-ended', this.EditEnd_callback, this);
        this._sendvalue = "";

        // NetEventDispatcher.addListener(MyUIEvent.redPointsRefresh, this.redPointsRefresh_cb_func);

        NetEventDispatcher.addListener(NetEvent.S2CPkEnemyFormation, this.S2CPkEnemyFormation_cb, this);

        NetEventDispatcher.addListener(NetEvent.S2CArenaFormation, this.S2CArenaFormation_cb, this);
        //国家信息
        console.log(`DataManager.playData:` + JSON.stringify(DataManager.playData))
        if (DataManager.playData.nation_id > 0) {
            this.lab_nation_name.string = "国家(" + DataManager.countyList[DataManager.playData.nation_id] + ")";
        } else {
            this.lab_nation_name.string = "国家";
        }
    }

    //pvp阵容消息接收
    S2CArenaFormation_cb(retObj) {
        cc.log("接收pvp阵容消息");
        // DataManager.playData.pvpformation = retObj.formation;
        // if (retObj.formation != null) {
        //     BattleBufferMgr.setFormationData(2, retObj.formation);
        // }
    }

    S2CPkEnemyFormation_cb(retObj) {
        cc.log("战斗消息接收");
        // PkBufferMgr.setRightHero(retObj);
        // this.OpenFormationLayer(retObj);
    }
    //打开上阵面板
    OpenFormationLayer(retObj) {
        var pleftinfo = {
        };
        var prightinfo = {
            name: retObj.base_info.nickname + "LV." + retObj.base_info.level,// "据点" + (this._stageindex + 1) + " LV30",
            fight: retObj.base_info.fight,
            formation: retObj.formation.formationId,
            flip: retObj.formation.flip,
            forward: retObj.formation.forward,
            Teams: this.GetEnemyTeams(retObj),
            id: 0,
        };
        var ppanelinfo = {
            fid: 2,
        };
        // MyUiManager.Open(MyUiManager.PanelInfo.BattleFormationPanel, { leftinfo: pleftinfo, rightinfo: prightinfo, panelinfo: ppanelinfo, battletype: 8 });
    }
    //获取敌方队伍数据
    GetEnemyTeams(retObj) {
        var pteamslist = [];
        var getlevel = function (list, id) {
            for (var i = 0; i < list.length; ++i) {
                if (list[i].template_id == id) {
                    return list[i].level;
                }
            }
            return 0;
        }
        if (retObj.formation.a > 0) {
            var level = getlevel(retObj.cards, retObj.formation.a);
            pteamslist.push({ id: retObj.formation.a, level: level, position: "a" });
        }
        if (retObj.formation.b > 0) {
            var level = getlevel(retObj.cards, retObj.formation.b);
            pteamslist.push({ id: retObj.formation.b, level: level, position: "b" });
        }
        if (retObj.formation.c > 0) {
            var level = getlevel(retObj.cards, retObj.formation.c);
            pteamslist.push({ id: retObj.formation.c, level: level, position: "c" });
        }
        if (retObj.formation.d > 0) {
            var level = getlevel(retObj.cards, retObj.formation.d);
            pteamslist.push({ id: retObj.formation.d, level: level, position: "d" });
        }
        if (retObj.formation.e > 0) {
            var level = getlevel(retObj.cards, retObj.formation.e);
            pteamslist.push({ id: retObj.formation.e, level: level, position: "e" });
        }
        if (retObj.formation.f > 0) {
            var level = getlevel(retObj.cards, retObj.formation.f);
            pteamslist.push({ id: retObj.formation.f, level: level, position: "f" });
        }
        if (retObj.formation.g > 0) {
            var level = getlevel(retObj.cards, retObj.formation.g);
            pteamslist.push({ id: retObj.formation.g, level: level, position: "g" });
        }
        if (retObj.formation.h > 0) {
            var level = getlevel(retObj.cards, retObj.formation.h);
            pteamslist.push({ id: retObj.formation.h, level: level, position: "h" });
        }
        if (retObj.formation.i > 0) {
            var level = getlevel(retObj.cards, retObj.formation.i);
            pteamslist.push({ id: retObj.formation.i, level: level, position: "i" });
        }
        if (retObj.formation.j > 0) {
            var level = getlevel(retObj.cards, retObj.formation.j);
            pteamslist.push({ id: retObj.formation.j, level: level, position: "j" });
        }
        return pteamslist;
    }

    redPointsRefresh_cb() {
        // let has_redpoint = DataManager.playData.RedPoint;
        // if (has_redpoint.indexOf(8) > -1) {
        //     this.m_pReddot.active = true;
        // }
        // else {
        //     this.m_pReddot.active = false;
        // }
    }

    EditEnd_callback(event) {
        var inputStr = this.m_pInput.string;
        cc.log("结束输入=========" + inputStr);
        if (this._targetchatinfo == null) {
            this._sendvalue = inputStr;
        } else {
            var strvalue = "你对" + this._targetchatinfo.sender_name + "说:";
            if (inputStr.indexOf(strvalue) > -1) {
                this._sendvalue = inputStr.substr(strvalue.length);
            } else {
                ViewManager.instance.showToast(`私聊对象有误！`)
            }
        }
    }
    touch_start(event) {
        // if(!this.m_pChatPlayerInfo.active)return;
        // var touch_localpos = this.m_pChatPlayerInfo.convertTouchToNodeSpace(event.touch);
        // var touch_worldpos = this.m_pChatPlayerInfo.convertToWorldSpace(touch_localpos);//将一个点转换到世界空间坐标系

        // var prect = this.m_pChatPlayerInfo.getBoundingBoxToWorld();
        // if(!prect.contains(touch_worldpos))
        // {
        //     cc.log("不在区域");
        //     this.m_pChatPlayerInfo.active = false;
        // }
    }
    onDestroy() {
        //网络消息移除
        NetEventDispatcher.removeListener(NetEvent.S2CChatView, this.chatview_auth_cb);
        NetEventDispatcher.removeListener(NetEvent.S2CChatPush, this.ChatPush_auth_cb);
        NetEventDispatcher.removeListener(NetEvent.S2CChat, this.s2cchat_auth_cb);
        DataManager.ChatPanel = null

        // NetEventDispatcher.removeListener(MyUIEvent.redPointsRefresh, this.redPointsRefresh_cb_func);
        NetEventDispatcher.removeListener(NetEvent.S2CPkEnemyFormation, this.S2CPkEnemyFormation_cb);
        NetEventDispatcher.removeListener(NetEvent.S2CArenaFormation, this.S2CArenaFormation_cb);
    }
    setParams(params) {
    }
    s2cchat_auth_cb(retObj) {
        cc.log("NetEvent.S2CChat");
        this.m_pInput.string = "";
        this._sendvalue = "";
    }
    ChatPush_auth_cb(retObj) {
        // cc.log("接受发送聊天内容消息=="+retObj.content);
        if (!this._isShow) {
            this.m_pReddot.active = true;
            return;
        }
        if (this._curselectIndex != retObj.chat_type) return;
        this._chatviewList.push(retObj);

        // this.m_pNewMessageNode.active = true;
        // this.m_pNewMessageLab.string = this._newmesNum+"条新消息";

        this.showListView();
    }
    SetSize(isopen) {
        if (isopen) {
            this.node.width = 1334;
            this.node.height = 750;
            return;
        }
        this.node.width = this.node.height = 0;
    }
    chatview_auth_cb(retObj) {
        cc.log("接受打开聊天面版===" + retObj.chat_content.length);
        this.ClearChatItem();
        if (!this._isShow) {
            this.m_pContent.active = true;
            // var moveto =  cc.moveTo(0.2, this._ShowPos);
            var moveby = cc.moveBy(0.2, cc.v2(728, 0));
            this.node.runAction(moveby);
            this._isShow = !this._isShow;
            this.SetSize(true);
        }
        this.m_pReddot.active = false;
        // var self = this;
        this._chatviewList = retObj.chat_content;
        this.showListView();
        //红点提示
        this.node_private_redpoint.active = retObj.new_msg_list[0];
        this.node_nation_redpoint.active = retObj.new_msg_list[1];
    }

    showListView() {
        //组件初始化
        this.content = this.mScrollView.content;
        this.content.height = this._chatviewList.length * (this.itemTemplateHeight + this.spacing) + this.spacing; // get total content height
        if (this.content.children.length == 0) {
            this._spawnItems = []; // array to store spawned items
            this.updateTimer = 0;
            this.updateTimer = 0.2;
            this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
            for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
                let item = cc.instantiate(this.itemTemplate);
                this.content.addChild(item);
                item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
                item.getComponent('ChatItem').updateItem(i);
                this._spawnItems.push(item);
            }
        } else {
            this.updateTimer = 0;
            for (let i = 0; i < this.spawnCount; ++i) { // spawn items, we only need to do this once
                let item = this._spawnItems[i];
                item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
                item.getComponent('ChatItem').updateItem(i);
            }
        }
    }
    SendChatContent(params, targetid = 0) {
        cc.log("发送的对象ID===" + targetid + "type==" + this._curselectIndex);
        MyProtocols.send_C2SChat(DataManager._loginSocket, this._curselectIndex, targetid, params);
    }
    ChatShow_OnClickHandler(event) {
        // SoundUtil.playBtnOpenEffect();
        this.OpenChatPanel(this._isShow);
        cc.log(this.node.getPosition());
    }
    RefreshData() {
        this._curselectIndex = 1;
        this.m_pTopBtnList[0].normalSprite = this.m_pBtnSpriteFrame[1];
        if (this._lastSelectTabMenu != null) {
            this._lastSelectTabMenu.normalSprite = this.m_pBtnSpriteFrame[0];
        }
        this._lastSelectTabMenu = this.m_pTopBtnList[0];
    }
    OpenChatPanel(isopen) {
        if (isopen) {
            // var moveto =  cc.moveTo(0.2, this._NormalPos);
            var moveby = cc.moveBy(0.2, cc.v2(-728, 0));
            var setactive = cc.callFunc(this.setcontentactive, this);
            this.node.runAction(cc.sequence(moveby, setactive));
            this.RefreshData();
            this._isShow = !this._isShow;
            this.ClearChatItem();
            this.SetSize(false);
            this.m_pNewMessageNode.active = false;
            this._newmesNum = 0;
            this._sendvalue = "";
            MyProtocols.send_C2SChatVisit(DataManager._loginSocket);
        }
        else {
            MyProtocols.send_C2SChatView(DataManager._loginSocket, this._curselectIndex);
        }
    }
    setcontentactive() {
        this.m_pContent.active = false;
    }

    ChangeChatItem(nindex, pchatinfo) {
        this._chatitemList[nindex].active = true;
        this._chatitemList[nindex].getComponent("ChatItem").SetInfo(pchatinfo);

    }
    ClearChatItem() {
        if (this._intervalId != null)
            clearInterval(this._intervalId);
        while (this._chatitemList.length > 0) {
            this._chatitemList.pop().destroy();
        }
        this._curZOrder = 1;
    }

    TabMenu_OnClickHandler(event, customEventData) {
        // SoundUtil.playBtnOpenEffect();
        var nindex = parseInt(customEventData);
        console.log(`---------nindex:` + nindex)
        // SoundUtil.playBtnOpenEffect();
        this.SelectTabMenuIndex(nindex);
        // if(this._curselectIndex == nindex)return;
        // this.m_pInput.string = "";
        // if(this._lastSelectTabMenu != null)
        // {
        //     this._lastSelectTabMenu.normalSprite = this.m_pBtnSpriteFrame[0];
        // }
        // var targetbtn = event.currentTarget.getComponent(cc.Button);
        // this._curselectIndex = nindex;
        // targetbtn.normalSprite = this.m_pBtnSpriteFrame[1];
        // cc.log("当前点击标签==="+nindex);
        // this._lastSelectTabMenu = targetbtn;
        // MyProtocols.send_C2SChatView(DonotDestroyManager._gameSocket,this._curselectIndex);
    }
    SelectTabMenuIndex(nindex) {
        this.mScrollView.scrollToTop()
        if (nindex == 2) {
            if (this._targetchatinfo != null) {
                var strvalue = "你对" + this._targetchatinfo.sender_name + "说:";
                this.m_pInput.string = strvalue;
            }
            else {
                this.m_pInput.string = "";
            }
        }
        if (this._curselectIndex == nindex) return;
        if (nindex != 2) {
            this._targetchatinfo = null;
            this.m_pInput.string = "";
            this._sendvalue = "";
        }
        console.log(`this._lastSelectTabMenu:` + this._lastSelectTabMenu)
        if (this._lastSelectTabMenu != null) {
            this._lastSelectTabMenu.normalSprite = this.m_pBtnSpriteFrame[0];
        }
        var targetbtn = this.m_pTopBtnList[nindex - 1];
        this._curselectIndex = nindex;
        targetbtn.normalSprite = this.m_pBtnSpriteFrame[1];
        cc.log("当前点击标签===" + nindex);
        this._lastSelectTabMenu = targetbtn;
        MyProtocols.send_C2SChatView(DataManager._loginSocket, this._curselectIndex);
    }
    Send_OnClickHandler(event, customEventData) {
        // SoundUtil.playBtnOpenEffect();
        this.mScrollView.scrollToTop()
        if (this._curselectIndex == 2) {
            if (this._targetchatinfo == null) {
                ViewManager.instance.showToast(`没有私聊对象！`)
                return;
            }
        }
        if (this._sendvalue == "") {
            ViewManager.instance.showToast(`没有私聊对象！`)
            return;
        }
        var ntargetid = 0;
        if (this._targetchatinfo != null) {
            ntargetid = this._targetchatinfo.sender_uid;
        }
        this.SendChatContent(this._sendvalue, ntargetid);
    }

    getPositionInView(item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.mScrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        this.updateTimer = 0;
        let items = this._spawnItems;
        if (items == null) {
            return;
        }
        let buffer = this.bufferZone;
        let isDown = this.mScrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemTemplateHeight + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].y = (items[i].y + offset);
                    let item = items[i].getComponent('ChatItem');
                    let itemId = item._itemID - items.length; // update item id
                    item.updateItem(itemId);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].y = (items[i].y - offset);
                    let item = items[i].getComponent('ChatItem');
                    let itemId = item._itemID + items.length;
                    item.updateItem(itemId);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.mScrollView.content.y;
    }
    // update (dt) {}
}
