// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import enemyHeroItem from "../battle/enemyHeroItem";
import heroItem from "../battle/heroItem";
import soliderItem from "../battle/soliderItem";
import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";



//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

export interface solider {
    arm: number,
    count: number,
    fight: number,
    defense: number
}

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.ScrollView)
    myScrollow: cc.ScrollView = null;

    @property(cc.ScrollView)
    otherScrollow: cc.ScrollView = null;

    @property(cc.Prefab)
    soliderPfb: cc.Prefab = null;

    @property(cc.Prefab)
    heroPfb: cc.Prefab = null;

    @property(cc.Prefab)
    eHeroPfb: cc.Prefab = null;

    @property(cc.Node)
    myContect: cc.Node = null;

    @property(cc.Node)
    otherContect: cc.Node = null;

    @property(cc.Node)
    posMy: cc.Node = null;

    @property(cc.Node)
    posEnemy: cc.Node = null;

    @property(cc.Prefab)
    soliderPfbList: cc.Prefab[] = [];

    /**进攻方 */
    attacker: string

    myData: any

    enemyData: any

    myAttIdx = 0
    enemyAttIdx = 0

    myAttackList = []
    enemyAttackList = []

    myCount = {
        troops: 0,
        hurt: 0
    }

    enemyCount = {
        troops: 0,
        hurt: 0
    }

    battleInfo: string = ''

    startTime: number

    filedData: any

    moveTime: number = 0.6

    isSkip: boolean = false

    start() {

    }


    init(myData, otherData, filedData) {
        this.isSkip = false
        this.moveTime = 0.6
        this.battleInfo = ''
        this.filedData = filedData
        this.startTime = new Date().getTime()

        this.myAttackList = []
        this.enemyAttackList = []

        this.myCount = {
            troops: 0,
            hurt: 0
        }

        this.enemyCount = {
            troops: 0,
            hurt: 0
        }

        this.node.getChildByName('resultPanel').active = false

        this.myData = myData
        this.enemyData = otherData

        console.log('myData:' + JSON.stringify(myData))
        console.error('otherData:' + JSON.stringify(otherData))

        this.myContect.removeAllChildren()
        let item0 = cc.instantiate(this.heroPfb)
        item0.parent = this.myContect
        item0.getComponent(heroItem).init(myData.card)
        for (let i = 0; i < myData.soliders.length; i++) {
            let item = cc.instantiate(this.soliderPfb)
            item.parent = this.myContect
            item.getComponent(soliderItem).init(myData.soliders[i])
            this.myCount.troops += myData.soliders[i].count
        }

        this.otherContect.removeAllChildren()
        if (otherData.card) {
            let item = cc.instantiate(this.eHeroPfb)
            // item.getComponent(enemyHeroItem).init(otherData.card)
            item.getComponent(enemyHeroItem).init(DataManager.GameData.Cards[otherData.card.template_id])
            item.parent = this.otherContect
        }

        for (let i = 0; i < otherData.soliders.length; i++) {
            let item = cc.instantiate(this.soliderPfb)
            item.parent = this.otherContect
            item.getComponent(soliderItem).init(otherData.soliders[i])
            this.enemyCount.troops += otherData.soliders[i].count

        }
        // this.myAttack(0, 0)

        let myIdx = 0
        let enemyIdx = 0

        let myAttackList = []
        let enemyAttackList = []

        let self = this
        myAttack()

        function myAttack() {
            let mySolider: solider = myData.soliders[myIdx]
            let enemySolider: solider = otherData.soliders[enemyIdx]

            let myAttacknum = mySolider.fight * mySolider.count
            let enemyDefensenum = enemySolider.defense * enemySolider.count

            let data = {
                myArm: mySolider.arm,
                enemyArm: enemySolider.arm,
                enemyNum: 0
            }

            let info: string
            if (myAttacknum - enemyDefensenum > 0) {//打死了这一波敌人
                let disCount = enemySolider.count
                enemySolider.count = 0
                data.enemyNum = 0
                myAttackList.push(data)
                // console.log('我方攻击数据：' + JSON.stringify(data));
                info = `我方${DataManager.GameData.Soldier[mySolider.arm].name}攻击敌方${DataManager.GameData.Soldier[enemySolider.arm].name},歼灭${disCount}人\n`;
                self.battleInfo += info
                console.log(info)
                self.enemyCount.hurt += disCount

                if (enemyIdx == otherData.soliders.length - 1) {
                    console.log(`敌方士兵全部战死，挑战成功`)
                } else {
                    enemyIdx += 1
                    enemyAttack()
                }
            } else {
                let disCount = (1 - (enemyDefensenum - myAttacknum) / enemyDefensenum) * enemySolider.count
                disCount = Math.floor(disCount) + 1
                enemySolider.count = ((enemyDefensenum - myAttacknum) / enemyDefensenum) * enemySolider.count
                enemySolider.count = Math.floor(enemySolider.count)
                data.enemyNum = enemySolider.count
                myAttackList.push(data)
                // console.log('我方攻击数据：' + JSON.stringify(data));
                info = `我方${DataManager.GameData.Soldier[mySolider.arm].name}攻击敌方${DataManager.GameData.Soldier[enemySolider.arm].name},歼灭${disCount}人\n`;
                console.log(info)
                self.battleInfo += info
                console.log(JSON.stringify(self.enemyCount))
                self.enemyCount.hurt += disCount

                console.log('enemySolider.count:' + enemySolider.count)
                if (enemySolider.count == 0) {
                    if (enemyIdx == otherData.soliders.length - 1) {
                        console.log(`敌方士兵全部战死，挑战成功`)
                    } else {
                        enemyIdx += 1
                        enemyAttack()
                    }
                } else {
                    enemyAttack()
                }
            }
        }

        function enemyAttack() {
            let mySolider: solider = myData.soliders[myIdx]
            let enemySolider: solider = otherData.soliders[enemyIdx]

            let enemyAttackNum = enemySolider.fight * enemySolider.count
            let myDefanceNum = mySolider.defense * mySolider.count

            let data = {
                myArm: mySolider.arm,
                enemyArm: enemySolider.arm,
                myNum: 0
            }

            let info: string
            if (enemyAttackNum - myDefanceNum > 0) {//我的本批士兵被消灭
                let disCount = mySolider.count
                mySolider.count = 0
                data.myNum = 0
                enemyAttackList.push(data)
                // console.log('敌方攻击数据：' + JSON.stringify(data))
                info = `敌方${DataManager.GameData.Soldier[enemySolider.arm].name}攻击我方${DataManager.GameData.Soldier[mySolider.arm].name},损失${disCount}人\n`;
                console.log(info)
                self.myCount.hurt += disCount
                self.battleInfo += info

                if (myIdx == myData.soliders.length - 1) {
                    console.log(`我的士兵全部战死，挑战失败`)
                } else {
                    myIdx += 1
                    myAttack()
                }
            } else {
                let disCount = (1 - (myDefanceNum - enemyAttackNum) / myDefanceNum) * mySolider.count
                disCount = Math.floor(disCount) + 1
                mySolider.count = ((myDefanceNum - enemyAttackNum) / myDefanceNum) * mySolider.count
                mySolider.count = Math.floor(mySolider.count)
                data.myNum = mySolider.count
                enemyAttackList.push(data)
                // console.log('敌方攻击数据：' + JSON.stringify(data))
                info = `敌方${DataManager.GameData.Soldier[enemySolider.arm].name}攻击我方${DataManager.GameData.Soldier[mySolider.arm].name},损失${disCount}人\n`;
                console.log(info)
                self.myCount.hurt += disCount
                self.battleInfo += info
                if (mySolider.count == 0) {
                    if (myIdx == myData.soliders.length - 1) {
                        console.log(`我的士兵全部战死，挑战失败`)
                    } else {
                        myIdx += 1
                        myAttack()
                    }
                } else {
                    myAttack()
                }
            }
        }

        this.myAttIdx = 0
        this.enemyAttIdx = 0

        this.myAttackList = myAttackList
        this.enemyAttackList = enemyAttackList

        this.myAttackAni()
    }

    updateMySolider(arm, count) {
        for (let i = 1; i < this.myContect.children.length; i++) {
            let soliderNode = this.myContect.children[i]
            if (arm == soliderNode.getComponent(soliderItem).arm) {
                soliderNode.getComponent(soliderItem).changeState(count)
            }
        }
    }

    updateEnemySolider(arm, count) {
        for (let i = 1; i < this.otherContect.children.length; i++) {
            let soliderNode = this.otherContect.children[i]
            if (arm == soliderNode.getComponent(soliderItem).arm) {
                soliderNode.getComponent(soliderItem).changeState(count)
            }
        }
    }

    initResultPanel() {
        let panel = this.node.getChildByName('resultPanel')
        let meNode = panel.getChildByName('iconMe')
        let otherNode = panel.getChildByName('iconEnemy')


        let defaultData = DataManager.GameData.Cards[this.myData.card.template_id]
        let defaultData1 = DataManager.GameData.Cards[this.enemyData.card.template_id]

        console.log('this.myData:' + JSON.stringify(this.myData))

        // this.nameDisplay.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, meNode.getChildByName('head'))
        ResManager.loadItemIcon(`hero/icon/${defaultData1.name}`, otherNode.getChildByName('head'))

        meNode.getChildByName('troops').getComponent(cc.Label).string = `兵力 x${this.myCount.troops}`
        meNode.getChildByName('hurt').getComponent(cc.Label).string = `x${this.myCount.hurt}`
        meNode.getChildByName('dead').getComponent(cc.Label).string = `x${Math.floor(this.myCount.hurt)}`
        meNode.getChildByName('recover').getComponent(cc.Label).string = `x${this.myCount.hurt - Math.floor(this.myCount.hurt * 0.2)}`

        otherNode.getChildByName('troops').getComponent(cc.Label).string = `x${this.enemyCount.troops} 兵力`
        otherNode.getChildByName('hurt').getComponent(cc.Label).string = `x${this.enemyCount.hurt}`
        otherNode.getChildByName('dead').getComponent(cc.Label).string = `x${this.enemyCount.hurt}`
        otherNode.getChildByName('recover').getComponent(cc.Label).string = `x 0`

        console.log('this.battleInfo:' + this.battleInfo)
        panel.getChildByName(`scrollView`).getComponent(cc.ScrollView).content.getComponentInChildren(cc.Label).string = this.battleInfo

    }

    sendResult(isWin) {
        let armList = []
        for (let i = 0; i < this.myData.soliders.length; i++) {
            let data = {
                arm: 0,
                count: 0
            }
            data.arm = this.myData.soliders[i].arm
            data.count = this.myData.soliders[i].count
            armList.push(data)
        }

        console.log('armList:' + JSON.stringify(armList))

        // let disTime = new Date().getTime() - this.startTime
        let time = DataManager.instance.getDateDis(this.startTime, new Date().getTime())
        console.log('战斗耗时:' + time)
        // MyProtocols.send_C2SStageEnd(DataManager._loginSocket, this.groupIdx, this.stageIdx, isWin, time.toFixed(0), 0, armList);
        MyProtocols.send_C2SMineBattleCalculate(DataManager._loginSocket, this.filedData.x, this.filedData.y, isWin, 10)

    }

    myAttackAni() {
        if(this.isSkip)return
        if (this.myAttIdx == this.myAttackList.length) {
            console.log('我方全军覆没，挑战失败')
            this.node.getChildByName('resultPanel').active = true
            this.node.getChildByName('resultPanel').zIndex = 10
            // this.sendResult(false)
            this.initResultPanel()
            return
        }
        this.posMy.removeAllChildren()
        this.posEnemy.removeAllChildren()
        let myIdx = this.myAttackList[this.myAttIdx].myArm - 1;
        let otherIdx = this.myAttackList[this.myAttIdx].enemyArm - 1;
        let enemyCount = this.myAttackList[this.myAttIdx].enemyNum

        console.log("myIdx:" + myIdx)
        console.log("otherIdx:" + otherIdx)
        console.log("enemyCount:" + enemyCount)

        this.posMy.zIndex = 1
        this.posEnemy.zIndex = 0

        this.attacker = 'me'
        let mySolider = cc.instantiate(this.soliderPfbList[myIdx])
        mySolider.parent = this.posMy
        mySolider.x = mySolider.y = 0

        let otherSolider = cc.instantiate(this.soliderPfbList[otherIdx])
        otherSolider.parent = this.posEnemy
        otherSolider.x = otherSolider.y = 0

        mySolider.getComponent(sp.Skeleton).setAnimation(0, 'move', true)
        otherSolider.getComponent(sp.Skeleton).setAnimation(0, 'stand', true)

        mySolider.runAction(cc.sequence(cc.moveBy(this.moveTime, cc.v2(-320, 0)), cc.callFunc(() => {
            mySolider.getComponent(sp.Skeleton).setAnimation(0, `attack${Math.floor(Math.random() * 3) + 1}`, false)
            this.posMy.zIndex = 0
            this.posEnemy.zIndex = 1
        })))

        mySolider.getComponent(sp.Skeleton).setCompleteListener((trackEnery, loopCount) => {
            let aniName: string = trackEnery.animation.name
            aniName = aniName.slice(0, aniName.length - 1);
            if (aniName == 'attack') {
                this.posMy.zIndex = 0
                this.posEnemy.zIndex = 1
                if (enemyCount == 0) {
                    otherSolider.getComponent(sp.Skeleton).setAnimation(0, 'dead', false)
                    mySolider.getComponent(sp.Skeleton).addAnimation(0, 'victory', false)
                } else {
                    otherSolider.getComponent(sp.Skeleton).setAnimation(0, 'hurt2', false)
                    mySolider.getComponent(sp.Skeleton).addAnimation(0, 'stand', false)
                }
                this.updateEnemySolider(myIdx + 1, enemyCount)
            }

            if (this.attacker == 'me' && (aniName == 'victor' || aniName == 'stan')) {
                this.myAttIdx += 1
                this.otherAttackAni()
            }
        })
    }

    otherAttackAni() {
        if(this.isSkip)return
        if (this.enemyAttIdx == this.enemyAttackList.length) {
            console.log('敌方全军覆没，挑战成功')
            this.node.getChildByName('resultPanel').active = true
            this.node.getChildByName('resultPanel').zIndex = 10
            // this.initResultPanel()
            // this.sendResult(true)
            this.initResultPanel()
            return
        }
        this.posMy.removeAllChildren()
        this.posEnemy.removeAllChildren()

        let myIdx = this.enemyAttackList[this.enemyAttIdx].myArm - 1
        let otherIdx = this.enemyAttackList[this.enemyAttIdx].enemyArm - 1
        let myCount = this.enemyAttackList[this.enemyAttIdx].myNum

        this.posMy.zIndex = 0
        this.posEnemy.zIndex = 1

        this.attacker = 'enemy'
        let mySolider = cc.instantiate(this.soliderPfbList[myIdx])
        mySolider.parent = this.posMy
        mySolider.x = mySolider.y = 0

        let otherSolider = cc.instantiate(this.soliderPfbList[otherIdx])
        otherSolider.parent = this.posEnemy
        otherSolider.x = otherSolider.y = 0

        otherSolider.getComponent(sp.Skeleton).setAnimation(0, 'move', true)
        mySolider.getComponent(sp.Skeleton).setAnimation(0, 'stand', true)

        otherSolider.runAction(cc.sequence(cc.moveBy(this.moveTime, cc.v2(-320, 0)), cc.callFunc(() => {
            otherSolider.getComponent(sp.Skeleton).setAnimation(0, `attack${Math.floor(Math.random() * 3) + 1}`, false)
            this.posMy.zIndex = 1
            this.posEnemy.zIndex = 0
        })))

        otherSolider.getComponent(sp.Skeleton).setCompleteListener((trackEnery, loopCount) => {
            let aniName: string = trackEnery.animation.name
            aniName = aniName.slice(0, aniName.length - 1);
            if (aniName == 'attack') {
                this.posMy.zIndex = 1
                this.posEnemy.zIndex = 0
                if (myCount == 0) {
                    console.log('播放死亡动画')
                    mySolider.getComponent(sp.Skeleton).setAnimation(0, 'dead', false)
                    otherSolider.getComponent(sp.Skeleton).addAnimation(0, 'victory', false)

                } else {
                    mySolider.getComponent(sp.Skeleton).setAnimation(0, 'hurt2', false)
                    otherSolider.getComponent(sp.Skeleton).addAnimation(0, 'stand', false)
                }
                this.updateMySolider(myIdx + 1, myCount)

            }

            if (this.attacker == 'enemy' && (aniName == 'stan' || aniName == 'victor')) {
                this.enemyAttIdx += 1
                this.myAttackAni()
            }
        })

    }

    doBack() {
        console.log(`--------点击返回---------`)
        this.node.getChildByName('resultPanel').active = false
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_RESULT)
    }

    onSkipHandler() {
        // this.node.getChildByName('resultPanel').active = false
        // this.posMy.children[0].stopAllActions()
        // this.posEnemy.children[0].stopAllActions()

        // this.posEnemy.children[0].getComponent(sp.Skeleton).clearTracks()
        // this.posMy.children[0].getComponent(sp.Skeleton).clearTracks()
        // ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLE_RESULT)
        this.node.getChildByName('resultPanel').active = true
        this.node.getChildByName('resultPanel').zIndex = 10
        this.initResultPanel()
        this.isSkip = true
    }

    onSpeedPlusHanlder() {
        this.moveTime = 0.3
        this.posEnemy.children[0].getComponent(sp.Skeleton).timeScale = 2
        this.posMy.children[0].getComponent(sp.Skeleton).timeScale = 2
    }
}
