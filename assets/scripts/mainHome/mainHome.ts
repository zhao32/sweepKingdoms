// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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

    // onLoad () {}

    start() {
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

        EventManager.getInstance().registerListener(EventManager.UPDATE_MAINHOME_INFO, this, this.updateInfo.bind(this))
        EventManager.getInstance().registerListener(EventManager.UPDATE_BULID_STATE, this, this.updataBulidState.bind(this))
    }

    openGM() {
        this.node.getChildByName('GMPanel').active = true
    }

    protected onDestroy(): void {
        NetEventDispatcher.removeListener(NetEvent.S2CListRedPoints, this.RedPointsBack, this)
        NetEventDispatcher.removeListener(NetEvent.S2CFamilyDetail, this.S2CFamilyDetail, this)

        EventManager.getInstance().unRegisterListener(EventManager.UPDATE_MAINHOME_INFO, this)
        EventManager.getInstance().unRegisterListener(EventManager.UPDATE_BULID_STATE, this)

    }

    chatPanel

    init() {

    }
    updateInfo() {
        this.labelCoin.string = String(DataManager.playData.coinMoney)
        this.labelCombatPower.string = String(DataManager.playData.troops)
        this.labelGold.string = String(DataManager.playData.goldMoney)
        this.labelLevel.string = String(DataManager.playData.level)
        this.labelName.string = String(DataManager.playData.name)
        this.labelProvisions.string = String(DataManager.playData.food)

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

    S2CFamilyDetail(retObj) {
        Logger.log('----------FamilyDetail---------------')
        console.log('FamilyDetail:'+ JSON.stringify(retObj))
        DataManager.familyDetail = retObj
        // if (retObj.familyID) {
        //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILY_DETAIL)
        // } else {
        //     ViewManager.instance.showWnd(EnumManager.viewPath.WND_FAMILYS)
        // }
    }



    // update (dt) {}
}
