// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";
import situationRender from "./situationRender";

export interface solider {
    arm: number,
    count: number,
    fight: number,
    defense: number
}

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    contect: cc.Node = null;

    @property(cc.Prefab)
    situationPfb: cc.Prefab = null;

    @property(cc.Node)
    myNode: cc.Node = null;

    @property(cc.Node)
    enemyNode: cc.Node = null;

    // myCount = {
    //     troops: 0,
    //     hurt: 0
    // }

    // enemyCount = {
    //     troops: 0,
    //     hurt: 0
    // }

    _myData
    _enemyData

    battleInfo: string = ''

    start() {
        NetEventDispatcher.addListener(NetEvent.S2CPkBattleCalculate, this.S2CPkBattleCalculate.bind(this))
    }

    S2CPkBattleCalculate(data) {
        console.log(`战斗结果提交返回`)
        console.log(JSON.stringify(data))

    }

    deepClone(obj) {
        if (typeof obj !== 'object' || obj == null) { // obj==null相当于obj===null || obj===undefined
            // obj为null或undefined或者不是对象不是数组，则直接返回
            return obj
        }

        // 初始化返回结果
        let result
        if (obj instanceof Array) {
            result = []
        } else {
            result = {}
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {  // 保证key不是从原型继承来的
                result[key] = this.deepClone(obj[key]) // 递归调用
            }
        }
        return result // 返回结果
    }

    resetArmyData(data) {
        let resetData = []
        for (let i = 0; i < data.cards.length; i++) {
            let plusList = this.getsPlusList(data.cards[i])
            let soliders = this.deepClone(data.soliders)
            for (let i = 0; i < soliders.length; i++) {
                soliders[i].fight += DataManager.GameData.Soldier[soliders[i].arm].defense.attack_1
                soliders[i].fight += DataManager.GameData.Soldier[soliders[i].arm].defense.attack_2
                soliders[i].fight += DataManager.GameData.Soldier[soliders[i].arm].defense.attack_3

                soliders[i].defense += DataManager.GameData.Soldier[soliders[i].arm].defense.attack_4
                soliders[i].defense += DataManager.GameData.Soldier[soliders[i].arm].defense.attack_5
                soliders[i].defense += DataManager.GameData.Soldier[soliders[i].arm].defense.attack_6

                for (let j = 0; j < plusList.length; j++) {
                    if (plusList[j].arm == soliders[i].arm) {
                        soliders[i].fight += plusList[j].fight
                        soliders[i].defense += plusList[j].defense
                    }
                }
            }

            let rdefinetData = {
                card: data.cards[i],
                soliders: soliders
            }
            resetData.push(rdefinetData)
        }

        return resetData
    }

    sendResult(isWin: boolean) {
        this.myNode.getChildByName('result').getComponent(cc.Label).string = isWin ? "攻方胜利" : "攻方失败"
        this.enemyNode.getChildByName('result').getComponent(cc.Label).string = isWin ? "守方失败" : "攻方胜利"
        // (senderSocket, p_target_player_id, p_result, p_rand_key)
        let result = isWin ? 1 : 0
        console.log(this._enemyData.player.playerId)
        console.log(this._enemyData.player.rank_type)
        MyProtocols.send_C2SPkBattleCalculate(DataManager._loginSocket, this._enemyData.player.playerId, result, this._enemyData.player.rank_type)
    }

    init(myData = this._myData, enemyData = this._enemyData) {
        this._myData = myData
        this._enemyData = enemyData
        console.log('enemyData:' + JSON.stringify(enemyData))
        // this.myNode.getChildByName('result').getComponent(cc.Label).string = 
        this.myNode.getChildByName('nameLabel').getComponent(cc.Label).string = myData.player.name
        this.myNode.getChildByName('rankLabel').getComponent(cc.Label).string = '排名：' + myData.player.rank
        if (myData.player.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.myNode.getChildByName("icon"))
        } else if (myData.player.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.myNode.getChildByName("icon"))
        }

        for (let i = 0; i < 3; i++) {
            this.myNode.getChildByName(`head${i}`).active = false
            this.myNode.getChildByName(`bg${i}`).active = false
        }

        for (let i = 0; i < myData.cards.length; i++) {
            this.myNode.getChildByName(`head${i}`).active = true
            this.myNode.getChildByName(`bg${i}`).active = true

            if (myData.cards[i].template_id != 0) {
                let defaultData = DataManager.GameData.Cards[myData.cards[i].template_id]
                ResManager.loadItemIcon(`hero/${defaultData.name}`, this.myNode.getChildByName(`head${i}`))
                ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.myNode.getChildByName(`bg${i}`))
            }
        }



        this.enemyNode.getChildByName('nameLabel').getComponent(cc.Label).string = enemyData.player.name
        this.enemyNode.getChildByName('rankLabel').getComponent(cc.Label).string = '排名：' + enemyData.player.rank
        if (enemyData.player.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.enemyNode.getChildByName("icon"))
        } else if (enemyData.player.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.enemyNode.getChildByName("icon"))
        }

        for (let i = 0; i < 3; i++) {
            this.enemyNode.getChildByName(`head${i}`).active = false
            this.enemyNode.getChildByName(`bg${i}`).active = false
        }

        for (let i = 0; i < enemyData.cards.length; i++) {
            this.enemyNode.getChildByName(`head${i}`).active = true
            this.enemyNode.getChildByName(`bg${i}`).active = true

            if (enemyData.cards[i].template_id != 0) {
                let defaultData = DataManager.GameData.Cards[enemyData.cards[i].template_id]
                ResManager.loadItemIcon(`hero/${defaultData.name}`, this.enemyNode.getChildByName(`head${i}`))
                ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.enemyNode.getChildByName(`bg${i}`))
            }
        }

        ///////////////////////////////////////////
        let myResetData = this.resetArmyData(myData)
        let enemyResetData = this.resetArmyData(enemyData)

        console.log('myResetData:' + JSON.stringify(myResetData))
        console.log('enemyResetData:' + JSON.stringify(enemyResetData))

        // console.log(this.fightDeduction(myResetData[0].soliders, enemyResetData[0].soliders))

        // for (let i = 0;  i< myResetData.length;i ++) {
        //     for (let j = 0; j < enemyResetData.length; j++) {
        //         this.fightDeduction(myResetData[i].soldiers,enemyResetData[i].soldiers)

        //     }

        // }

        let self = this

        let myIdx = 0
        let eIdx = 0

        let resultData = []
        myAttack()
        function myAttack() {
            let result = self.fightDeduction(myResetData[myIdx].soliders, enemyResetData[eIdx].soliders, true)
            let myData = myResetData[myIdx]
            let eData = enemyResetData[eIdx]
            let defineData = {
                myData: myData,
                eData: eData,
                result: result
            }
            resultData.push(defineData)
            if (result.myWin) {
                eIdx++
                if (eIdx == enemyResetData.length) {
                    //敌方输了
                    console.log('敌方输了')
                    self.sendResult(true)
                } else {
                    myAttack()
                }
            } else {
                myIdx++
                if (myIdx == myResetData.length) {
                    //我方输了
                    console.log('我方输了')
                    self.sendResult(false)

                } else {
                    eAttack()
                }

            }
        }

        function eAttack() {
            let result = self.fightDeduction(myResetData[myIdx].soldiers, enemyResetData[eIdx].soldiers, false)
            let myData = myResetData[myIdx]
            let eData = enemyResetData[eIdx]
            let defineData = {
                myData: myData,
                eData: eData,
                result: result
            }
            resultData.push(defineData)
            if (result.myWin) {
                eIdx++
                if (eIdx == enemyResetData.length) {
                    //敌方输了
                    console.log('敌方输了')
                    self.sendResult(true)
                } else {
                    myAttack()
                }
            } else {
                myIdx++
                if (myIdx == myResetData.length) {
                    //我方输了
                    console.log('我方输了')
                    self.sendResult(false)
                } else {
                    eAttack()
                }
            }
        }

        this.contect.removeAllChildren()
        for (let i = 0; i < resultData.length; i++) {
            let item = cc.instantiate(this.situationPfb)
            item.parent = this.contect
            item.getComponent(situationRender).init(resultData[i], i + 1)
        }

        console.log("resultData:" + JSON.stringify(resultData))

    }


    fightDeduction(mySoliders, eSoliders, isAttack) {
        let myIdx = 0
        let enemyIdx = 0

        let myAttackList = []
        let enemyAttackList = []

        let myCount = {
            troops: 0,
            hurt: 0
        }

        let enemyCount = {
            troops: 0,
            hurt: 0
        }

        let result = { myWin: false, mHurt: 0, eHurt: 0 }

        let battleInfo = ''

        let self = this
        if (isAttack) {
            myAttack()
        } else {
            enemyAttack()
        }

        function myAttack() {
            let mySolider: solider = self.deepClone(mySoliders[myIdx])
            let enemySolider: solider = self.deepClone(eSoliders[enemyIdx])

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
                info = `我方${DataManager.GameData.Soldier[mySolider.arm].name}攻击敌方${DataManager.GameData.Soldier[enemySolider.arm].name},歼灭${disCount}人\n`;
                battleInfo += info
                console.log(info)
                enemyCount.hurt += disCount

                if (enemyIdx == eSoliders.length - 1) {
                    console.log(`敌方士兵全部战死，挑战成功`)
                    result = { myWin: true, mHurt: myCount.hurt, eHurt: enemyCount.hurt }
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
                battleInfo += info
                console.log(JSON.stringify(enemyCount))
                enemyCount.hurt += disCount

                console.log('enemySolider.count:' + enemySolider.count)
                if (enemySolider.count == 0) {
                    if (enemyIdx == eSoliders.length - 1) {
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
            let mySolider: solider = self.deepClone(mySoliders[myIdx])
            let enemySolider: solider = self.deepClone(eSoliders[enemyIdx])

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
                myCount.hurt += disCount
                battleInfo += info

                if (myIdx == mySoliders.length - 1) {
                    console.log(`我的士兵全部战死，挑战失败`)
                    result = { myWin: false, mHurt: myCount.hurt, eHurt: enemyCount.hurt }
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
                myCount.hurt += disCount
                battleInfo += info
                if (mySolider.count == 0) {
                    if (myIdx == mySoliders.length - 1) {
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

        return result
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }


    getsPlusList(cardData) {
        let template_id = cardData.template_id
        let skills = DataManager.GameData.Cards[template_id].skills
        let proficiency = cardData.proficiency
        let talents = DataManager.GameData.Cards[template_id].talents
        console.log('talents:' + talents)
        let plusList = []
        for (let i = 0; i < skills.length; i++) {
            let skillData = DataManager.GameData.Skill[skills[i][0]]
            console.log('skillData:' + JSON.stringify(skillData))
            let getList = this.doCount(skillData, proficiency, talents)

            for (let j = 0; j < getList.length; j++) {
                let item = getList[j]
                let hasItem = false
                for (let k = 0; k < plusList.length; k++) {
                    if (item.arm == plusList[k].arm) {
                        plusList[k].fight += item.fight
                        plusList[k].defense += item.defense
                        hasItem = true
                    }
                }
                if (!hasItem) {
                    plusList.push(item)
                }
            }
        }
        console.log('将领加成：' + JSON.stringify(plusList))
        return plusList
    }


    /**
    * 
    * @param data 技能数据
    * @param proficiency 熟练度
    * @param talents 熟练兵种
    */
    doCount(data, proficiency, talents) {
        // this.nameLabel.string = data.name
        //skillAttributeList ['', '挥砍防御', '挥砍攻击', '穿透防御', '穿透攻击', '法术攻击', '法术防御']

        // ResManager.loadItemIcon(`skills/${data.name}`, this.icon)
        // 三字奥义	熟练度减熟练度的10%	减去之后除以20		
        // 四字奥义	熟练度减熟练度的10%	减去之后除以18	减去之后除以40	
        // 五字奥义	熟练度减熟练度的10%	减去之后除以16.4	减去之后除以36	减去之后除以90
        let plusList = []
        for (let i = 0; i < talents.length; i++) {
            let plusData = {
                arm: talents[i],
                fight: 0,
                defense: 0
            }
            for (let j = 0; j < data.attribute.length; j++) {
                let num = proficiency[i] * 0.9
                if (data.name.length == 2) {
                    if (j == 0) {
                        num = num / 21
                    }
                } else if (data.name.length == 3) {
                    if (j == 0) {
                        num = num / 20
                    }
                } else if (data.name.length == 4) {
                    if (j == 0) {
                        num = num / 18
                    } else if (j == 1) {
                        if (num / 18 > 40) {
                            num = num / 18 - 40
                        } else {
                            num = num / 18 / 2
                        }
                    }
                } else if (data.name.length == 5) {
                    if (j == 0) {
                        num = num / 16.4
                    } else if (j == 1) {
                        if (num / 16.4 > 36) {
                            num = num / 16.4 - 36
                        } else {
                            num = num / 16.4 / 2
                        }
                    } else if (j == 2) {
                        if (num / 16.4 > 36) {
                            num = (num / 16.4 - 36) / 90
                        } else {
                            num = (num / 16.4 / 2) / 90
                        }
                    }
                }
                if (data.attribute[j] == 1 || data.attribute[j] == 3 || data.attribute[j] == 6) {//防御加成
                    plusData.defense += Math.floor(num * 100) / 100  //Number(num.toFixed(2))
                } else {
                    plusData.fight += Math.floor(num * 100) / 100
                }
            }
            plusList.push(plusData)
        }
        return plusList
    }

}
