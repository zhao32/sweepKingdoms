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

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteFrame)
    typeFrames: cc.SpriteFrame[] = [];

    @property(cc.Label)
    nameDisplay: cc.Label = null;

    @property(cc.Label)
    tipDisplay: cc.Label = null;

    @property(cc.Label)
    upPremiseDisplay: cc.Label = null;

    @property(cc.Sprite)
    bulidSprite: cc.Sprite = null;

    @property(cc.Sprite)
    typeSprite: cc.Sprite = null;

    @property({ type: cc.Label, displayName: '金币升级' })
    coinLabel: cc.Label = null;

    @property({ type: cc.Label, displayName: '元宝升级' })
    goldLabel: cc.Label = null;

    _data: any

    /**1:资源建筑 ，2 兵营建筑 ，3 基础建筑 */
    buildType: number = 0

    curIdx: number

    grade: number

    idx: number


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // this.node.on(cc.Node.EventType.TOUCH_END, () => {
        //     if (this._data.grade == 0) {
        //         if (DataManager.playData.level >= DataManager.GameData.buildUp[this._data.group][this._data.idx][this._data.grade].unlocklevel) {
        //             this.curIdx = this._data.idx
        //             MyProtocols.send_C2UPBulid(DataManager._loginSocket, 1, this.buildType, this._data.idx - 1, 1)
        //         } else {
        //             let unlocklevel = DataManager.GameData.buildUp[this._data.group][this._data.idx][this._data.grade].unlocklevel
        //             ViewManager.instance.showToast(`达到${unlocklevel}级,才能解锁该建筑`)
        //         }

        //     } else {
        //         Logger.log('打开升级窗口：' + this._data.name)
        //         ViewManager.instance.hideWnd(DataManager.curWndPath)
        //         ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_UPGRADE, ...[this._data.name, EnumManager.viewPath.WND_MAIN_BULID])
        //     }
        // }, this)
        NetEventDispatcher.addListener(NetEvent.S2UPBulid, this.UPBulid, this)
    }

    onBuildHandler() {
        if (this._data.grade == 0) {
            if (DataManager.playData.level >= DataManager.GameData.buildUp[this._data.group][this._data.idx][this._data.grade].unlocklevel) {
                MyProtocols.send_C2UPBulid(DataManager._loginSocket, 1, this.buildType, this._data.idx - 1, 1)
            } else {
                let unlocklevel = DataManager.GameData.buildUp[this._data.group][this._data.idx][this._data.grade].unlocklevel
                ViewManager.instance.showToast(`达到${unlocklevel}级,才能解锁该建筑`)
            }

        }
    }


    protected onDestroy(): void {
        NetEventDispatcher.removeListener(NetEvent.S2UPBulid, this.UPBulid, this)
    }

    UPBulid(retObj) {
        console.log('升级后返回：' + JSON.stringify(retObj))

        if (this._data.idx - 1 != retObj.idx) return
        // console.log('升级后返回：' + JSON.stringify(retObj))
        // console.log('idx:' + this.curIdx)
        // // 升级后返回：{"lv":2,"type":2}
        // console.log(`${this._data.group}:` + JSON.stringify(DataManager.GameData.build[this._data.group]))

        DataManager.GameData.build[this._data.group][this._data.idx - 1].grade = retObj.lv
        DataManager.playData[`${this._data.group}_build`][this._data.idx - 1] = retObj.lv
        // this._data.grade = retObj.lv

        // console.log('DataManager.playData:' + JSON.stringify(DataManager.playData))
        // console.log(`${this._data.group}_build:` + DataManager.playData[`${this._data.group}_build`])
        // console.log(`${this._data.group}:` + JSON.stringify(DataManager.GameData.build[this._data.group]))
        EventManager.getInstance().sendListener(EventManager.UPDATE_BULID_STATE)
        this.init(this._data)

    }

    init(data) {
        this.curIdx = data.idx
        this.idx = data.idx
        this.grade = data.grade
        console.log(`data:` + JSON.stringify(data))
        // console.log(`DataManager.GameData.bulidUp:` + JSON.stringify(DataManager.GameData.buildUp))
        ResManager.loadItemIcon(`bulidHead/${data.name}head`, this.bulidSprite.node)

        if (!this._data) this._data = data
        this.nameDisplay.string = data.name + ` Lv${data.grade}`
        this.upPremiseDisplay.string = ``

        if (data.grade == 0) {
            if (DataManager.playData.level >= DataManager.GameData.buildUp[data.group][data.idx][data.grade].unlocklevel) {
                this.tipDisplay.string = '解锁建筑'
                this.typeSprite.spriteFrame = this.typeFrames[1]
            } else {
                this.typeSprite.spriteFrame = this.typeFrames[3]
                this.tipDisplay.string = '未解锁建筑'
            }
            this.node.getChildByName(`btnUp1`).active = false
            this.node.getChildByName(`btnUp2`).active = false
            this.node.getChildByName(`btnBuild`).active = true

            this.nameDisplay.string = data.name
        } else if (data.grade == DataManager.GameData.buildUp[data.group][data.idx].length) {
            this.typeSprite.spriteFrame = this.typeFrames[2]
            this.node.getChildByName(`btnUp1`).active = false
            this.node.getChildByName(`btnUp2`).active = false
            this.node.getChildByName(`btnBuild`).active = false
        } else {
            this.typeSprite.spriteFrame = this.typeFrames[0]
            this.node.getChildByName(`btnUp1`).active = true
            this.node.getChildByName(`btnUp2`).active = true
            this.node.getChildByName(`btnBuild`).active = false
        }

        if (data.grade == 0) {
            if (data.group == 'basic') {
                this.buildType = 3
            } else if (data.group == 'resource') {
                this.buildType = 1
            } else if (data.group == 'barracks') {
                this.buildType = 2
            }
            return
        }

        let levelData = DataManager.GameData.buildUp[data.group][data.idx][data.grade - 1]
        let upLevelData = DataManager.GameData.buildUp[data.group][data.idx][data.grade]

        this.coinLabel.string = `金币升级(${(levelData.money)})`
        this.goldLabel.string = `元宝升级(${(Math.ceil(levelData.money / 10000))})`


        if (upLevelData) {
            this.upPremiseDisplay.string = `升级条件: 玩家等级达到${levelData.unlocklevel}`
        } else {
            this.upPremiseDisplay.string = `已满级`
        }


        if (data.group == 'basic') {
            this.buildType = 3
            if (data.idx == 1) {//城墙
                this.tipDisplay.string = `守城士兵初始防御值加成${levelData.protect * 100}%`
            } else if (data.idx == 2) {//居民区
                this.tipDisplay.string = `每小时,提供${levelData.proportion[1]}人口上限,每小时恢复${levelData.proportion[2]}人口`
            } else if (data.idx == 3) {//铸币工坊
                this.tipDisplay.string = `每小时产出 ${levelData.species} 金币`
            } else if (data.idx == 4) {//粮草工坊
                this.tipDisplay.string = `每小时产出 ${levelData.food} 粮草`
            } else if (data.idx == 5) {//领土中心
                this.tipDisplay.string = `可占领 ${levelData.mine}个资源点 `
            } else if (data.idx == 6) {//技术研究所
                this.tipDisplay.string = `野外的资源点建筑每小时多产出 ${levelData.proportion[1]}%`
            } else if (data.idx == 7) {//资源仓库
                this.tipDisplay.string = `保护${levelData.protect[0]}金币,${levelData.protect[1]}粮草,${levelData.protect[2]}晶石,不被掠夺`
            }
        } else if (data.group == 'resource') {
            this.buildType = 1

        } else if (data.group == 'barracks') {
            this.buildType = 2
            if (data.idx == 1) {//军营
                this.tipDisplay.string = `提供 ${levelData.Soldier} 个士兵上限`
            } else if (data.idx == 8) {//军魂祭坛
                this.tipDisplay.string = `可以招募特色兵种，每次招募 ${levelData.population}%主城人口`
            } else if (data.idx == 9) {//部队强化
                this.tipDisplay.string = `可以强化士兵的属性`
            } else if (data.idx == 10) {//神像
                this.tipDisplay.string = `所有士兵生命值加成 ${levelData.protect[0]}`
            } else if (data.idx == 11) {//英魂墓地
                this.tipDisplay.string = `可存储${levelData.protect}阵亡士兵的灵魂,并复活他们`
            } else {
                if (levelData.soldier && levelData.soldier[0]) this.tipDisplay.string = `可以招募${DataManager.GameData.Soldier[levelData.soldier[0]].name}，每次招募 ${levelData.population[1]}%主城人口`
            }
        }
    }


    onUpgrade1() {
        // console.log()
        if (this._data.idx != this.curIdx) return
        console.log('this.grade:' + this.grade + '  ' + this.buildType + '   ' + (parseInt(this.idx as any)))
        MyProtocols.send_C2UPBulid(DataManager._loginSocket, this.grade + 1, this.buildType, this.idx - 1, 1)
    }


    onUpgrade2() {
        if (this._data.idx != this.curIdx) return
        MyProtocols.send_C2UPBulid(DataManager._loginSocket, this.grade + 1, this.buildType, this.idx - 1, 2)
    }

    // update (dt) {}
}
