// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ViewManager from "../utils/Manager/ViewManager";
import enemyHeroItem from "./enemyHeroItem";
import heroItem from "./heroItem";
import soliderItem from "./soliderItem";

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

    // mySolider

    // otherSolider

    /**进攻方 */
    attacker: string

    myData: any

    enemyData: any

    myAttIdx = 0
    enemyAttIdx = 0

    myAttackList = []
    enemyAttackList = []
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

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

    getMyPlusList() {
        let template_id = this.myData.heroData.template_id
        let skills = DataManager.GameData.Cards[template_id].skills
        let proficiency = this.myData.heroData.proficiency
        let talents = DataManager.GameData.Cards[template_id].talents
        let plusList = []
        for (let i = 0; i < skills.length; i++) {
            let skillData = DataManager.GameData.Skill[skills[i][0]]
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
        console.log('我的将领加成：' + JSON.stringify(plusList))
        return plusList
    }

    getEnemyPlusList() {
        let skills = this.enemyData.heroData.skills
        let talents = this.enemyData.heroData.skills
        let proficiency = [1000, 1000, 1000]

        let plusList = []
        for (let i = 0; i < skills.length; i++) {
            let skillData = DataManager.GameData.Skill[skills[i][0]]
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
        console.log('敌方将领加成：' + JSON.stringify(plusList))
        return plusList
    }
    // myData:{"heroData":{"id":"150717","template_id":19,"level":1,"num":1,"exp":0,"grade":0,"unit_level":1,"unitGrade":1,"unit_type":3,"fight":3201,"physical":200,"equips":["0","0","0","0","0","0"],"unitEquips":[0,0,0,0,0],"runeUnlock":[0,1,2,4,5,3],"runePutup":[0,0,0,0,0,0,0,0],"runeLevel":[0,0,0,0,0,0,0,0],"skills_equips":[0],"proficiency":[1430,115,198],"aptitude":[481,373,213]},"soliderList":[{"arm":1,"count":106},{"arm":2,"count":0},{"arm":3,"count":0}]}

    init(myData, otherData) {
        console.log('myData:' + JSON.stringify(myData))
        console.log('otherData:' + JSON.stringify(otherData))
        for (let i = 0; i < myData.soliderList.length; i++) {
            let obj: solider = {
                arm: myData.soliderList[i].arm,
                count: myData.soliderList[i].count,
                fight: 0,
                defense: 0
            }
            myData.soliderList[i] = obj
        }

        for (let i = 0; i < otherData.soliderList.length; i++) {
            let obj: solider = {
                arm: otherData.soliderList[i].arm,
                count: otherData.soliderList[i].count,
                fight: 0,
                defense: 0
            }
            otherData.soliderList[i] = obj
        }
        this.myData = myData
        this.enemyData = otherData

        console.log('myData:' + JSON.stringify(myData))
        console.error('otherData:' + JSON.stringify(otherData))

        let myPlusList = this.getMyPlusList()

        for (let i = 0; i < myData.soliderList.length; i++) {
            myData.soliderList[i].fight += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_1
            myData.soliderList[i].fight += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_2
            myData.soliderList[i].fight += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_3

            myData.soliderList[i].defense += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_4
            myData.soliderList[i].defense += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_5
            myData.soliderList[i].defense += DataManager.GameData.Soldier[myData.soliderList[i].arm].defense.attack_6

            for (let j = 0; j < myPlusList.length; j++) {
                if (myPlusList[j].arm == myData.soliderList[i].arm) {
                    myData.soliderList[i].fight += myPlusList[j].fight
                    myData.soliderList[i].defense += myPlusList[j].defense
                }
            }
        }

        // console.log('myData:' + JSON.stringify(myData))

        let enemyPlusList = this.getMyPlusList()

        for (let i = 0; i < otherData.soliderList.length; i++) {
            otherData.soliderList[i].fight += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_1
            otherData.soliderList[i].fight += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_2
            otherData.soliderList[i].fight += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_3

            otherData.soliderList[i].defense += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_4
            otherData.soliderList[i].defense += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_5
            otherData.soliderList[i].defense += DataManager.GameData.Soldier[otherData.soliderList[i].arm].defense.attack_6

            for (let j = 0; j < enemyPlusList.length; j++) {
                if (enemyPlusList[j].arm == otherData.soliderList[i].arm) {
                    otherData.soliderList[i].fight += enemyPlusList[j].fight
                    otherData.soliderList[i].defense += enemyPlusList[j].defense
                }
            }
        }
        // console.log('enemyData:' + JSON.stringify(otherData))




        this.myContect.removeAllChildren()
        let item0 = cc.instantiate(this.heroPfb)
        item0.parent = this.myContect
        item0.getComponent(heroItem).init(myData.heroData)
        for (let i = 0; i < myData.soliderList.length; i++) {
            let item = cc.instantiate(this.soliderPfb)
            item.parent = this.myContect
            item.getComponent(soliderItem).init(myData.soliderList[i])
        }

        this.otherContect.removeAllChildren()
        let item = cc.instantiate(this.eHeroPfb)
        item.getComponent(enemyHeroItem).init(otherData.heroData)
        item.parent = this.otherContect
        for (let i = 0; i < otherData.soliderList.length; i++) {
            let item = cc.instantiate(this.soliderPfb)
            item.parent = this.otherContect
            item.getComponent(soliderItem).init(otherData.soliderList[i])
        }
        // this.myAttack(0, 0)

        let myIdx = 0
        let enemyIdx = 0

        let myAttackList = []
        let enemyAttackList = []
        console.error('otherData:' + JSON.stringify(otherData))

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

            if (myAttacknum - enemyDefensenum > 0) {//打死了这一波敌人
                enemySolider.count = 0
                data.enemyNum = 0
                myAttackList.push(data)
                console.log('我方攻击数据：' + JSON.stringify(data))
                if (enemyIdx == otherData.soliderList.length - 1) {
                    console.log(`敌方士兵全部战死，挑战成功`)
                } else {
                    enemyIdx += 1
                    enemyAttack()
                }
            } else {
                enemySolider.count = ((enemyDefensenum - myAttacknum) / enemyDefensenum) * enemySolider.count
                enemySolider.count = Math.floor(enemySolider.count)
                data.enemyNum = enemySolider.count
                myAttackList.push(data)
                console.log('我方攻击数据：' + JSON.stringify(data))
                console.log('enemySolider.count:' + enemySolider.count)
                if (enemySolider.count == 0) {
                    if (enemyIdx == otherData.soliderList.length - 1) {
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
            let mySolider: solider = myData.soliderList[myIdx]
            let enemySolider: solider = otherData.soliderList[enemyIdx]

            let enemyAttackNum = enemySolider.fight * enemySolider.count
            let myDefanceNum = mySolider.defense * mySolider.count

            let data = {
                myArm: mySolider.arm,
                enemyArm: enemySolider.arm,
                myNum: 0
            }

            if (enemyAttackNum - myDefanceNum > 0) {//我的本批士兵被消灭
                mySolider.count = 0
                data.myNum = 0
                enemyAttackList.push(data)
                console.log('敌方攻击数据：' + JSON.stringify(data))
                if (myIdx == myData.soliderList.length - 1) {
                    console.log(`我的士兵全部战死，挑战失败`)
                } else {
                    myIdx += 1
                    myAttack()
                }
            } else {
                mySolider.count = ((myDefanceNum - enemyAttackNum) / myDefanceNum) * mySolider.count
                mySolider.count = Math.floor(mySolider.count)
                data.myNum = mySolider.count
                enemyAttackList.push(data)
                console.log('敌方攻击数据：' + JSON.stringify(data))
                if (mySolider.count == 0) {
                    if (myIdx == myData.soliderList.length - 1) {
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

        console.log('myAttackList:' + JSON.stringify(myAttackList))
        console.log('enemyAttackList:' + JSON.stringify(enemyAttackList))

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

    myAttackAni() {
        if (this.myAttIdx == this.myAttackList.length) {
            console.log('我方全军覆没，挑战失败')
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

        mySolider.runAction(cc.sequence(cc.moveBy(1, cc.v2(-420, 0)), cc.callFunc(() => {
            mySolider.getComponent(sp.Skeleton).setAnimation(0, 'attack1', false)
        })))

        mySolider.getComponent(sp.Skeleton).setCompleteListener((trackEnery, loopCount) => {
            let aniName: string = trackEnery.animation.name
            aniName = aniName.slice(0, aniName.length - 1);
            if (aniName == 'attack') {
                this.posMy.zIndex = 0
                this.posEnemy.zIndex = 1
                // mySolider.getComponent(sp.Skeleton).setAnimation(0, 'victory', false)
                if (enemyCount == 0) {
                    otherSolider.getComponent(sp.Skeleton).setAnimation(0, 'dead', false)
                    mySolider.getComponent(sp.Skeleton).addAnimation(0, 'victory', false)
                } else {
                    otherSolider.getComponent(sp.Skeleton).setAnimation(0, 'hurt2', false)
                    mySolider.getComponent(sp.Skeleton).addAnimation(0, 'stand', false)

                    // otherSolider.getComponent(sp.Skeleton).addAnimation(0, 'attack1', false)
                    // otherSolider.getComponent(sp.Skeleton).addAnimation(0, 'victory', false)
                }
                this.updateEnemySolider(myIdx + 1, enemyCount)
            }

            if (this.attacker == 'me' && (aniName == 'victor' || aniName == 'stan')) {
                this.myAttIdx += 1
                this.otherAttackAni()
            }
        })

        // otherSolider.getComponent(sp.Skeleton).setCompleteListener((trackEnery, loopCount) => {
        //     let aniName: string = trackEnery.animation.name
        //     aniName = aniName.slice(0, aniName.length - 1);
        //     if (aniName == 'attack') {
        //         // mySolider.getComponent(sp.Skeleton).setAnimation(0, 'stand', true)
        //         mySolider.getComponent(sp.Skeleton).addAnimation(0, 'hurt2', false)
        //         mySolider.getComponent(sp.Skeleton).addAnimation(0, 'stand', false)
        //     }
        // })
    }

    otherAttackAni() {
        if (this.enemyAttIdx == this.enemyAttackList.length) {
            console.log('敌方全军覆没，挑战成功')
            return
        }
        this.posMy.removeAllChildren()
        this.posEnemy.removeAllChildren()

        let myIdx = this.enemyAttackList[this.enemyAttIdx].myArm - 1
        let otherIdx = this.enemyAttackList[this.enemyAttIdx].enemyArm - 1
        let myCount = this.enemyAttackList[this.enemyAttIdx].myNum

        console.log("otherAttackAni myIdx:" + myIdx)
        console.log("otherAttackAni otherIdx:" + otherIdx)
        console.log("otherAttackAni myCount:" + myCount)

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

        otherSolider.runAction(cc.sequence(cc.moveBy(1, cc.v2(-420, 0)), cc.callFunc(() => {
            otherSolider.getComponent(sp.Skeleton).setAnimation(0, 'attack1', false)
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

                    // mySolider.getComponent(sp.Skeleton).addAnimation(0, 'attack1', false)
                    // mySolider.getComponent(sp.Skeleton).addAnimation(0, 'victory', false)
                }
                this.updateMySolider(myIdx + 1, myCount)

            }

            if (this.attacker == 'enemy' && (aniName == 'stan' || aniName == 'victor')) {
                // if (this.enemyAttIdx == this.enemyAttackList.length) {
                //     console.log('我方全灭,挑战失败')
                // } else {
                //     this.enemyAttIdx += 1
                //     this.myAttackAni()
                // }
                this.enemyAttIdx += 1
                this.myAttackAni()
            }
        })

        // mySolider.getComponent(sp.Skeleton).setCompleteListener((trackEnery, loopCount) => {
        //     let aniName: string = trackEnery.animation.name
        //     aniName = aniName.slice(0, aniName.length - 1);
        //     if (aniName == 'attack') {
        //         otherSolider.getComponent(sp.Skeleton).addAnimation(0, 'hurt2', false)
        //         otherSolider.getComponent(sp.Skeleton).addAnimation(0, 'stand', false)
        //     }
        // })
    }

    doBack() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE)
    }

    // update (dt) {}
}