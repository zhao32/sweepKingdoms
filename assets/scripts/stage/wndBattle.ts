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

    @property(cc.Node)
    btnReward: cc.Node = null;

    @property(cc.Node)
    btnReacord: cc.Node = null;

    @property(cc.SpriteFrame)
    btnFrames: cc.SpriteFrame[] = [];

    @property(cc.Node)
    rewardContect: cc.Node = null;

    @property(cc.Node)
    recordContect: cc.Node = null;


    @property(cc.Prefab)
    rewardPfb: cc.Prefab = null;


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

    myCount = {
        troops: 0,
        hurt: 0
    }

    enemyCount = {
        troops: 0,
        hurt: 0
    }

    battleInfo: string = ''
    // onLoad () {}

    groupIdx: number

    stageIdx: number

    startTime: number

    isSkip: boolean = false

    moveTime: number = 0.6

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
        let talents = this.myData.heroData.talents//DataManager.GameData.Cards[template_id].talents
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
        // console.log(`this.enemyData:` + JSON.stringify(this.enemyData))
        let skills = this.enemyData.heroData.skills
        let talents = this.enemyData.heroData.talents
        let proficiency = [1000, 1000, 1000]// this.enemyData.heroData.proficiency //[1000, 1000, 1000]

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
    // myData:{"heroData":{"id":"150717","template_id":19,"level":1,"num":1,"exp":0,"grade":0,"unit_level":1,"grade":1,"unit_type":3,"fight":3201,"physical":200,"equips":["0","0","0","0","0","0"],"unitEquips":[0,0,0,0,0],"runeUnlock":[0,1,2,4,5,3],"runePutup":[0,0,0,0,0,0,0,0],"runeLevel":[0,0,0,0,0,0,0,0],"skills_equips":[0],"proficiency":[1430,115,198],"aptitude":[481,373,213]},"soliderList":[{"arm":1,"count":106},{"arm":2,"count":0},{"arm":3,"count":0}]}

    S2CStageEnd(retObj) {
        console.log('S2CStageEnd:' + JSON.stringify(retObj))

        // {"chapters":[],"chapters_elite":[],"elite_count":5,"crawl_state":0}
        if (!DataManager.stagesData.chapters[retObj.group_index]) {
            DataManager.stagesData.chapters[retObj.group_index] = { "stages": [] }
        }


        // if (retObj.chapters[retObj.chapters.length -1].stages.length == DataManager.GameData.Stages[retObj.chapters.length - 1].stage.length && DataManager.GameData.Stages[retObj.chapters.length]) {
        //     retObj.chapters.push({ "stages": [] })
        // }

        if (DataManager.GameData.Stages[retObj.group_index].stage.length == retObj.stage_index + 1 && !DataManager.stagesData.chapters[retObj.group_index + 1] && DataManager.GameData.Stages[retObj.group_index + 1]) {
            DataManager.stagesData.chapters.push({ "stages": [] })
        }

        if (DataManager.stagesData.chapters[retObj.group_index].stages[retObj.stage_index]) {
            DataManager.stagesData.chapters[retObj.group_index].stages[retObj.stage_index].star = retObj.star
            DataManager.stagesData.chapters[retObj.group_index].stages[retObj.stage_index].times = retObj.times
            // DataManager.stagesData.chapters[retObj.group_index][retObj.stage_index].is_get_award = retObj.rewards.length > 0

        } else {
            let obj = { "star": retObj.star, "times": retObj.times, "is_get_award": false }
            DataManager.stagesData.chapters[retObj.group_index].stages.push(obj)
        }

        // {"group_index":0,"stage_index":0,"is_win":true,"star":2,"times":4,"rewards":[{"template_id":1104,"num":500},{"template_id":2064,"num":1},{"template_id":1006,"num":1}]}
        // this.initResultPanel()
        this.rewardContect.removeAllChildren()
        for (let i = 0; i < retObj.rewards.length; i++) {
            let id = retObj.rewards[i].template_id
            let item = cc.instantiate(this.rewardPfb)
            // if (DataManager.GameData.Items[id]) ResManager.loadItemIcon(`UI/prop/${DataManager.GameData.Items[id].name}`, item.getChildByName("pic"))
            item.getChildByName("num").getComponent(cc.Label).string = `x` + retObj.rewards[i].num
            item.parent = this.rewardContect


            let itemData
            /**礼包 */
            let keyGiftList = Object.keys(DataManager.GameData.Boxes)
            /**消耗品 */
            let keyConsList = Object.keys(DataManager.GameData.Consumes)
            let keyStoneList = Object.keys(DataManager.GameData.MineStone)
            let keyStudy = Object.keys(DataManager.GameData.SkillStudy)
            let keyBonus = Object.keys(DataManager.GameData.bonus)
            let keyItem = Object.keys(DataManager.GameData.Items)
            let keyEquipFrag = Object.keys(DataManager.GameData.EquipFrags)
            let keyCardFrag = Object.keys(DataManager.GameData.CardFrags)
            let keyRune = Object.keys(DataManager.GameData.Runes)
            let keyEquip = Object.keys(DataManager.GameData.Equips)
            let template_id = String(retObj.rewards[i].template_id)

            if (keyGiftList.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.Boxes[template_id]
            }

            if (keyConsList.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.Consumes[template_id]
            }

            if (keyEquip.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.Equips[template_id]
            }

            if (keyEquipFrag.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.EquipFrags[template_id]
            }

            if (keyStoneList.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.MineStone[template_id]
            }

            if (keyItem.indexOf(template_id) != -1) {
                itemData = DataManager.GameData.Items[template_id]
            }

            if (itemData) {
                ResManager.loadItemIcon(`UI/prop/${itemData.name}`, item.getChildByName("pic"))
            }

            if (keyCardFrag.indexOf(template_id) != -1) {
                let fragData = DataManager.GameData.CardFrags[template_id]
                ResManager.loadItemIcon(`hero/icon/${fragData.name.slice(0, -2)}`, item.getChildByName("pic"))
                // ResManager.loadItemIcon(`hero/heroHeadBg${fragData.quality - 1}`, this.node)
                // ResManager.loadItemIcon(`hero/debrisBg${fragData.quality - 1}`, this.node)
            }

            if (keyBonus.indexOf(template_id) != -1) {
                let bonusData = DataManager.GameData.bonus[template_id]
                ResManager.loadItemIcon(`UI/bonus/${bonusData.name}`, item.getChildByName("pic"))
            }

            if (keyStudy.indexOf(template_id) != -1) {
                let skillSt = DataManager.GameData.SkillStudy[template_id]
                ResManager.loadItemIcon(`skillats/${skillSt.name}`, item.getChildByName("pic"))
            }

            if (keyRune.indexOf(template_id) != -1) {
                let rune = DataManager.GameData.Runes[template_id]
                ResManager.loadItemIcon(`Rune/${rune.icon}`, item.getChildByName("pic"))
            }

        }

    }
    init(myData, otherData, groupIdx, stageIdx) {
        this.battleInfo = ''
        NetEventDispatcher.addListener(NetEvent.S2CStageEnd, this.S2CStageEnd, this)

        this.groupIdx = groupIdx
        this.stageIdx = stageIdx

        this.startTime = new Date().getTime()

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


        for (let i = 0; i < myData.soliderList.length; i++) {
            if (myData.soliderList[i].arm == 6 || myData.soliderList[i].arm == 12) {
                myData.soliderList.splice(i, 1)
            }
        }

        for (let i = 0; i < otherData.soliderList.length; i++) {
            if (otherData.soliderList[i].arm == 6 || otherData.soliderList[i].arm == 12) {
                otherData.soliderList.splice(i, 1)
            }
        }

        // console.log('myData:' + JSON.stringify(myData))
        // console.error('otherData:' + JSON.stringify(otherData))

        // let myPlusList = this.getMyPlusList()

        let grade = DataManager.GameData.build['barracks'][10 - 1].grade
        let plusHp = 0
        let levelData = DataManager.GameData.buildUp['barracks'][10][grade - 1]
        if (levelData) plusHp = levelData.protect[0]
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
        /**自学技能加成 */
        let skillstAdds = GameUtil.instance.skillstBaseAdd(this.myData.heroData)
        for (let i = 0; i < myData.soliderList.length; i++) {
            let hp = DataManager.GameData.Soldier[myData.soliderList[i].arm].hp + plusHp

            for (let j = 0; j < skillstAdds.length; j++) {
                if (myData.soliderList[i].arm == j + 1) {
                    myData.soliderList[i].fight += skillstAdds[j].attack_1
                    myData.soliderList[i].fight += skillstAdds[j].attack_2
                    myData.soliderList[i].fight += skillstAdds[j].attack_3

                    myData.soliderList[i].defense += skillstAdds[j].attack_4 * hp
                    myData.soliderList[i].defense += skillstAdds[j].attack_5 * hp
                    myData.soliderList[i].defense += skillstAdds[j].attack_6 * hp
                }
            }
        }


        // console.log('myData:' + JSON.stringify(myData))

        let enemyPlusList = this.getEnemyPlusList()

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


        // console.log('enemyData:' + JSON.stringify(otherData))




        this.myContect.removeAllChildren()
        let item0 = cc.instantiate(this.heroPfb)
        item0.parent = this.myContect
        item0.getComponent(heroItem).init(myData.heroData)
        for (let i = 0; i < myData.soliderList.length; i++) {
            let item = cc.instantiate(this.soliderPfb)
            item.parent = this.myContect
            item.getComponent(soliderItem).init(myData.soliderList[i], myData.heroData)

            this.myCount.troops += myData.soliderList[i].count
        }

        this.otherContect.removeAllChildren()
        let item = cc.instantiate(this.eHeroPfb)
        item.getComponent(enemyHeroItem).init(otherData.heroData)
        item.parent = this.otherContect
        for (let i = 0; i < otherData.soliderList.length; i++) {
            let item = cc.instantiate(this.soliderPfb)
            item.parent = this.otherContect
            item.getComponent(soliderItem).init(otherData.soliderList[i], otherData.heroData)

            this.enemyCount.troops += otherData.soliderList[i].count

        }
        // this.myAttack(0, 0)

        let myIdx = 0
        let enemyIdx = 0

        let myAttackList = []
        let enemyAttackList = []
        console.error('otherData:' + JSON.stringify(otherData))

        let buffNum = 0

        /**我的技能 致使我的攻击力加成 */
        let myFightPlus = 0
        /**我的技能 致使我的防御力加成 */
        let myDefensePlus = 0

        /**我的技能 致使敌方的攻击力加成 */
        let eFightDis = 0
        /**我的技能 致使敌方的防御力加成 */
        let eDefenseDis = 0

        /**当前正在起作用的技能 */
        let curSkill = 0

        let self = this
        myAttack()

        function myAttack() {
            let mySolider: solider = myData.soliderList[myIdx]
            let enemySolider: solider = otherData.soliderList[enemyIdx]

            let skillid: number
            if (curSkill) {
                skillid = 0
            } else {
                skillid = GameUtil.instance.getMyTeamSkill(self.myData.heroData.skills_equips)
                curSkill = skillid
            }

            let data = {
                myArm: mySolider.arm,
                enemyArm: enemySolider.arm,
                enemyNum: 0,
                skillId: skillid
            }


            if (data.skillId) {
                let skillstData = DataManager.GameData.SkillStudy[data.skillId]
                if (buffNum == 0) buffNum = skillstData.target_num
                for (let j = 0; j < skillstData.buff_target.length; j++) {
                    // if (Math.random() * 1 < skillstData.buff_target.buff_rate) {
                    if (skillstData.buff_target[j][0] <= 6) {//基础加成
                        for (let k = 0; k < self.myData.heroData.talents.length; k++) {
                            if (skillstData.buff_target[j][2] > 0) {
                                if (self.myData.heroData.talents[k] == data.myArm) {
                                    let plus = self.myData.heroData.proficiency[k] * skillstData.buff_target[j][1] * skillstData.buff_target[j][2]
                                    console.error(`plus1：` + plus)
                                    if (skillstData.buff_target[j][0] <= 3) {
                                        if (DataManager.GameData.Soldier[data.myArm].defense[`attack_${skillstData.buff_target[j][0]}`] != 0) {
                                            myFightPlus += plus
                                        }
                                    } else {
                                        if (DataManager.GameData.Soldier[data.myArm].defense[`attack_${skillstData.buff_target[j][0]}`] != 0) {
                                            myDefensePlus += plus
                                        }
                                    }
                                }
                            } else {//敌方士兵属性降低
                                let plus = self.myData.heroData.proficiency[k] * skillstData.buff_target[j][1] * skillstData.buff_target[j][2]
                                console.error(`plus2：` + plus)
                                if (skillstData.buff_target[j][0] <= 3) {
                                    if (DataManager.GameData.Soldier[data.myArm].defense[`attack_${skillstData.buff_target[j][0]}`] != 0) {
                                        eFightDis += plus
                                    }
                                } else {
                                    if (DataManager.GameData.Soldier[data.myArm].defense[`attack_${skillstData.buff_target[j][0]}`] != 0) {
                                        eDefenseDis += plus
                                    }
                                }
                            }
                        }
                    }
                    // }
                }
                buffNum--
                if (buffNum <= 0) {
                    curSkill = 0
                    myFightPlus = 0
                    myDefensePlus = 0
                    eDefenseDis = 0
                    eFightDis = 0
                }
            }
            if (!myFightPlus) myFightPlus = 0
            if (!eDefenseDis) eDefenseDis = 0

            // console.error(`myFightPlus：` + myFightPlus)
            // console.error(`eDefenseDis：` + eDefenseDis)

            if (!myFightPlus) {
                myFightPlus = 0
            }

            if (!eDefenseDis) {
                eDefenseDis = 0
            }


            let myAttacknum = (mySolider.fight + myFightPlus) * mySolider.count
            let enemyDefensenum = (enemySolider.defense - eDefenseDis) * enemySolider.count
            if (enemyDefensenum < 0) enemyDefensenum = 0




            // let myAttacknum = mySolider.fight * mySolider.count
            // let enemyDefensenum = enemySolider.defense * enemySolider.count


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

            if (!eFightDis) {
                eFightDis = 0
            }

            if (!myDefensePlus) {
                myDefensePlus = 0
            }

            let enemyAttackNum = (enemySolider.fight + eFightDis) * enemySolider.count
            let myDefanceNum = (mySolider.defense + myDefensePlus) * mySolider.count


            // let enemyAttackNum = enemySolider.fight * enemySolider.count
            // let myDefanceNum = mySolider.defense * mySolider.count

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

        // console.log('myAttackList:' + JSON.stringify(myAttackList))
        // console.log('enemyAttackList:' + JSON.stringify(enemyAttackList))

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

        this.btnReacord.getComponent(cc.Sprite).spriteFrame = this.btnFrames[1]
        this.btnReward.getComponent(cc.Sprite).spriteFrame = this.btnFrames[0]

        this.recordContect.active = true
        this.rewardContect.active = false

        this.btnReacord.on(cc.Node.EventType.TOUCH_END, () => {
            this.btnReacord.getComponent(cc.Sprite).spriteFrame = this.btnFrames[1]
            this.btnReward.getComponent(cc.Sprite).spriteFrame = this.btnFrames[0]
            this.recordContect.active = true
            this.rewardContect.active = false
        }, this)

        this.btnReward.on(cc.Node.EventType.TOUCH_END, () => {
            this.btnReacord.getComponent(cc.Sprite).spriteFrame = this.btnFrames[0]
            this.btnReward.getComponent(cc.Sprite).spriteFrame = this.btnFrames[1]
            this.recordContect.active = false
            this.rewardContect.active = true
        }, this)



        let defaultData = DataManager.GameData.Cards[this.myData.heroData.template_id]

        console.log('this.myData:' + JSON.stringify(this.myData))

        // this.nameDisplay.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, meNode.getChildByName('head'))
        ResManager.loadItemIcon(`hero/icon/${this.enemyData.heroData.name}`, otherNode.getChildByName('head'))

        meNode.getChildByName('troops').getComponent(cc.Label).string = `兵力 x${this.myCount.troops}`
        meNode.getChildByName('hurt').getComponent(cc.Label).string = `x${this.myCount.hurt}`
        meNode.getChildByName('dead').getComponent(cc.Label).string = `x${Math.floor(this.myCount.hurt * 0.2)}`
        meNode.getChildByName('recover').getComponent(cc.Label).string = `x${this.myCount.hurt - Math.floor(this.myCount.hurt * 0.2)}`

        otherNode.getChildByName('troops').getComponent(cc.Label).string = `x${this.enemyCount.troops} 兵力`
        otherNode.getChildByName('hurt').getComponent(cc.Label).string = `x${this.enemyCount.hurt}`
        otherNode.getChildByName('dead').getComponent(cc.Label).string = `x${this.enemyCount.hurt}`
        otherNode.getChildByName('recover').getComponent(cc.Label).string = `0`

        console.log('this.battleInfo:' + this.battleInfo)
        // panel.getChildByName(`scrollView`).getComponent(cc.ScrollView).content.getComponentInChildren(cc.Label).string = this.battleInfo
        this.recordContect.getComponentInChildren(cc.Label).string = this.battleInfo


    }

    sendResult(isWin) {
        // send_C2SStageEnd: function (senderSocket, p_group_index, p_stage_index, p_is_win, p_seconds, p_hpPercent, arm_size) {
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

        console.log('this.groupIdx:' + this.groupIdx)
        console.log('stageIdx:' + this.stageIdx)
        console.log('armList:' + JSON.stringify(armList))

        // let disTime = new Date().getTime() - this.startTime
        let time = DataManager.instance.getDateDis(this.startTime, new Date().getTime())
        console.log('战斗耗时:' + time)
        MyProtocols.send_C2SStageEnd(DataManager._loginSocket, this.groupIdx, this.stageIdx, isWin, time.toFixed(0), 0, armList);

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

        if (this.myAttackList[this.myAttIdx].skillId > 0) {
            let skillNode = this.node.getChildByName(`skillat`)
            skillNode.active = true
            skillNode.opacity = 0
            let skillSt = DataManager.GameData.SkillStudy[this.myAttackList[this.myAttIdx].skillId]
            ResManager.loadItemIcon(`skillats/${skillSt.name}`, skillNode)
            skillNode.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(() => { skillNode.opacity = 255 }), cc.blink(1, 3), cc.callFunc(() => { skillNode.active = false })))
        }

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
        this.node.getChildByName('resultPanel').active = false
        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE)
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
        NetEventDispatcher.removeListener(NetEvent.S2CStageEnd, this.S2CStageEnd, this)

    }

    // update (dt) {}
}
