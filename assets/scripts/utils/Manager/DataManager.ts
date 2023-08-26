import ChatPanel from "../../ChatPanel/ChatPanel";
import wndFirendList from "../../firend/wndFirendList";
import pageGoBattle from "../../goBattle/pageGoBattle";
import wndHotelDetail from "../../hotel/wndHotelDetail";
import wndJB from "../../jibao/wndJB";
import wndMail from "../../mail/wndMail";
import Main from "../../Main";

interface playData {
    id: number,
    account_id: string,
    server_id: number,
    name: string,
    sex: number,
    level: number,
    icon: number,
    head_frame: number,
    level_exp: number,
    /**兵力 */
    troops: number,
    population: number,
    coinMoney: null,
    goldMoney: null,
    food: number,
    vip_level: number,
    vip_exp: number,
    honor: number,
    stamina: number,
    nation_id: number,
    formationSlots: number,
    formationStatus: number[],
    team_skills: number[],
    offline_minutes: number,
    offline_add_level: number,
    offline_rewards: [],
    /** 1 军营 2 盾卫 3 骑士 4 枪兵 5 箭手 6 法师 7 木牛 8 军魂  9 士兵强化塔*/
    barracks_build: number[],
    /**1 筑币 2 粮草 3 领土 4 技术研究所 */
    resource_build: number[],
    /**1 居民 2 资源仓库 3 战神像 4 英魂墓地 5 城墙 */
    basic_build: number[],
    /**军队数量 */
    military_data: number[],
    storgleave_data: any[]


}

// {"familyID":12,"familyName":"aa","familyIcon":0,"familyNum":0,"familyLv":1,"familyExp":2,"familyKill":3,"familyFight":4,"contribution":5,"reputation":6,"aim":"家族说明","notice":"家族宗旨"}
interface familyData {
    familyID: number,
    familyName: string,
    familyIcon: number,
    familyNum: number,
    familyLv: number,
    familyExp: number,
    familyKill: number,
    familyFight: number,
    contribution: number,
    reputation: number,
    aim: string,
    notice: string,
    familyChiefName: string,
    familyChiefID: string,
    autoEnter: number
}

export default class DataManager {
    // retObj:{"id":9902,"account_id":"4682","server_id":1,"name":"丹阳游侠","sex":1,"level":74,"icon":194,"head_frame":1,"level_exp":14465,"fight":654920,"money":94081075,"gameMoney":692867744,"energy":494,"vip_level":13,"vip_exp":1002099996,"honor":8000,"stamina":6539,"nation_id":2,"formationSlots":10,"formationStatus":[],"team_skills":[9,8,9,9],"offline_minutes":0,"offline_add_level":0,"offline_rewards":[]}

    //单例唯一实例
    private static _instance: DataManager = null;
    // static playerData: any;
    public static get instance(): DataManager {
        if (!this._instance) {
            this._instance = new DataManager();
        }
        return this._instance;
    }

    public bIsOpenMusic: boolean = true
    public bIsOpenSound: boolean = true
    public bIsOpenShake: boolean = true

    public static curWndPath: string = null

    static Main: Main = null

    static _loginSocket: any

    session_id: number = 0

    public static playData: playData = {
        id: null,
        account_id: null,
        server_id: null,
        name: null,
        sex: null,
        level: null,
        icon: null,
        head_frame: null,
        level_exp: null,
        troops: null,
        population: null,
        coinMoney: null,
        goldMoney: null,
        food: null,
        vip_level: null,
        vip_exp: null,
        honor: null,
        stamina: null,
        nation_id: null,
        formationSlots: null,
        formationStatus: null,
        team_skills: null,
        offline_minutes: null,
        offline_add_level: null,
        offline_rewards: null,
        /** 1 军营 2 盾卫 3 骑士 4 枪兵 5 箭手 6 法师 7 木牛 8 军魂  9 士兵强化塔*/
        barracks_build: [],
        /**1 筑币 2 粮草 3 领土 4 技术研究所 */
        resource_build: [],
        /**1 居民 2 资源仓库 3 战神像 4 英魂墓地 5 城墙 */
        basic_build: [],
        /**军队数量 */
        military_data: [],
        /**兵种强化数据 */
        storgleave_data: []

    }

    static familyDetail: familyData = {
        familyID: 0,
        familyName: '',
        familyIcon: 0,
        familyNum: 0,
        familyLv: 0,
        familyExp: 0,
        familyKill: 0,
        familyFight: 0,
        contribution: 0,
        reputation: 0,
        aim: '',
        notice: '',
        familyChiefID: '',
        familyChiefName: '',
        autoEnter: 0
    }

    static group(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while (index < array.length) {
            newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
    }



    /**错误码信息 */
    // public static errCodeData = {}

    static GameData = {
        zh: {},
        /**兵种信息 */
        Soldier: {},
        /**建筑信息 */
        build: {},
        /**建筑升级表 */
        buildUp: {},
        /** 副本数据 */
        Stages: [],
        /**将领数据 */
        Cards: {},
        /**将魂 */
        CardFrags: {},
        /**将领等级 */
        CardLevels: {},
        /**技能表 */
        Skill: {},
        // Mine:[]
        /**礼包 */
        Boxes: {},
        /** 消耗品*/
        Consumes: {},
        /**装备还原 胚体升级数据 */
        Enhanceconfig: {},

        /**道具 */
        Items: {},
        /**技能 */
        packSkills: {},
        /**将魂 */
        packGeneralPice: {},
        /**符石 */
        Runes: {

        },
        /**装备 */
        Equips: {},
        /**装备碎片 */
        EquipFrags: {},
        /**宝物 */
        Treasures: {},
        /**商店 */
        goods: {},
        /**学习技能 */
        SkillStudy: {},
        /**邮件 */
        Mail: {},
        /**跑马灯 */
        Marquee: {},
        /**兵种属性加成 */
        soliderStren: {},
        /**矿场矿石 */
        MineStone: {},
        /**数值奖励 */
        bonus: {}
    }
    /**我的将表 */
    static cardsList = []

    static maillist = []

    /**我的副本信息 */
    static stagesData: any
    // {
    //     "chapters": [{
    //         "stages": [{
    //             "star": 3,
    //             "times": 5,
    //             "is_get_award": false
    //         }],
    //         "star_award": []
    //     }],
    //     "chapters_elite": [],
    //     "formation": {
    //         "fid": 0,
    //         "formationId": 1,
    //         "forward": 1,
    //         "flip": 0,
    //         "a": 0,
    //         "b": 73,
    //         "c": 5,
    //         "d": 0,
    //         "e": 0,
    //         "f": 0,
    //         "g": 0,
    //         "h": 0,
    //         "i": 0,
    //         "j": 0
    //     },
    //     "elite_count": 5,
    //     "crawl_state": 10
    // }

    /**国家类型 */
    static readonly countyList = ['无', '魏', '燕', '秦', '赵', '齐', '韩', '楚']
    /**兵种类型 */
    static readonly armList = ['', '盾', '骑', '枪', '弓', '法']

    // 1 砍防  2 砍功  3 穿防 4 穿攻 5 法功   6法防
    /**技能属性索引 */
    static readonly skillAttributeList = ['', '挥砍防御', '挥砍攻击', '穿透防御', '穿透攻击', '法术攻击', '法术防御']

    static readonly barracksList = ["军营", '盾卫训练场', '骑士训练场', '枪兵训练场', '箭手训练场', '法师训练场', '木牛工厂', '军魂祭坛', '部队强化']
    static readonly resourceList = ["铸币工坊", "粮草工坊", "领土中心", "技术研究所"];
    static readonly basicList = ["居民区", "资源仓库", "神像", "英魂墓地", "城墙"];
    static readonly qualityList = ['', '上古', '传奇', '天选', '无双', '名将']

    /**矿区基本信息 */
    static mineData = {
        101: {
            name: "主城",
        },
        102: {
            name: "重镇",
            prize: [
                '开启奖励: 随机两字技能*3，无双魂*1.名将魂*4，武器/战甲图纸*1，重镇之石*1；\n支援奖励: 两字技能*1，名将魂*1，重镇之石*1'
            ],
            soliders: [{ arm: 13, count: 500 }, { arm: 14, count: 500 }, { arm: 15, count: 500 }, { arm: 16, count: 1000 }, { arm: 17, count: 5000 }]
        },
        103: {
            name: "名城",
            prize: [
                '开启奖励: 随机三字技能*4，天选魂*1，无双魂4，武器/战甲图纸*3，名称晶石*1，传奇卷轴*1；\n支援奖励:三字技能*1，无双魂*1，名称晶石*1'
            ],
            soliders: [{ arm: 13, count: 500 }, { arm: 14, count: 500 }, { arm: 15, count: 500 }, { arm: 16, count: 1000 }, { arm: 17, count: 5000 }]
        },
        104: {
            name: "圣都",
            prize: [
                '开启奖励: 随机四字技能*6，天选魂*1/*2/*5，武器/战甲图纸*10，圣都碧玉*1 传奇卷轴*3，四字技能残叶*8；\n支援奖励:四字技能残叶*4，天选魂*1，圣都碧玉*1，传奇卷轴*1'
            ],
            soliders: [{ arm: 13, count: 500 }, { arm: 14, count: 500 }, { arm: 15, count: 500 }, { arm: 16, count: 1000 }, { arm: 17, count: 5000 }]
        },
        105: {
            name: "特殊",
            prize: [
                "开启奖励: 随机四字技能残页*6，武器/衣服图纸*12，传奇卷轴*1，随机四字能*9，固定天选魂*7 (每个魂各一个) 支援奖励: 随机四字技能1，传奇卷韩*1，固定天选魂*7 (每个魂各一个)",
                "开启奖励:单挑令*18，随机大量晶石，大量金币粮食，财神古币*15。支援奖励: 保底50w金币+50w粮食，财神古币*1"
            ],
            soliders: [{ arm: 13, count: 500 }, { arm: 14, count: 500 }, { arm: 15, count: 500 }, { arm: 16, count: 1000 }, { arm: 17, count: 5000 }]
        },
        106: {
            name: "遗迹",
            prize: [
                "开启奖励: 黄金年兽蛋*3，年兽蛋*10，小年兽蛋*12，武器/衣服图纸*18，传奇卷轴*20，随机四字技能书*18，随机天选将魂*20，遗迹之心*20；\n支援奖励:奖励根据支援家的死广兵力决定奖励比例归属，每个玩家保底传奇卷轴*1，随机四字技能*1，随机天选将魂*1，遗迹之心*1",
                "开启奖励: 喇叭*20，传奇卷轴*20，上古卷轴*8，玄女魂*4，五字碎片*15，随机四字技能*5，随机五字技能*1/*2，遗迹之心*20；\n支援奖励:奖励根据支援玩家的死亡县力决定奖励比例归属，每个玩家保底: 传奇卷轴1，喇叭*1，遗迹之心*1",
                "开启奖励: 喇叭*12，天照之火*20，传奇卷轴*20，上古卷轴*8，随机四字技*5，随机五字技能*1/*2，皇帝魂*4，遗迹之心*20；\n支援奖励:奖励根据支援玩家的死一兵决定奖励比例归属，每个玩家保底: 传奇卷轴1，喇叭*1，遗迹之心*1",
            ],
            soliders: [{ arm: 13, count: 500 }, { arm: 14, count: 500 }, { arm: 15, count: 500 }, { arm: 16, count: 1000 }, { arm: 17, count: 5000 }]
        },
        0: {
            name: "",
        },
        1: {
            name: "魏国矿",
        },
        2: {
            name: "燕国矿",
        },
        3: {
            name: "秦国矿",
        },
        4: {
            name: "赵国矿",
        },
        5: {
            name: "齐国矿",
        },
        6: {
            name: "韩国矿",
        },
        7: {
            name: "楚国矿",
        },
        8: {
            name: "农田",
        },
        9: {
            name: "金矿",
        },
    }

    static getName(data) {
        let name: string
        if (data.group == 106) {
            if (data.country == 1) {
                //华夏遗迹
                name = '华夏遗迹'
            } else if (data.country == 4) {
                //蓬莱遗迹
                name = '蓬莱遗迹'
            } else if (data.country == 6) {
                //归墟遗迹
                name = '归墟遗迹'
            }
        } else if (data.group == 105) {
            if (data.country == 2) {
                //上古战场
                name = "上古战场"
            } else if (data.country == 7) {
                //财神庙
                name = "财神庙"
            }
        } else {
            name = DataManager.mineData[data.group].name
        }
        return name
    }


    static myBattleFiledConfig = { card: [], soliders: [] }

    getDateDis(sTime: any, eTime: any) {
        //将日期字符串转换为时间戳
        //作为除数的数字
        var divNumSecond = 1000;
        const second = (eTime - sTime) / (divNumSecond)
        return second
    }

    static readonly SCROLLTIME1: number = 0.25
    static readonly SCROLLTIME2: number = 0.2

    static pageGoBattle: pageGoBattle

    curRuneList = []

    /**存储背包里所有道具 */
    itemsList = []

    static wndHotelDetail: wndHotelDetail

    static wndMail: wndMail

    static ChatPanel: ChatPanel

    static wndJB: wndJB

    static wndFirendList: wndFirendList



    /**当前矿的守卫详情信息 */
    static curMineDetailData = null

    static fightType: number = 0

    /**获取将的详情提示 */
    static getGeneralDes(template_id, id) {
        let defaultData = DataManager.GameData.Cards[template_id]
        let cardInfo;
        for (let i = 0; i < DataManager.cardsList.length; i++) {
            if (id == DataManager.cardsList[i].id) {
                cardInfo = DataManager.cardsList[i]
            }
        }

        let str = defaultData.name + '\n'
        str += `品质：${DataManager.qualityList[defaultData.quality]}\n`
        str += `将领等级：${cardInfo.level}级\n`
        str += `将领星级：${cardInfo.grade}星\n`

        let solider = ''
        for (let i = 0; i < cardInfo.talents.length; i++) {
            solider += DataManager.armList[cardInfo.talents[i]] + '兵 '

        }
        str += `熟练兵种：${solider}`
        return str
    }
    /**获取兵的详情提示 */
    static getSoliderDes(data) {
        // let data = DataManager.GameData.Soldier[key]
        let str = `兵种名称  ${data.name}  兵种国籍  ${DataManager.countyList[data.country]}\n挥砍攻击  ${data.defense.attack_1} 穿刺攻击  ${data.defense.attack_2}\n法术攻击  ${data.defense.attack_3} 挥砍防御  ${data.defense.attack_4}\n穿刺防御  ${data.defense.attack_5} 法术防御  ${data.defense.attack_6}`
        return str
    }
}
