export default class EnumManager {

    //单例唯一实例
    private static _instance: EnumManager = null;
    public static get instance(): EnumManager {
        if (!this._instance) {
            this._instance = new EnumManager();
        }
        return this._instance;
    }

    public static AudioPath = {
        抓精灵: 'audio/抓精灵',
        未遇见精灵: 'audio/未遇见精灵',
        click: 'audio/click',
        go: 'audio/go',
        pu: 'audio/pu',
        ding: 'audio/ding',
    }

    public static viewPath = {

        GAME: 'prefabs/pageGame',

        /**登录页面 */
        PAGE_LOGIN: 'prefabs/login/loginLayer',

        PAGE_ROLE: 'prefabs/login/createrRoleLayer',

        WND_LOGIN: 'prefabs/login/wndLogin',

        /**邮箱 */
        WND_MAIL: 'prefabs/Mail/wndMail',





        /////////////////////// 主页窗口
        WND_MAIN_ACTIVEY: 'prefabs/main/wndActivity',

        /**建造建筑 */
        WND_MAIN_BULID: 'prefabs/main/wndBulid',
        /**首页普通窗口 */
        WND_MAIN_NORMAL: 'prefabs/main/wndNormal',
        /**训练所 枪兵，盾兵 等可招募兵种*/
        WND_MAIN_ARM: 'prefabs/main/wndArm',
        /**士兵招募  比如 盾兵训练所内招募*/
        WND_MAIN_RCRUIT: 'prefabs/main/wndRecruit',
        /**招募所 */
        WND_MAIN_RECRUITOFFICE: 'prefabs/main/wndRecruitOffice',
        /**部队强化 */
        WND_MAIN_STRENGTHEN: 'prefabs/main/wndStrengthen',
        /**升级 */
        WND_MAIN_UPGRADE: 'prefabs/main/wndUpgrade',

        /**奖励 */
        WND_MAIN_REWARD: 'prefabs/main/wndReward',

        WND_MAIN_USERINFO: 'prefabs/main/wndUserInfo',

        WND_MAIN_MARKET: 'prefabs/main/wndMarket',

        WND_MAIN_RECOVER: 'prefabs/main/wndRecover',

        /**图鉴 */
        WND_MAIN_INTRO: 'prefabs/main/wndIntroduce',
        /**军队介绍 */
        WND_MAIN_INARM: 'prefabs/main/wndInArm',

        /**富豪榜 */
        WND_MAIN_RICH: 'prefabs/main/wndRich',


        

        
        ///////////////////// 酒馆
        /**酒馆 */
        WND_HOTEL: 'prefabs/hotel/wndHotel',
        /**招募 */
        WND_HOTEL_RECRUIT: 'prefabs/hotel/wndHotelRecruit',
        /**招募之外 */
        WND_HOTEL_LIST: 'prefabs/hotel/wndHeroList',

        /**将领详情 */
        WND_HOTEL_DETAIL: 'prefabs/hotel/wndHotelDetail',

        WND_HOTEL_QH: 'prefabs/hotel/wndHotelQH',

        WND_HOTEL_SJ: 'prefabs/hotel/wndHotelEat',
        /**升星 */
        WND_HOTEL_STAR: 'prefabs/hotel/wndHotelStar',
        /**传承 */
        WND_HOTEL_CC: 'prefabs/hotel/wndHotelChuanCheng',

        /////////////////////////寄宝阁
        WND_JIBAO: 'prefabs/jibao/wndJB',



        /////////////////// 背包
        WND_PACK: 'prefabs/pack/wndPack',


        /**巅峰战场 */
        WND_BATTLEFILED: 'prefabs/battleFiled/wndBattleFiled',

        /**部队比较 */
        WND_BATTLE_COMPARMY: 'prefabs/battleFiled/wndCompArmy',

        /**我的战队 */
        WND_BATTLE_MYTEAM: 'prefabs/battleFiled/wndBattleTeam',

        /**战队配置 */
        WND_BATTLE_TEAMSET: 'prefabs/battleFiled/wndBattleSet',

        /**对战结果 */
        WND_BATTLE_RESULT: 'prefabs/battleFiled/wndBattleResult',

        /**战斗页面 */
        WND_BATTLE_BATTLE: 'prefabs/battleFiled/wndBattleFiledBattle',


        /**副本 */
        WND_STAGE: 'prefabs/stage/wndStage',
        /**副本选关 */
        WND_STAGE_SELECT: 'prefabs/stage/wndStageSelect',

        /**战斗准备 */
        WND_STAGE_READY: 'prefabs/stage/wndStageReady',

        /**战斗 */
        WND_STAGE_BATTLE: 'prefabs/stage/wndBattle',

        /**出征 */
        PAGE_GOBATTLE: 'prefabs/goBattle/pageGoBattle',

        /**肥羊 */
        WND_GOBATTLE_FY: 'prefabs/goBattle/wndFeiYang',

        /**矿产农田详情 */
        WND_GOBATTLE_DETAILS: 'prefabs/goBattle/wndFiledDetails',
        /**我的主城 */
        WND_GOBATTLE_MYCITY_DETAILS: 'prefabs/goBattle/wndMyCityDetails',
        /**我的矿 */
        WND_GOBATTLE_MYMINE_DETAILS: 'prefabs/goBattle/wndMyMineDetails',

        /**战斗配置 */
        WND_GOBATTLE_CONFIG: 'prefabs/goBattle/wndGoBattleConfig',

        /**矿场 战斗页面 */
        WND_GOBATTLE_BATTLE: 'prefabs/goBattle/wndGoBattle',

        /**兵力驻扎 */
        WND_GOBATTLE_ARMYHUT: 'prefabs/goBattle/wndArmyHut',

        /**兵力调遣 */
        WND_GOBATTLE_ARMYHUTDISPATCH: 'prefabs/goBattle/wndArmyHutDispatch',

        WND_GOBATTLE_EVIGATECLOSE: 'prefabs/goBattle/wndEviGateClose',

        WND_GOBATTLE_EVIGATEOPEN: 'prefabs/goBattle/wndEviGateOpen',

        /** */
        WND_GOBATTLE_MYEVI: 'prefabs/goBattle/wndMyEviDetails',

        WND_GOBATTLE_EVI: 'prefabs/goBattle/wndEviDetails',


        /**队伍比较 */
        WND_GOBATTLE_COMPYARMY: 'prefabs/goBattle/wndBattleCompArmy',

        /**日志 */
        WND_GOBATTLE_RECORD: 'prefabs/goBattle/wndRecord',

        /**查找 */
        WND_GOBATTLE_FIND: 'prefabs/goBattle/wndFind',

        /**按玩家查找 */
        WND_GOBATTLE_FINDBYPLAYER: 'prefabs/goBattle/wndFindByPlayer',

        /**按坐标查找 */
        WND_GOBATTLE_FINDBYPOS: 'prefabs/goBattle/wndFindByPos',

        /**查找高级资源点 */
        WND_GOBATTLE_FINDHIGHT: 'prefabs/goBattle/wndFindHeight',

        /**查找特殊矿 */
        WND_GOBATTLE_FINDSPECIAL: 'prefabs/goBattle/wndFindSpecial',

        WND_GOBATTLE_FINDBACK: 'prefabs/goBattle/wndFindBack',

        /**注释弹窗 */
        NOTE_DES: 'prefabs/common/noteDes',

        NOTE_SOLIDER: 'prefabs/common/noteSolider',

        NOTE_GENERAL: 'prefabs/common/noteGeneral',

        NOTE_IN_GENERAL: 'prefabs/common/noteInGeneral',

        NOTE_IN_SKILL: 'prefabs/common/noteInSkill',

        NOTE_IN_EQUIP: 'prefabs/common/noteInEquip',


        


        /**好友系统 */
        WND_FIREND_LIST: 'prefabs/firend/wndFirendList',

        /**查询好友 */
        WND_FIREND_FIND: 'prefabs/firend/wndFirendFFind',

        /**查询敌人 */
        WND_FIREND_FIND_ENEMY: 'prefabs/firend/wndFirendEFind',

        /**添加好友 */
        WND_FIREND_ADD: 'prefabs/firend/wndFirendAdd',

        /////////////////////家族
        /**全部家族列表 */
        WND_FAMILYS: 'prefabs/family/wndFamilys',

        /**家族任务 */
        WND_FAMILY_TASK: 'prefabs/family/wndFamilyTask',

        /**家族任务详情 */
        WND_FAMILY_TASK_DETAIL: 'prefabs/family/wndFamilyTaskDetail',

        /**家族任务详情设置 */
        WND_FAMILY_OFFICE: 'prefabs/family/wndFamilyOffice',

        /**我的家族成员列表 */
        WND_FAMILY_MEMBER: 'prefabs/family/wndFamilyMember',

        /**家族商店 */
        WND_FAMILY_MARKET: 'prefabs/family/wndFamilyMarket',

        /**家族日志 */
        WND_FAMILY_LOG: 'prefabs/family/wndFamilyLogs',

        /**家族效果 */
        WND_FAMILY_EFFECT: 'prefabs/family/wndFamilyEffect',

        /**家族详情 */
        WND_FAMILY_DETAIL: 'prefabs/family/wndFamilyDetail',

        /**家族兵营 */
        WND_FAMILY_BARRACKS: 'prefabs/family/wndFamilyBarracks',

        /**家族创建 */
        WND_FAMILY_CREATE: 'prefabs/family/wndFamilyCreate',

        /**家族申请管理 */
        WND_FAMILY_APPLY_MANGER: 'prefabs/family/wndFamilyApplyManger',

        /**兵种 效果捐赠 */
        WND_FAMILY_ARM_EFF_UP: 'prefabs/family/wndFamilyArmEffUp',

        WND_CHAT: 'prefabs/ChatPanel/wndChat',


    }
}
