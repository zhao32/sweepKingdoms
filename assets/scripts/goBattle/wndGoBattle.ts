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
import GameUtil from "../utils/Manager/GameUtil";
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

    moveTime: number = 0.6

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

    isSkip: boolean = false

    start() {

    }

    S2CMineBattleCalculate(data) {
        console.log("矿场战斗返回")
        console.log(JSON.stringify(data))
        // {"level_index":0,"point_index":18,"result":0,"gain":[]}
        if (data.result == 0) {
            // ViewManager.instance.showToast('很遗憾，没有打赢')
        }
        MyProtocols.send_C2SMineList(DataManager._loginSocket, 0, DataManager.pageGoBattle.curPageIdx, DataManager.pageGoBattle.nation_id)

        // this.initResultPanel()
    }

    // /**
    //  * 
    //  * @param data 技能数据
    //  * @param proficiency 熟练度
    //  * @param talents 熟练兵种
    //  */
    // doCount(data, proficiency, talents) {
    //     // this.nameLabel.string = data.name
    //     //skillAttributeList ['', '挥砍防御', '挥砍攻击', '穿透防御', '穿透攻击', '法术攻击', '法术防御']

    //     // ResManager.loadItemIcon(`skills/${data.name}`, this.icon)
    //     // 三字奥义	熟练度减熟练度的10%	减去之后除以20		
    //     // 四字奥义	熟练度减熟练度的10%	减去之后除以18	减去之后除以40	
    //     // 五字奥义	熟练度减熟练度的10%	减去之后除以16.4	减去之后除以36	减去之后除以90
    //     let plusList = []
    //     for (let i = 0; i < talents.length; i++) {
    //         let plusData = {
    //             arm: talents[i],
    //             fight: 0,
    //             defense: 0
    //         }
    //         for (let j = 0; j < data.attribute.length; j++) {
    //             let num = proficiency[i] * 0.9
    //             if (data.name.length == 2) {
    //                 if (j == 0) {
    //                     num = num / 21
    //                 }
    //             } else if (data.name.length == 3) {
    //                 if (j == 0) {
    //                     num = num / 20
    //                 }
    //             } else if (data.name.length == 4) {
    //                 if (j == 0) {
    //                     num = num / 18
    //                 } else if (j == 1) {
    //                     if (num / 18 > 40) {
    //                         num = num / 18 - 40
    //                     } else {
    //                         num = num / 18 / 2
    //                     }
    //                 }
    //             } else if (data.name.length == 5) {
    //                 if (j == 0) {
    //                     num = num / 16.4
    //                 } else if (j == 1) {
    //                     if (num / 16.4 > 36) {
    //                         num = num / 16.4 - 36
    //                     } else {
    //                         num = num / 16.4 / 2
    //                     }
    //                 } else if (j == 2) {
    //                     if (num / 16.4 > 36) {
    //                         num = (num / 16.4 - 36) / 90
    //                     } else {
    //                         num = (num / 16.4 / 2) / 90
    //                     }
    //                 }
    //             }
    //             if (data.attribute[j] == 1 || data.attribute[j] == 3 || data.attribute[j] == 6) {//防御加成
    //                 plusData.defense += Math.floor(num * 100) / 100  //Number(num.toFixed(2))
    //             } else {
    //                 plusData.fight += Math.floor(num * 100) / 100
    //             }
    //         }
    //         plusList.push(plusData)
    //     }
    //     return plusList
    // }

    // getPlusAttriList(data) {
    //     if (!data.heroData) {
    //         // [{"arm":3,"fight":0,"defense":334.96},{"arm":1,"fight":0,"defense":22.95},{"arm":2,"fight":0,"defense":28.810000000000002}]
    //         let list = []
    //         for (let i = 0; i < data.soliderList.length; i++) {
    //             list.push({ arm: data.soliderList.arm, fight: 0, defense: 0 })
    //         }
    //         return list
    //     }
    //     let template_id = data.heroData.template_id
    //     let skills = DataManager.GameData.Cards[template_id].skills
    //     let proficiency = data.heroData.proficiency
    //     let talents = data.heroData.talents//DataManager.GameData.Cards[template_id].talents
    //     let plusList = []
    //     for (let i = 0; i < skills.length; i++) {
    //         let skillData = DataManager.GameData.Skill[skills[i][0]]
    //         let getList = this.doCount(skillData, proficiency, talents)

    //         for (let j = 0; j < getList.length; j++) {
    //             let item = getList[j]
    //             let hasItem = false
    //             for (let k = 0; k < plusList.length; k++) {
    //                 if (item.arm == plusList[k].arm) {
    //                     plusList[k].fight += item.fight
    //                     plusList[k].defense += item.defense
    //                     hasItem = true
    //                 }
    //             }
    //             if (!hasItem) {
    //                 plusList.push(item)
    //             }
    //         }
    //     }
    //     console.log('我的将领加成：' + JSON.stringify(plusList))
    //     return plusList
    // }

    // getEnemyPlusList() {
    //     if (!this.enemyData) {
    //         // [{"arm":3,"fight":0,"defense":334.96},{"arm":1,"fight":0,"defense":22.95},{"arm":2,"fight":0,"defense":28.810000000000002}]
    //         let list = []
    //         for (let i = 0; i < this.enemyData.soliderList.length; i++) {
    //             list.push({ arm: this.enemyData.soliderList.arm, fight: 0, defense: 0 })
    //         }
    //         return list
    //     }
    //     let skills = this.enemyData.heroData.skills
    //     let talents = this.enemyData.heroData.talents
    //     let proficiency = [1000, 1000, 1000]

    //     let plusList = []
    //     for (let i = 0; i < skills.length; i++) {
    //         let skillData = DataManager.GameData.Skill[skills[i][0]]
    //         let getList = this.doCount(skillData, proficiency, talents)

    //         for (let j = 0; j < getList.length; j++) {
    //             let item = getList[j]
    //             let hasItem = false
    //             for (let k = 0; k < plusList.length; k++) {
    //                 if (item.arm == plusList[k].arm) {
    //                     plusList[k].fight += item.fight
    //                     plusList[k].defense += item.defense
    //                     hasItem = true
    //                 }
    //             }
    //             if (!hasItem) {
    //                 plusList.push(item)
    //             }
    //         }
    //     }
    //     console.log('敌方将领加成：' + JSON.stringify(plusList))
    //     return plusList
    // }

    // showResult() {
    //     this.initResultPanel()
    // }

    init(myData, otherData, filedData) {
        NetEventDispatcher.addListener(NetEvent.S2CMineBattleCalculate, this.S2CMineBattleCalculate, this)

        console.log('------  -------filedData:' + JSON.stringify(filedData))
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

        let grade = DataManager.GameData.build['basic'][3 - 1].grade
        let levelData = DataManager.GameData.buildUp['basic'][3][grade - 1]
        let plusHp = levelData.protect[0]
        let myPlusList = GameUtil.instance.getPlusAttriList(myData)
        for (let i = 0; i < myData.soliderList.length; i++) {
            let hp = DataManager.GameData.Soldier[myData.soliderList[i].arm].hp + plusHp
            myData.soliderList[i].fight += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_1
            myData.soliderList[i].fight += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_2
            myData.soliderList[i].fight += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_3

            myData.soliderList[i].defense += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_4 * hp
            myData.soliderList[i].defense += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_5 * hp
            myData.soliderList[i].defense += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_6 * hp

            for (let j = 0; j < myPlusList.length; j++) {
                if (myPlusList[j].arm == myData.soliderList[i].arm) {
                    myData.soliderList[i].fight += myPlusList[j].fight
                    myData.soliderList[i].defense += myPlusList[j].defense * hp
                }
            }
        }

        if (!otherData.heroData) {
            for (let i = 0; i < otherData.soliderList.length; i++) {
                let hp = DataManager.GameData.Soldier[otherData.soliderList[i].arm].hp
                otherData.soliderList[i].fight += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_1
                otherData.soliderList[i].fight += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_2
                otherData.soliderList[i].fight += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_3

                otherData.soliderList[i].defense += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_4 * hp
                otherData.soliderList[i].defense += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_5 * hp
                otherData.soliderList[i].defense += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_6 * hp
            }
        } else {
            let enemyPlusList = GameUtil.instance.getPlusAttriList(otherData)
            for (let i = 0; i < otherData.soliderList.length; i++) {
                let hp = DataManager.GameData.Soldier[otherData.soliderList[i].arm].hp
                otherData.soliderList[i].fight += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_1
                otherData.soliderList[i].fight += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_2
                otherData.soliderList[i].fight += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_3

                otherData.soliderList[i].defense += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_4 * hp
                otherData.soliderList[i].defense += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_5 * hp
                otherData.soliderList[i].defense += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_6 * hp

                for (let j = 0; j < enemyPlusList.length; j++) {
                    if (enemyPlusList[j].arm == otherData.soliderList[i].arm) {
                        otherData.soliderList[i].fight += enemyPlusList[j].fight
                        otherData.soliderList[i].defense += enemyPlusList[j].defense * hp
                    }
                }
            }
        }

        this.myContect.removeAllChildren()
        if (myData.heroData) {
            let item0 = cc.instantiate(this.heroPfb)
            item0.parent = this.myContect
            item0.getComponent(heroItem).init(myData.heroData)
        }

        for (let i = 0; i < myData.soliderList.length; i++) {
            let item = cc.instantiate(this.soliderPfb)
            item.parent = this.myContect
            item.getComponent(soliderItem).init(myData.soliderList[i])
            this.myCount.troops += myData.soliderList[i].count
        }

        this.otherContect.removeAllChildren()
        if (otherData.heroData) {
            let item = cc.instantiate(this.eHeroPfb)
            item.getComponent(enemyHeroItem).init(otherData.heroData)
            item.parent = this.otherContect
        }

        for (let i = 0; i < otherData.soliderList.length; i++) {
            let item = cc.instantiate(this.soliderPfb)
            item.parent = this.otherContect
            item.getComponent(soliderItem).init(otherData.soliderList[i])
            this.enemyCount.troops += otherData.soliderList[i].count

        }
        // this.myAttack(0, 0)

        let myIdx = 0
        let enemyIdx = 0

        let myAttackList = []
        let enemyAttackList = []

        let self = this
        myAttack()

        function myAttack() {
            let mySolider: solider = myData.soliderList[myIdx]
            let enemySolider: solider = otherData.soliderList[enemyIdx]

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

                if (enemyIdx == otherData.soliderList.length - 1) {
                    console.log(`敌方士兵全部战死，挑战成功`)
                    self.sendResult(true)
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
                    if (enemyIdx == otherData.soliderList.length - 1) {
                        console.log(`敌方士兵全部战死，挑战成功`)
                        self.sendResult(true)
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
            let mySolider: solider = myData.soliderList[myIdx]
            let enemySolider: solider = otherData.soliderList[enemyIdx]

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

                if (myIdx == myData.soliderList.length - 1) {
                    console.log(`我的士兵全部战死，挑战失败`)
                    self.sendResult(false)
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
                    if (myIdx == myData.soliderList.length - 1) {
                        console.log(`我的士兵全部战死，挑战失败`)
                        self.sendResult(false)
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


        let defaultData = DataManager.GameData.Cards[this.myData.heroData.template_id]

        console.log('this.myData:' + JSON.stringify(this.myData))
        console.log('this.enemyData:' + JSON.stringify(this.enemyData))


        // this.nameDisplay.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, meNode.getChildByName('head'))
        if (this.enemyData.heroData) {
            ResManager.loadItemIcon(`hero/${this.enemyData.heroData.name}`, otherNode.getChildByName('head'))
        } else {
            ResManager.loadItemIcon(`soliderHead/${DataManager.GameData.Soldier[this.enemyData.soliderList[0].arm].name}`, otherNode.getChildByName('head'))
        }

        meNode.getChildByName('troops').getComponent(cc.Label).string = `兵力 x${this.myCount.troops}`
        meNode.getChildByName('hurt').getComponent(cc.Label).string = `x${this.myCount.hurt}`
        meNode.getChildByName('dead').getComponent(cc.Label).string = `x${Math.floor(this.myCount.hurt * 0.2)}`
        meNode.getChildByName('recover').getComponent(cc.Label).string = `x${this.myCount.hurt - Math.floor(this.myCount.hurt * 0.2)}`

        otherNode.getChildByName('troops').getComponent(cc.Label).string = `x${this.enemyCount.troops} 兵力`
        otherNode.getChildByName('hurt').getComponent(cc.Label).string = `x${this.enemyCount.hurt}`
        otherNode.getChildByName('dead').getComponent(cc.Label).string = `x${this.enemyCount.hurt}`
        otherNode.getChildByName('recover').getComponent(cc.Label).string = `0`

        console.log('this.battleInfo:' + this.battleInfo)
        panel.getChildByName(`scrollView`).getComponent(cc.ScrollView).content.getComponentInChildren(cc.Label).string = this.battleInfo

    }

    sendResult(isWin) {
        let armList = []
        for (let i = 0; i < this.myData.soliderList.length; i++) {
            let data = {
                arm: 0,
                count: 0
            }
            data.arm = this.myData.soliderList[i].arm
            data.count = this.myData.soliderList[i].count
            armList.push(data)
        }

        console.log('armList:' + JSON.stringify(armList))

        // let disTime = new Date().getTime() - this.startTime
        let time = DataManager.instance.getDateDis(this.startTime, new Date().getTime())
        console.log('战斗耗时:' + time)
        console.log(JSON.stringify(this.filedData))
        console.log(this.filedData.hold_player.page)

        // MyProtocols.send_C2SStageEnd(DataManager._loginSocket, this.groupIdx, this.stageIdx, isWin, time.toFixed(0), 0, armList);
        MyProtocols.send_C2SMineBattleCalculate(DataManager._loginSocket, this.filedData.hold_player.page, this.filedData.hold_player.idx, isWin, 10, DataManager.pageGoBattle.nation_id, DataManager.fightType)

    }

    myAttackAni() {
        if (this.isSkip) return
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
        if (this.isSkip) return
        if (this.enemyAttIdx == this.enemyAttackList.length) {
            console.log('敌方全军覆没，挑战成功')
            this.node.getChildByName('resultPanel').active = true
            this.node.getChildByName('resultPanel').zIndex = 10
            this.initResultPanel()
            // this.sendResult(true)
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
        // ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE)
    }

    onSkipHandler() {
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

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CMineBattleCalculate, this.S2CMineBattleCalculate, this)

    }
}
