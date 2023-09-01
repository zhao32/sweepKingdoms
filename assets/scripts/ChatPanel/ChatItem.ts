// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Sprite)
    m_pIcon: cc.Sprite = null;

    @property(cc.Sprite)
    m_pHeadFrame: cc.Sprite = null;

    @property(cc.Label)
    m_pLevel: cc.Label = null;

    @property(cc.RichText)
    m_pContent: cc.RichText = null;

    @property(cc.SpriteFrame)
    m_pIconSpriteFrames: cc.SpriteFrame[] = [];
    @property
    index: number = 0;

    _chatinfo: any;
    _itemID: number;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // use this for initialization
    onLoad() {

    }
    SetInfo(pinfo) {
        // this._chatinfo = pinfo;
        // this.Init();
    }
    updateItem(nIndex) {
        this._itemID = nIndex;
        if (this._itemID >= DataManager.ChatPanel._chatviewList.length) {
            this.node.active = false;
        } else {
            this.node.active = true;
            this._chatinfo = DataManager.ChatPanel._chatviewList[DataManager.ChatPanel._chatviewList.length - 1 - this._itemID];
            this.Init();
        }
        // if(this._itemID == 0)
        // {
        //     cc.log("是最新的了==="+this.index);
        //     chatpanel.getInstance().m_pNewMessageNode.active = false;
        //     chatpanel.getInstance()._newmesNum = 0;
        // }
    }
    refreshItem() {

    }
    Init() {
        console.log(`this._chatinfo:` + JSON.stringify(this._chatinfo))
        switch (this._chatinfo.chat_type) {
            case 1:
                // let officeTitle = GuozhanBufferMgr.getOfficeNameByIndex(this._chatinfo.office_index);
                if (this._chatinfo.sender_uid == DataManager.playData.id) {
                    this.m_pContent.string = "<color=#00ff00>我</c>:" + this._chatinfo.content;
                } else {
                    this.m_pContent.string = this._chatinfo.sender_name + ":" + this._chatinfo.content;
                }
                break;
            case 2:
                if (this._chatinfo.sender_uid == DataManager.playData.id) {
                    var strvalue = "你对" + this._chatinfo.receiver_name + "说:";
                    //  cc.log("检查结果==="+this._chatinfo.content.indexOf(strvalue));
                    if (this._chatinfo.content.indexOf(strvalue) == -1) {
                        this.m_pContent.string = "你对<color=#0fffff>" + this._chatinfo.receiver_name + "</c>说:" + this._chatinfo.content;
                    }
                    else {
                        this.m_pContent.string = this._chatinfo.content;
                    }
                }
                else {
                    this.m_pContent.string = "<color=#0fffff>" + this._chatinfo.sender_name + "</c>对你说:" + this._chatinfo.content;
                }
                break;
            case 3:
                // let officeTitle = DataManager.countyList[DataManager.playData.account_id]//GuozhanBufferMgr.getOfficeNameByIndex(this._chatinfo.office_index);
                if (this._chatinfo.sender_uid == DataManager.playData.id) {
                    this.m_pContent.string = "<color=#00ff00>我</c>:" + this._chatinfo.content;
                } else {
                    this.m_pContent.string = this._chatinfo.sender_name + ":" + this._chatinfo.content;
                }

            case 4:
                // let officeTitle = DataManager.countyList[DataManager.playData.account_id]//GuozhanBufferMgr.getOfficeNameByIndex(this._chatinfo.office_index);
                if (this._chatinfo.sender_uid == DataManager.playData.id) {
                    this.m_pContent.string = "<color=#00ff00>我</c>:" + this._chatinfo.content;
                } else {
                    this.m_pContent.string = this._chatinfo.sender_name + ":" + this._chatinfo.content;
                }
                break;
        }
        // cc.log("发送的类型"+this._chatinfo.chat_type);
        this.m_pLevel.string = this._chatinfo.level;
        // if (this._chatinfo.icon < 10) {
        //     this.m_pIcon.spriteFrame = this.m_pIconSpriteFrames[this._chatinfo.icon - 1];
        // } else {
        //     let cardId = this._chatinfo.icon - 10;
        //     let cardCfg = HeroConfigMgr.find(cardId);
        //     if (cardCfg != null) {
        //         let iconName = cardCfg.icon;
        //         var self = this;
        //         cc.loader.loadRes("UI/Heros/" + iconName, cc.SpriteFrame, function (err, iconspr) {
        //             cc.loader.setAutoReleaseRecursively(iconspr, true);
        //             if (self != null && cc.isValid(self.m_pIcon)) {
        //                 self.m_pIcon.spriteFrame = iconspr;
        //                 self.m_pIcon.node.width = 87;
        //                 self.m_pIcon.node.height = 87;
        //             }
        //         });
        //     }


        // }

        if (DataManager.playData.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.m_pIcon.node)
        } else if (DataManager.playData.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.m_pIcon.node)
        } else {
            let defaultData = DataManager.GameData.Cards[DataManager.playData.icon]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.m_pIcon.node)
        }

        //头像框
        // let aConfig = DonotDestroyManager.GameData.HeadFrame[this._chatinfo.head_frame_id - 1];
        // var self = this;
        // cc.loader.loadRes("UI/HeadFrame/" + aConfig.icon, cc.SpriteFrame, function (err, loadedPrefab) {
        //     cc.loader.setAutoReleaseRecursively(loadedPrefab, true);
        //     if (self != null && cc.isValid(self.node)) {
        //         self.m_pHeadFrame.spriteFrame = loadedPrefab;
        //     }
        // });
    }

    HeadFrame_OnClickHandler(event, customEventData) {
        // SoundUtil.playBtnOpenEffect();//播放点击声音
        if (this._chatinfo.sender_uid == DataManager.playData.id) return;
        DataManager.ChatPanel.m_pChatPlayerInfo.active = true;
        let chatPlayerCtrl = DataManager.ChatPanel.m_pChatPlayerInfo.getComponent("ChatPlayerInfo");
        chatPlayerCtrl.ChangeData(this._chatinfo);
        chatPlayerCtrl.m_pIcon.spriteFrame = this.m_pIcon.spriteFrame;
        chatPlayerCtrl.spr_head_frame.spriteFrame = this.m_pHeadFrame.spriteFrame;
        chatPlayerCtrl.m_pIcon.node.width = 87;
        chatPlayerCtrl.m_pIcon.node.height = 87;
    }
}
