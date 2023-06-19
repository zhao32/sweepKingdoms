import pageGoBattle from "../../goBattle/pageGoBattle";
import wndHotelDetail from "../../hotel/wndHotelDetail";
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
    military_data: number[]

}


export default class DataManager {
    // retObj:{"id":9902,"account_id":"4682","server_id":1,"name":"丹阳游侠","sex":1,"level":74,"icon":194,"head_frame":1,"level_exp":14465,"fight":654920,"money":94081075,"gameMoney":692867744,"energy":494,"vip_level":13,"vip_exp":1002099996,"honor":8000,"stamina":6539,"nation_id":2,"formationSlots":10,"formationStatus":[],"team_skills":[9,8,9,9],"offline_minutes":0,"offline_add_level":0,"offline_rewards":[]}

    //单例唯一实例
    private static _instance: DataManager = null;
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
        military_data: []

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
        /**将领等级 */
        CardLevels: {},
        /**技能表 */
        Skill: {},
        // Mine:[]
        /**礼包 */
        packGift: {},
        /**道具 */
        packItems: {},
        /**技能 */
        packSkills: {},
        /**将魂 */
        packGeneralPice: {}

    }
    /**我的将表 */
    static cardsList = []

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
    static readonly countyList = ['', '魏', '燕', '秦', '赵', '齐', '韩', '楚']
    /**兵种类型 */
    static readonly armList = ['', '盾', '骑', '枪', '弓', '法']

    // 1 砍防  2 砍功  3 穿防 4 穿攻 5 法功   6法防
    /**技能属性索引 */
    static readonly skillAttributeList = ['', '挥砍防御', '挥砍攻击', '穿透防御', '穿透攻击', '法术攻击', '法术防御']

    static readonly barracksList = ["军营", '盾卫训练场', '骑士训练场', '枪兵训练场', '箭手训练场', '法师', '木牛工厂', '军魂祭坛', '部队强化']
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
        },
        103: {
            name: "名城",
        },
        104: {
            name: "圣都",
        },
        105: {
            name: "特殊",
        },
        106: {
            name: "遗迹",
        },
        0: {
            name: "",
        },
        1: {
            name: "魏国矿场",
        },
        2: {
            name: "燕国矿场",
        },
        3: {
            name: "秦国矿场",
        },
        4: {
            name: "赵国矿场",
        },
        5: {
            name: "齐国矿场",
        },
        6: {
            name: "韩国矿场",
        },
        7: {
            name: "楚国矿场",
        },
        8: {
            name: "农田",
        },
        9: {
            name: "金矿",
        },
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

    wndHotelDetail:wndHotelDetail



}
