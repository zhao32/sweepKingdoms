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
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: '建筑名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '等级' })
    lvDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '升级后效果' })
    upDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '升级条件' })
    upPremiseDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '金币升级' })
    coinLabel: cc.Label = null;

    @property({ type: cc.Label, displayName: '元宝升级' })
    goldLabel: cc.Label = null;

    @property({ type: cc.Node, displayName: '建筑图片' })
    pic: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    _from: string

    /**升级后的等及 */
    grade: number = 0

    /**1:资源建筑 ，2 兵营建筑 ，3 基础建筑 */
    buildType: number = 0
    /**建筑序号 从0开始*/
    idx: number = 0

    private group: string = ''

    _name: string

    start() {
    }

    protected onDestroy(): void {

    }

    private UPBulid(retObj) {
        console.log('升级后返回：' + JSON.stringify(retObj))
        // 升级后返回：{"lv":2,"type":2}
        console.log(this.idx - 1)
        console.log('retObj back grolup:' + this.group)
        // console.log(JSON.stringify(DataManager.GameData.build[this.group]))
        console.log(JSON.stringify(DataManager.GameData.build[this.group][this.idx]))

        DataManager.GameData.build[this.group][this.idx].grade = retObj.lv
        DataManager.playData[`${this.group}_build`][this.idx - 1] = retObj.lv
        this.reInit(this._name, this._from)
        Logger.log(JSON.stringify(DataManager.GameData.build[this.group]))
    }

    init(name, from: string) {
        NetEventDispatcher.addListener(NetEvent.S2UPBulid, this.UPBulid, this)
        this.reInit(name, from)
    }

    reInit(name, from: string) {
        console.log('init this.group:' + this.group)
        this._name = name
        // let barracksList = ["军营", '盾卫训练场', '骑士训练场', '枪兵训练场', '箭手训练场', '法师训练场', '木牛工厂', '军魂祭坛', '部队强化']
        // let resourceList = ["铸币工坊", "粮草工坊", "领土中心", "技术研究所"];
        // let basicList = ["居民区", "资源仓库", "神像", "英魂墓地", "城墙"];

        let idx = 0
        if (DataManager.barracksList.indexOf(name) != -1) {
            this.group = 'barracks'
            this.buildType = 2
            for (let i = 0; i < DataManager.barracksList.length; i++) {
                if (DataManager.barracksList[i] == name) {
                    idx = i + 1
                }
            }
        }

        if (DataManager.resourceList.indexOf(name) != -1) {
            this.group = 'resource'
            this.buildType = 1
            for (let i = 0; i < DataManager.resourceList.length; i++) {
                if (DataManager.resourceList[i] == name) {
                    idx = i + 1
                }
            }
        }

        if (DataManager.basicList.indexOf(name) != -1) {
            this.group = 'basic'
            this.buildType = 3
            for (let i = 0; i < DataManager.basicList.length; i++) {
                if (DataManager.basicList[i] == name) {
                    idx = i + 1
                }
            }
        }

        if (this.buildType == 0) {
            console.error('出现错误，此时建筑为：' + name)
        }
        console.log('init this.group:' + this.group)
        this.idx = idx - 1
        console.log('grade:' + DataManager.GameData.build[this.group][idx - 1].grade)
        let grade = DataManager.GameData.build[this.group][idx - 1].grade
        this.grade = grade + 1
        let levelData = DataManager.GameData.buildUp[this.group][idx][grade - 1]
        let upLevelData = DataManager.GameData.buildUp[this.group][idx][grade]
        console.log('upLevelData:' + JSON.stringify(upLevelData))
        this.upPremiseDisplay.string = `升级条件: 玩家等级达到${levelData.unlocklevel}`
        this.upPremiseDisplay.horizontalAlign = cc.Label.HorizontalAlign.LEFT

        if (upLevelData) {
            let tipStr = ''
            if (this.group == 'basic') {
                if (idx == 1) {
                    tipStr = `每小时，提供 ${upLevelData.proportion[1]} 人口上限，每小时恢复 ${upLevelData.proportion[2]} 人口`
                } else if (idx == 2) {
                    tipStr = `保护${upLevelData.protect[0]}金币，${upLevelData.protect[1]}粮草，${upLevelData.protect[2]}晶石，不被掠夺`
                } else if (idx == 3) {
                    tipStr = `所有士兵生命值加成 ${upLevelData.protect[0]}`
                } else if (idx == 4) {
                    tipStr = `可存储 ${upLevelData.protect} 阵亡士兵的灵魂，并复活他们`
                } else if (idx == 5) {
                    tipStr = `守城士兵初始防御值加成 ${upLevelData.protect * 100}%`
                }
            } else if (this.group == 'resource') {
                if (idx == 1) {
                    tipStr = `每小时产出 ${upLevelData.species} 金币`
                } else if (idx == 2) {
                    tipStr = `每小时产出 ${upLevelData.food} 粮草`
                } else if (idx == 3) {
                    tipStr = `可占领 ${upLevelData.mine}个资源点`
                } else if (idx == 4) {
                    tipStr = `野外的资源点建筑每小时多产出 ${upLevelData.proportion[1]}%`
                }
            } else if (this.group == 'barracks') {
                if (idx == 1) {
                    tipStr = `提供 ${upLevelData.Soldier} 个士兵上限`
                } else if (idx == 8) {
                    tipStr = `可以招募特色兵种，每次招募 ${upLevelData.population}%主城人口`
                } else if (idx == 9) {
                    tipStr = `可以强化士兵的属性`
                } else {
                    tipStr = `可以招募${DataManager.GameData.Soldier[upLevelData.soldier[0]].name}，每次招募 ${upLevelData.population[1]}%主城人口`
                }
            }
            this.upDisplay.string = `升级效果: ${tipStr}`

            this.node.getChildByName('btnClose').y = -320;//this.node.getChildByName('bntUp2').y;
            this.node.getChildByName('btnUp').active = true;
            this.node.getChildByName('btnUp2').active = true;
        } else {
            this.upDisplay.string = ''
            this.upPremiseDisplay.string = '已满级'
            this.upPremiseDisplay.horizontalAlign = cc.Label.HorizontalAlign.CENTER

            this.node.getChildByName('btnClose').y = -250;//this.node.getChildByName('bntUp2').y;
            this.node.getChildByName('btnUp').active = false;
            this.node.getChildByName('btnUp2').active = false;
        }

        this.lvDisplay.string = `LV ${grade}`

        this.coinLabel.string = `金币升级${(levelData.money)}`
        this.goldLabel.string = `元宝升级${(Math.ceil(levelData.money / 10000))}`

        this._from = from
        this.nameDisplay.string = name
        ResManager.loadItemIcon(`UI/mainHome/${name}`, this.pic)
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_MAIN_UPGRADE)
        if (this._from) {
            ViewManager.instance.showWnd(this._from)
        }
    }

    onUpgrade1() {
        console.log('this.grade:' + this.grade + '  ' + this.buildType + '   ' + (parseInt(this.idx as any)))
        MyProtocols.send_C2UPBulid(DataManager._loginSocket, this.grade, this.buildType, parseInt(this.idx as any), 1)
    }


    onUpgrade2() {
        MyProtocols.send_C2UPBulid(DataManager._loginSocket, this.grade, this.buildType, parseInt(this.idx as any), 2)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2UPBulid, this.UPBulid, this)
    }

    // update (dt) {}
}
