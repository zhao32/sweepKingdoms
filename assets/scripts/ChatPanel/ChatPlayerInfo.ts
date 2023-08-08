// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    m_pName: cc.Label = null;

    @property(cc.Label)
    lab_office: cc.Label = null;

    @property(cc.Sprite)
    m_pHeadFrame: cc.Sprite = null;

    @property(cc.Sprite)
    m_pIcon: cc.Sprite = null;

    @property(cc.Sprite)
    spr_head_frame: cc.Sprite = null;

    @property(cc.Label)
    m_pLevel: cc.Label = null;

    @property(cc.Label)
    m_pVip: cc.Label = null;

    _chatinfo: any



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onLoad() {
        // this.node.on("touchstart",this.touch_start,this);
    }
    ChangeData(params) {
        this._chatinfo = params;
        this.Init();
        // if (MyPersistDataManager._playerData.pvpformation == null) {
            // MyProtocols.send_C2SArenaFormation(DataManager._loginSocket);
        // }
    }
    Init() {
        this.m_pLevel.string = this._chatinfo.level;
        this.m_pName.string = "姓名:" + this._chatinfo.sender_name;
        if (this._chatinfo.office_index == -1 || this._chatinfo.office_index == 99 || this._chatinfo.office_index == 199 || this._chatinfo.office_index == 299) {
            this.lab_office.string = "无国战官职";
        } else {
            // let officeTitle = GuozhanBufferMgr.getOfficeNameByIndex(this._chatinfo.office_index);
            // this.lab_office.string = "官职:" + officeTitle;
        }
        this.m_pVip.string = "VIP" + this._chatinfo.vip_level;
    }
    private_OnClickHandler(event, customEventData) {
        // SoundUtil.playBtnOpenEffect();//播放点击声音
        // var chatpanel = require("ChatPanel");
        this.node.active = false;
        DataManager.ChatPanel._targetchatinfo = this._chatinfo;
        DataManager.ChatPanel.SelectTabMenuIndex(2);
        // chatpanel.getInstance()._targetID = this._chatinfo.sender_uid;

    }
    Mask_OnClickHandler(event) {
        // SoundUtil.playBtnCloseEffect();//播放点击声音
        this.node.active = false;
    }

    Pk_OnClickHandler(event, customData) {
        // SoundUtil.playBtnOpenEffect();//播放点击声音
        MyProtocols.send_C2SPkEnemyFormation(DataManager._loginSocket, this._chatinfo.sender_uid);
    }
}
