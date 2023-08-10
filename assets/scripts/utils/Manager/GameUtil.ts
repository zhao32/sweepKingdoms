import DataManager from "./DataManager";
import ResManager from "./ResManager";

export default class GameUtil {

    //单例唯一实例
    private static _instance: GameUtil = null;
    public static get instance(): GameUtil {
        if (!this._instance) {
            this._instance = new GameUtil();
        }
        return this._instance;
    }

    public bIsOpenMusic: boolean = true
    public bIsOpenSound: boolean = true

    public static isPause: boolean = false

    public static _isPlaying: boolean = false


    static addPfbNode(path: string, parent, posX, container) {
        let name = ResManager.Instance.getResourcesName(path);
        let viewNode: cc.Node = null// this.UIRoot.getChildByName(name);
        ResManager.Instance.loadPrefab(path,
            (err, resource) => {
                if (ResManager.Instance.hasNode(name)) {
                    viewNode = ResManager.Instance.getNode(name);
                } else {
                    viewNode = cc.instantiate(resource);
                }
                viewNode.parent = parent
                viewNode.x = posX
                viewNode.y = 0
                viewNode.zIndex = -1
                container.push(viewNode)
            });
    }

    static numberToTime(num: number) {
        let fen = Math.floor(num / 60).toString()
        if (fen.length == 1) fen = '0' + fen
        let miao = (num % 60).toString()
        if (miao.length == 1) miao = '0' + miao
        return `${fen}:${miao}`
    }

    static group(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while (index < array.length) {
            newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
    }

    static deepClone(obj) {
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

    getPlusAttriList(data) {
        if (!data.heroData) {
            // [{"arm":3,"fight":0,"defense":334.96},{"arm":1,"fight":0,"defense":22.95},{"arm":2,"fight":0,"defense":28.810000000000002}]
            let list = []
            for (let i = 0; i < data.soliderList.length; i++) {
                list.push({ arm: data.soliderList.arm, fight: 0, defense: 0 })
            }
            return list
        }
        let template_id = data.heroData.template_id
        let skills = DataManager.GameData.Cards[template_id].skills
        let proficiency = data.heroData.proficiency
        let talents = data.heroData.talents//DataManager.GameData.Cards[template_id].talents
        let plusList = []

        //装备加成
        let equips = data.heroData.equips
        if (equips) {
            for (let j = 0; j < equips.length; j++) {
                let equipData
                for (let i = 0; i < DataManager.instance.itemsList.length; i++) {
                    if (DataManager.instance.itemsList[i].uuid == equips[j]) {
                        equipData = DataManager.GameData.Equips[DataManager.instance.itemsList[i].template_id]
                    }
                }

                if (equipData) {
                    console.log(`---------------`)
                    for (let i = 0; i < data.soliderList.length; i++) {
                        let soliderData = DataManager.GameData.Soldier[data.soliderList[i].arm]
                        let armType = soliderData.arm
                        if (data.heroData.talents.indexOf(armType) != -1) {
                            if (soliderData.defense.attack_1 != 0) {
                                data.soliderList[i].fight += equipData.defense.attack_1
                                data.soliderList[i].fight += soliderData.defense.attack_1 * equipData.defense_percent.attack_1
                            }
                            if (soliderData.defense.attack_2 != 0) {
                                data.soliderList[i].fight += equipData.defense.attack_2
                                data.soliderList[i].fight += soliderData.defense.attack_2 * equipData.defense_percent.attack_2
                            }
                            if (soliderData.defense.attack_3 != 0) {
                                data.soliderList[i].fight += equipData.defense.attack_3
                                data.soliderList[i].fight += soliderData.defense.attack_3 * equipData.defense_percent.attack_3
                            }

                            if (soliderData.defense.attack_4 != 0) {
                                data.soliderList[i].defense += equipData.defense.attack_4
                                data.soliderList[i].defense += soliderData.defense.attack_4 * equipData.defense_percent.attack_4
                            }
                            if (soliderData.defense.attack_5 != 0) {
                                data.soliderList[i].defense += equipData.defense.attack_5
                                data.soliderList[i].defense += soliderData.defense.attack_5 * equipData.defense_percent.attack_5
                            }
                            if (soliderData.defense.attack_6 != 0) {
                                data.soliderList[i].defense += equipData.defense.attack_6
                                data.soliderList[i].defense += soliderData.defense.attack_6 * equipData.defense_percent.attack_6
                            }
                        }
                    }
                }
            }
        }

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

    getMyTeamSkill(skills): number {
        let canUseSkills = []
        for (let i = 0; i < skills.length; i++) {
            if (skills[i].id > 0) {
                canUseSkills.push(skills[i])
            }
        }
        let skill = canUseSkills[Math.floor(Math.random() * canUseSkills.length)]
        if (!skill) {
            return 0
        } else {
            let rate = Math.random() * 1
            if (rate > 0.2) {
                return skill.id
            } else {
                return 0
            }
        }
    }


    /**士兵强化加成 */
    resetSoliderStren() {
        for (let i = 0; i < DataManager.playData.storgleave_data.length; i++) {
            let idx = DataManager.playData.storgleave_data[i].type
            if (DataManager.GameData.Soldier[idx].defense.attack_1 > 0) DataManager.GameData.Soldier[idx].defense.attack_1 *= 1 + DataManager.GameData.soliderStren[1].plus[DataManager.playData.storgleave_data[i].lv[0]] * 0.01
            if (DataManager.GameData.Soldier[idx].defense.attack_2 > 0) DataManager.GameData.Soldier[idx].defense.attack_2 *= 1 + DataManager.GameData.soliderStren[2].plus[DataManager.playData.storgleave_data[i].lv[1]] * 0.01
            if (DataManager.GameData.Soldier[idx].defense.attack_3 > 0) DataManager.GameData.Soldier[idx].defense.attack_3 *= 1 + DataManager.GameData.soliderStren[3].plus[DataManager.playData.storgleave_data[i].lv[2]] * 0.01
            if (DataManager.GameData.Soldier[idx].defense.attack_4 > 0) DataManager.GameData.Soldier[idx].defense.attack_4 *= 1 + DataManager.GameData.soliderStren[4].plus[DataManager.playData.storgleave_data[i].lv[3]] * 0.01
            if (DataManager.GameData.Soldier[idx].defense.attack_5 > 0) DataManager.GameData.Soldier[idx].defense.attack_5 *= 1 + DataManager.GameData.soliderStren[5].plus[DataManager.playData.storgleave_data[i].lv[4]] * 0.01
            if (DataManager.GameData.Soldier[idx].defense.attack_6 > 0) DataManager.GameData.Soldier[idx].defense.attack_6 *= 1 + DataManager.GameData.soliderStren[6].plus[DataManager.playData.storgleave_data[i].lv[5]] * 0.01
        }
    }

}

