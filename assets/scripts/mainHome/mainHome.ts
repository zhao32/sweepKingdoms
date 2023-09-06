// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ChatPanel from "../ChatPanel/ChatPanel";
import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import EventManager from "../utils/Manager/EventManager";
import { Logger } from "../utils/Manager/Logger";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

//@ts-ignore
var MyProtocols = require("MyProtocols");
//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.ProgressBar, displayName: '经验进度条' })
    proBarExp: cc.ProgressBar = null;

    @property({ type: cc.Label, displayName: '经验进度label' })
    labelProExp: cc.Label = null;

    @property({ type: cc.Label, displayName: '城镇坐标' })
    labelPos: cc.Label = null;

    @property({ type: cc.Node, displayName: '新手救济' })
    btnBeginner: cc.Node = null;

    @property({ type: cc.Node, displayName: '最新活动' })
    btnActive: cc.Node = null;

    @property({ type: cc.Node, displayName: '新手保护' })
    btnProtect: cc.Node = null;

    @property({ type: cc.Node, displayName: '寄宝阁' })
    btnJB: cc.Node = null;

    @property({ type: cc.Node, displayName: '好友' })
    btnFirend: cc.Node = null;

    @property({ type: cc.Node, displayName: '家族' })
    btnFamily: cc.Node = null;

    @property({ type: cc.Label, displayName: '玩家等级' })
    labelLevel: cc.Label = null;

    @property({ type: cc.Label, displayName: '玩家Vip等级' })
    labelVipLevel: cc.Label = null;

    @property({ type: cc.Label, displayName: '国籍' })
    labelNation: cc.Label = null;

    @property({ type: cc.Label, displayName: '玩家名称' })
    labelName: cc.Label = null;

    @property({ type: cc.Node, displayName: '玩家头像' })
    head: cc.Node = null;

    @property({ type: cc.Label, displayName: '战力' })
    labelCombatPower: cc.Label = null;

    @property({ type: cc.Label, displayName: '粮草' })
    labelProvisions: cc.Label = null;

    @property({ type: cc.Label, displayName: '金币' })
    labelCoin: cc.Label = null;

    @property({ type: cc.Label, displayName: '元宝' })
    labelGold: cc.Label = null;

    @property({ type: cc.RichText, displayName: '元宝' })
    richChat: cc.Label = null;

    @property({ type: cc.Node })
    nodeContect: cc.Node = null;

    @property({ type: cc.Node, displayName: '酒馆' })
    btnHotel: cc.Node = null;

    @property({ type: cc.Node, displayName: '招募所' })
    btnRecruit: cc.Node = null;

    @property({ type: cc.Node, displayName: '巅峰战场' })
    btnBattleFiled: cc.Node = null;

    @property({ type: cc.Node, displayName: '军需' })
    btnArm: cc.Node = null;

    @property({ type: cc.Node, displayName: '主城' })
    btnMainCity: cc.Node = null;

    @property({ type: cc.Node, displayName: '副本' })
    btnFuBen: cc.Node = null;

    @property({ type: cc.Node, displayName: '出征' })
    btnMine: cc.Node = null;

    @property({ type: cc.Node, displayName: '背包' })
    btnPack: cc.Node = null;

    @property({ type: cc.Node, displayName: '奖励' })
    btnAward: cc.Node = null;

    @property({ type: cc.Node, displayName: '系统' })
    btnSet: cc.Node = null;

    @property({ type: cc.Node, displayName: '图鉴' })
    btnIntro: cc.Node = null;

    @property({ type: cc.Node, displayName: '聊天按钮' })
    btnChat: cc.Node = null;

    @property({ type: cc.Node, displayName: '军队介绍' })
    btnInArm: cc.Node = null;

    @property({ type: cc.Node, displayName: '富豪榜' })
    btnRich: cc.Node = null;


    chatPanel


    // onLoad () {}

    initChat(data) {
        this.richChat.string = ''
        // console.log(`++++++++++++:`+ JSON.stringify(data))
        for (let i = data.length - 3; i <= data.length; i++) {
            if (data[i]) {
                if (i != data.length - 1) this.richChat.string += `<color=#E7C891>${data[i].sender_name}：</c><color=#ffffff>${data[i].content}</c>\n\n`
                else {
                    this.richChat.string += `<color=#E7C891>${data[i].sender_name}：</c><color=#ffffff>${data[i].content}</c>`
                }
            }
        }
    }

    start() {

        DataManager.mainHome = this

        this.btnRich.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_RICH)
        }, this)


        this.btnIntro.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_INTRO)
        }, this)

        this.btnInArm.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_INARM)
        }, this)

        this.btnChat.on(cc.Node.EventType.TOUCH_END, () => {
            console.log(`点击聊天面板1`)
            if (this.chatPanel) {
                console.log(`点击聊天面板2`)
                this.chatPanel.getComponent(ChatPanel).OpenChatPanel(false)
                this.btnChat.runAction(cc.fadeOut(1))
            }
        }, this)
        this.btnFuBen.on(cc.Node.EventType.TOUCH_END, () => {
            if (DataManager.cardsList.length == 0) {
                ViewManager.instance.showToast(`请先招募将领`)
                return
            }
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE)
        }, this)

        this.btnMine.on(cc.Node.EventType.TOUCH_END, () => {
            if (DataManager.cardsList.length == 0) {
                ViewManager.instance.showToast(`请先招募将领`)
                return
            }
            if (DataManager.playData.level < 30) {
                ViewManager.instance.showToast(`等级达到30级时开放`)
                return
            }
            ViewManager.instance.showView(EnumManager.viewPath.PAGE_GOBATTLE)
        }, this)

        this.btnPack.on(cc.Node.EventType.TOUCH_END, () => {
            Logger.log('----------打开背包----------')
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_PACK)
            return
        }, this)

        this.btnAward.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_REWARD)
        }, this)

        this.btnSet.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_USERINFO)
        }, this)


        this.btnHotel.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL)
        }, this)

        this.btnRecruit.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_RECRUITOFFICE)
        }, this)

        this.btnBattleFiled.on(cc.Node.EventType.TOUCH_END, () => {
            if (DataManager.cardsList.length == 0) {
                ViewManager.instance.showToast(`请先招募将领`)
                return
            }
            if (DataManager.playData.level < 30) {
                ViewManager.instance.showToast(`30级之后解锁巅峰战场`)
                return
            }
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLEFILED)
        }, this)

        this.btnMainCity.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_BULID, ...[0])
        }, this)

        this.btnArm.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_BULID, ...[1])
        }, this)



        this.btnBeginner.on(cc.Node.EventType.TOUCH_END, () => {
            // ViewManager.instance.showToast('新手保护')
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_MARKET)
        }, this)

        this.btnActive.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_ACTIVEY)
        }, this)

        this.btnProtect.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIL)
        }, this)

        this.btnJB.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_JIBAO)
        }, this)

        this.btnFirend.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_FIREND_LIST)
        }, this)


        this.btnFamily.on(cc.Node.EventType.TOUCH_END, () => {
            // MyProtocols.send_C2SFamilyDetail(DataManager._loginSocket)
            // ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILYS)
            // if(DataManager.GameData.family)
            if (DataManager.familyDetail && DataManager.familyDetail.familyID) {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
            } else {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILYS)
            }
        }, this)



        NetEventDispatcher.addListener(NetEvent.S2CListRedPoints, this.RedPointsBack, this)
        NetEventDispatcher.addListener(NetEvent.S2CFamilyDetail, this.S2CFamilyDetail, this)
        NetEventDispatcher.addListener(NetEvent.S2CChatView, this.S2CChatView, this);


        EventManager.getInstance().registerListener(EventManager.UPDATE_MAINHOME_INFO, this, this.updateInfo.bind(this))
        EventManager.getInstance().registerListener(EventManager.UPDATE_BULID_STATE, this, this.updataBulidState.bind(this))

        this.upCityPos()
    }

    S2CChatView(retObj) {
        // DataManager.chatviewList = retObj.chat_content
        // console.log(` retObj.chat_content:`+ JSON.stringify( retObj.chat_content))

    }

    openGM() {
        this.node.getChildByName('GMPanel').active = true
    }

    protected onDestroy(): void {
        NetEventDispatcher.removeListener(NetEvent.S2CListRedPoints, this.RedPointsBack, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyDetail, this.S2CFamilyDetail, this)

        EventManager.getInstance().unRegisterListener(EventManager.UPDATE_MAINHOME_INFO, this)
        EventManager.getInstance().unRegisterListener(EventManager.UPDATE_BULID_STATE, this)
        NetEventDispatcher.removeListener(NetEvent.S2CChatView, this.S2CChatView, this);

    }

    init() {

    }

    upCityPos(x = 0, y = 0) {
        x = x + 1
        y = y + 1
        this.labelPos.string = ` (` + x + ` , ` + y + `) `
    }

    updateInfo() {
        this.labelCoin.string = String(DataManager.playData.coinMoney)
        this.labelGold.string = String(DataManager.playData.goldMoney)
        this.labelLevel.string = `lv.` + String(DataManager.playData.level)
        this.labelName.string = String(DataManager.playData.name)
        this.labelProvisions.string = String(DataManager.playData.food)
        this.labelVipLevel.string = String(DataManager.playData.vip_level)

        let militray = 0
        for (let i = 0; i < DataManager.playData.military_data.length; i++) {
            militray += DataManager.playData.military_data[i]
        }
        this.labelCombatPower.string = String(militray)

        // console.log(`DataManager.playData.level - 1:` + (DataManager.playData.level - 1))
        if (DataManager.playData.level) {
            this.proBarExp.progress = DataManager.playData.level_exp / DataManager.GameData.Levels[DataManager.playData.level - 1].exp
            this.labelProExp.string = `${DataManager.playData.level_exp}/${DataManager.GameData.Levels[DataManager.playData.level - 1].exp}`
        }

        if (DataManager.countyList[DataManager.playData.nation_id]) {
            this.labelNation.string = DataManager.countyList[DataManager.playData.nation_id] + `国`//String(DataManager.playData.account_id)
        } else {
            this.labelNation.string = `无国籍`
        }

        if (DataManager.playData.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.head)
        } else if (DataManager.playData.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.head)
        } else {
            let defaultData = DataManager.GameData.Cards[DataManager.playData.icon]
            ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        }


        if (!this.chatPanel) {
            this.chatPanel = cc.instantiate(DataManager.Main.chatPanel)
            this.chatPanel.parent = this.node
            this.chatPanel.x = -600
            this.chatPanel.y = 0
            this.chatPanel.zIndex = 99
        }
    }

    updataBulidState() {
        Logger.log('-----------更新建筑状态-------------')
        for (let i = 0; i < DataManager.barracksList.length; i++) {
            for (let j = 0; j < this.nodeContect.getChildByName('front').children.length; j++) {
                if (this.nodeContect.getChildByName('front').children[j].name == DataManager.barracksList[i]) {
                    if (DataManager.playData.barracks_build[i] == 0) {
                        this.nodeContect.getChildByName('front').children[j].active = false
                    } else {
                        this.nodeContect.getChildByName('front').children[j].active = true
                    }
                }
            }

            for (let j = 0; j < this.nodeContect.getChildByName('mainBtns').children.length; j++) {
                if (this.nodeContect.getChildByName('mainBtns').children[j].name == DataManager.barracksList[i]) {
                    if (DataManager.playData.barracks_build[i] == 0) {
                        this.nodeContect.getChildByName('mainBtns').children[j].active = false
                    } else {
                        this.nodeContect.getChildByName('mainBtns').children[j].active = true
                    }
                }
            }

            for (let j = 0; j < this.nodeContect.getChildByName('title').children.length; j++) {
                if (this.nodeContect.getChildByName('title').children[j].name == DataManager.barracksList[i]) {
                    if (DataManager.playData.barracks_build[i] == 0) {
                        this.nodeContect.getChildByName('title').children[j].active = false
                    } else {
                        this.nodeContect.getChildByName('title').children[j].active = true
                    }
                }
            }

        }

        Logger.log(DataManager.playData.basic_build)
        for (let i = 0; i < DataManager.basicList.length; i++) {
            for (let j = 0; j < this.nodeContect.getChildByName('front').children.length; j++) {
                if (this.nodeContect.getChildByName('front').children[j].name == DataManager.basicList[i]) {
                    if (DataManager.playData.basic_build[i] == 0) {
                        this.nodeContect.getChildByName('front').children[j].active = false
                    } else {
                        this.nodeContect.getChildByName('front').children[j].active = true
                    }
                }
            }

            for (let j = 0; j < this.nodeContect.getChildByName('mainBtns').children.length; j++) {
                if (this.nodeContect.getChildByName('mainBtns').children[j].name == DataManager.basicList[i]) {
                    if (DataManager.playData.basic_build[i] == 0) {
                        this.nodeContect.getChildByName('mainBtns').children[j].active = false
                    } else {
                        this.nodeContect.getChildByName('mainBtns').children[j].active = true
                    }
                }
            }

            for (let j = 0; j < this.nodeContect.getChildByName('title').children.length; j++) {
                if (this.nodeContect.getChildByName('title').children[j].name == DataManager.basicList[i]) {
                    if (DataManager.playData.basic_build[i] == 0) {
                        this.nodeContect.getChildByName('title').children[j].active = false
                    } else {
                        this.nodeContect.getChildByName('title').children[j].active = true
                    }
                }
            }

        }

        for (let i = 0; i < DataManager.resourceList.length; i++) {
            for (let j = 0; j < this.nodeContect.getChildByName('front').children.length; j++) {
                if (this.nodeContect.getChildByName('front').children[j].name == DataManager.resourceList[i]) {
                    if (DataManager.playData.resource_build[i] == 0) {
                        this.nodeContect.getChildByName('front').children[j].active = false
                    } else {
                        this.nodeContect.getChildByName('front').children[j].active = true
                    }
                }
            }

            for (let j = 0; j < this.nodeContect.getChildByName('mainBtns').children.length; j++) {
                if (this.nodeContect.getChildByName('mainBtns').children[j].name == DataManager.resourceList[i]) {
                    if (DataManager.playData.resource_build[i] == 0) {
                        this.nodeContect.getChildByName('mainBtns').children[j].active = false
                    } else {
                        this.nodeContect.getChildByName('mainBtns').children[j].active = true
                    }
                }
            }

            for (let j = 0; j < this.nodeContect.getChildByName('title').children.length; j++) {
                if (this.nodeContect.getChildByName('title').children[j].name == DataManager.resourceList[i]) {
                    if (DataManager.playData.resource_build[i] == 0) {
                        this.nodeContect.getChildByName('title').children[j].active = false
                    } else {
                        this.nodeContect.getChildByName('title').children[j].active = true
                    }
                }
            }

        }
    }

    RedPointsBack(retObj) {
        Logger.log('----------RedPointsBack---------------')
        console.log(JSON.stringify(retObj))
    }

    // {"familyID":12,"familyName":"aa","familyIcon":0,"familyNum":0,"familyLv":1,"familyExp":2,"familyKill":3,"familyFight":4,"contribution":5,"reputation":6,"aim":"家族说明","notice":"家族宗旨"}
    S2CFamilyDetail(retObj) {
        Logger.log('----------FamilyDetail---------------')
        console.log('FamilyDetail:' + JSON.stringify(retObj))
        DataManager.familyDetail.familyID = retObj.familyID
        if (retObj.familyID == 0) return
        DataManager.familyDetail.familyName = retObj.familyName
        DataManager.familyDetail.familyIcon = retObj.familyIcon
        DataManager.familyDetail.familyNum = retObj.familyNum
        DataManager.familyDetail.familyLv = retObj.familyLv
        DataManager.familyDetail.familyExp = retObj.familyExp
        DataManager.familyDetail.familyKill = retObj.familyKill
        DataManager.familyDetail.familyFight = retObj.familyFight
        DataManager.familyDetail.contribution = retObj.contribution
        DataManager.familyDetail.reputation = retObj.reputation
        DataManager.familyDetail.aim = retObj.aim
        DataManager.familyDetail.notice = retObj.notice
        DataManager.familyDetail.familyChiefID = retObj.familyChiefID
        DataManager.familyDetail.familyChiefName = retObj.familyChiefName
        DataManager.familyDetail.autoEnter = retObj.autoEnter
        DataManager.familyDetail.task1 = [{ "id": 1, "num": 0 }, { "id": 2, "num": 0 }, { "id": 3, "num": 0 }]
        DataManager.familyDetail.task2 = [{ "id": 4, "num": 0 }, { "id": 5, "num": 0 }, { "id": 6, "num": 0 }, { "id": 7, "num": 0 }, { "id": 8, "num": 0 }]
        for (let i = 0; i < DataManager.familyDetail.task1.length; i++) {
            for (let j = 0; j < retObj.task1.length; j++) {
                if (DataManager.familyDetail.task1[i].id == retObj.task1[j].id) {
                    DataManager.familyDetail.task1[i].num = retObj.task1[j].num
                }
            }
        }

        for (let i = 0; i < DataManager.familyDetail.task2.length; i++) {
            for (let j = 0; j < retObj.task2.length; j++) {
                if (DataManager.familyDetail.task2[i].id == retObj.task2[j].id) {
                    DataManager.familyDetail.task2[i].num = retObj.task2[j].num
                }
            }
        }


        // DataManager.familyDetail.task1 = retObj.task1
        // DataManager.familyDetail.task2 = retObj.task2

        // if (retObj.familyID) {
        //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
        // } else {
        //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILYS)
        // }
    }



    // update (dt) {}
}
