// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
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

    @property({ type: cc.Label, displayName: '描述' })
    tipDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '最高等级提示' })
    maxLVDisplay: cc.Label = null;

    @property({ type: cc.Node, displayName: '建筑图片' })
    pic: cc.Node = null;

    bulidName: string = null

    // onLoad () {}

    start() {

    }
    // 

    init(name) {
        // let barracksList = ["军营", '盾卫训练场', '骑士训练场', '枪兵训练场', '箭手训练场', '法师', '木牛工厂', '军魂祭坛', '部队强化']
        // let resourceList = ["铸币工坊", "粮草工坊", "领土中心", "技术研究所"];
        // let basicList = ["居民区", "资源仓库", "神像", "英魂墓地", "城墙"];

        if (name == '英魂墓地') {
            this.node.getChildByName(`btnReLife`).active = true
        } else {
            this.node.getChildByName(`btnReLife`).active = false
        }

        let group = ''
        let idx = 0
        if (DataManager.barracksList.indexOf(name) != -1) {
            group = 'barracks'
            for (let i = 0; i < DataManager.barracksList.length; i++) {
                if (DataManager.barracksList[i] == name) {
                    idx = i + 1
                }
            }
        }

        if (DataManager.resourceList.indexOf(name) != -1) {
            group = 'resource'
            for (let i = 0; i < DataManager.resourceList.length; i++) {
                if (DataManager.resourceList[i] == name) {
                    idx = i + 1
                }
            }
        }

        if (DataManager.basicList.indexOf(name) != -1) {
            group = 'basic'
            for (let i = 0; i < DataManager.basicList.length; i++) {
                if (DataManager.basicList[i] == name) {
                    idx = i + 1
                }
            }
        }

        console.log(`group:`+group)
        console.log(`idx:`+idx)

        let grade = DataManager.GameData.build[group][idx - 1].grade
        let levelData = DataManager.GameData.buildUp[group][idx][grade - 1]
        this.lvDisplay.string = `LV ${grade}`

        if (grade == DataManager.GameData.buildUp[group][idx].length - 1) {
            this.maxLVDisplay.string = '已达到最高等级'
            this.node.getChildByName(`btnUp`).active = false
            this.node.getChildByName(`btnClose`).x = 0
        } else {
            this.maxLVDisplay.string = ''
            this.node.getChildByName(`btnClose`).x = 150
            this.node.getChildByName(`btnUp`).x = -150
            this.node.getChildByName(`btnUp`).active = true
            this.node.getChildByName(`btnClose`).active = true
        }
        let tipStr = ''
        if (group == 'basic') {
            if (idx == 1) {
                tipStr = `守城士兵初始防御值加成 ${levelData.protect * 100}%`
            } else if (idx == 2) {//居民区
                tipStr = `每小时，提供 ${levelData.proportion[1]} 人口上限，每小时恢复 ${levelData.proportion[2]} 人口`
            } else if (idx == 3) {//铸币工坊
                tipStr = `每小时产出 ${levelData.species} 金币`
            } else if (idx == 4) {//粮草工坊
                tipStr = `每小时产出 ${levelData.food} 粮草`
            } else if (idx == 5) {//领土中心
                tipStr = `可占领 ${levelData.mine}个资源点`
            } else if (idx == 6) {//技术研究所
                tipStr = `野外的资源点建筑每小时多产出 ${levelData.proportion[1]}%`
            } else if (idx == 7) {//资源仓库
                tipStr = `保护${levelData.protect[0]}金币，${levelData.protect[1]}粮草，${levelData.protect[2]}晶石，不被掠夺`
            }

        } else if (group == 'resource') {
         
        } else if (group == 'barracks') {
          
            if (idx == 1) {
                tipStr = `提供 ${levelData.Soldier} 个士兵上限`
            } else if (idx == 8) {
                tipStr = `可以招募特色兵种，每次招募 ${levelData.population[1]}%主城人口`
            } else if (idx == 9) {
                tipStr = `可以强化士兵的属性`
            } else if (idx == 10) {//神像
                tipStr = `所有士兵生命值加成 ${levelData.protect[0]}`
            } else if (idx == 11) {//英魂墓地
                tipStr = `可存储 ${levelData.protect} 阵亡士兵的灵魂，并复活他们`
            } else {
                tipStr = `可以招募${DataManager.GameData.Soldier[levelData.soldier[0]].name}，每次招募 ${levelData.population[1]}%主城人口`
            }
        }
        this.tipDisplay.string = tipStr

        this.nameDisplay.string = name
        this.bulidName = name
        ResManager.loadItemIcon(`UI/mainHome/${name}`, this.pic)

        NetEventDispatcher.addListener(NetEvent.S2CRebirth, this.S2CRebirth, this)
    }

    S2CRebirth(data) {
        console.log('复活返回：' + JSON.stringify(data))
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_MAIN_NORMAL, true)
    }

    onUpgradeHandler() {
        ViewManager.instance.hideWnd(EnumManager.viewPath.WND_MAIN_NORMAL, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_UPGRADE, ...[this.bulidName])
    }

    onRelifeHandler() {
        // ViewManager.instance.showToast(`点击复活`)
        // MyProtocols.send_C2SRebirth(DataManager._loginSocket)
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_RECOVER)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CRebirth, this.S2CRebirth, this)

    }
}
