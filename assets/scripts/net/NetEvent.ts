// var NetEvent = function(){
// },

export enum NetEvent {
    //发送
    C2SAssetBundleList = 10045,
    S2CGetProtoVersion = 10008,
    C2SLogin = 10013,
    C2SServerList = 10005,
    C2SSelectServer = 10019,
    C2SGetAnnounce = 10027,
    C2SQueryHasRole = 10101,
    C2SCreateCharacter = 10103,
    C2SEnterGame = 10105,
    C2SChat = 10401,
    C2SChatView = 10405,
    C2SBagItems = 10301,
    C2SSellItem = 10303,
    C2SUseItem = 10305,
    C2SExpandBag = 10309,
    C2SEquipEnhance = 10311,
    C2SEquipEnhanceAuto = 10313,
    C2SEquipEnhanceAll = 10315,
    C2SEquipRefresh = 10317,
    C2SEquipRefreshSave = 10319,
    C2STreasureEnhance = 10321,
    C2STreasureRefresh = 10323,
    C2STreasureFragCompose = 10325,
    C2SEquipFragCompose = 10327,
    C2SGmCmd = 101,
    C2SListMail = 40001,
    C2SGetAttach = 40003,
    C2SReadNewMailMsg = 40005,
    C2SDelMail = 40009,
    C2SCardList = 2001,
    C2SPubView = 1041,
    C2SPubBuy = 1043,
    C2SCardTakeOnItem = 2005,
    C2SCardTakeOffItem = 2007,
    C2SStageList = 3001,
    C2SStageEnd = 3003,
    C2SBattleFormationSave = 3005,
    C2SBoxAwardGet = 3007,
    S2CMineList = 3102,
    S2CMineEnemyDetail = 3104,
    S2CMineBattleCalculate = 3106,
    S2CMineGetAward = 3110,
    S2CMineHistory = 3112,
    S2CMineDefFormationSave = 3114,
    S2CSecretView = 3302,
    S2CSecretBattleStart = 3304,
    S2CSecretBattleEnd = 3306,
    S2CSecretGetAward = 3308,
    S2CSecretSoldierRevive = 3310,
    S2CSecretReset = 3312,
    S2CBossView = 3352,
    S2CBossGetAward = 3356,
    S2CBossBattleStart = 3358,
    PushBossBattleStatus = 3360,
    S2CBossGuwu = 3362,
    C2SListSign = 3601,
    C2SGetSignAward = 3603,
    C2STeamSkillList = 3201,
    C2STeamSkillUpgrade = 3203,
    C2SMallList = 1045,
    C2SArmyShopItemList = 1047,
    C2SArmyShopBuy = 1049,
    C2SArmyShopRefresh = 1051,
    C2SMallBuy = 1055,
    C2SMissionList = 2201,
    C2SMissionGetAward = 2203,
    C2SEliteBoxAwardGet = 3011,
    C2SElitePointAwardGet = 3013,
    C2SDailyMissionList = 3401,
    C2SDailyMissionGetAward = 3403,
    C2SCardAddLevel = 2009,
    C2SCardAddStar = 2011,
    C2SPaymentGetInfo = 4201,
    C2SPaymentBuyMoney = 4203,
    C2SPaymentBuyEnergy = 4205,
    C2SCardTrain = 2013,
    C2SCardAutoTrain = 2015,
    C2SCardUpgradeUnit = 2017,
    C2SCardCompose = 2019,
    C2SCardEquipUnit = 2021,
    C2SForge = 4601,
    C2SEquipCompose = 4603,
    C2SGuideStepSet = 10119,
    C2SBlackMarketInfo = 4401,
    C2SBlackMarketBuy = 4403,
    C2SBlackMarketRefresh = 4405,
    C2SSweepStage = 3015,
    C2SGetFirstPayAward = 10123,
    C2SGetVipGift = 10125,
    C2SOvercomeItemList = 5011,
    C2SOvercomeExchangeListRefresh = 5013,
    C2SOvercomeExchange = 5015,
    C2SArenaExchangeList = 3801,
    C2SArenaFormation = 3819,
    C2SArenaPlayerDetail = 3821,
    C2SArenaExchange = 3803,
    C2SArenaView = 3805,
    C2SArenaEnemyDetail = 3807,
    C2SArenaRefreshEnemy = 3809,
    C2SArenaBattleStart = 3811,
    C2SArenaBattleCalculate = 3813,
    C2SLuckyRankInfo = 3815,
    C2SArenaBattleRecord = 3817,
    C2SArenaTopRankView = 3823,
    C2SOvercomeInfoAll = 5001,
    C2SUserOvercomePassStage = 5005,
    C2SOvercomeClaimReward = 5007,
    C2SOvercomeReset = 5009,
    C2SActivitiesView = 5201,
    C2SActivitiesBattlePass = 5203,
    C2SActivitiesClaimAward = 5205,
    C2SActivitiesBattleBuyTicket = 5207,
    C2SActivitiesBattleFormation = 5209,
    C2STreasureRobList = 4801,
    C2STreasureRobEnemyDetail = 4803,
    C2STreasureRobCalculate = 4805,
    C2STreasureAvoidRob = 4807,
    C2STreasureAvoidRobTime = 4809,
    C2STreasureRobBattleStart = 4811,
    C2STreasureAutoRob = 4813,
    C2STreasureRobReport = 4815,
    C2STreasureRobGrab = 4817,
    C2SActivityList = 5401,
    C2SActivitiesGetAward = 5403,
    /**j建筑升级 */
    C2UPBulid = 10185,
    /**士兵招募 */
    C2SRecSoldiers = 1057,
    /**开启石槽 */
    C2SOpenRuneSlot = 2025,

    /**根据类型查找矿 */
    C2SFindMines = 3115,
    /**恶魔之门阵容 */
    C2SMineEviDetail = 3504,

    //接收
    ErrorCode = 10000,
    S2CLogin = 10014,
    S2CGuestLogin = 10016,
    S2COpenLogin = 10018,
    S2CH5OpenLogin = 10032,
    S2CAssetBundleList = 10046,
    S2CServerList = 10006,
    S2CSelectServer = 10020,
    S2CGetAnnounce = 10028,
    S2CQueryHasRole = 10102,
    S2CCreateCharacter = 10104,
    S2CEnterGame = 10106,
    S2CUserInfoStruct = 10108,
    S2CChat = 10402,
    S2CChatPush = 10404,
    S2CChatView = 10406,
    S2CPlayerKickOff = 10114,
    S2CBagItems = 10302,
    S2CSellItem = 10304,
    S2CUseItem = 10306,
    PushItemChange = 10308,
    S2CExpandBag = 10310,
    S2CEquipEnhance = 10312,
    S2CEquipEnhanceAuto = 10314,
    S2CEquipEnhanceAll = 10316,
    S2CEquipRefresh = 10318,
    S2CEquipRefreshSave = 10320,
    S2CTreasureEnhance = 10322,
    S2CTreasureRefresh = 10324,
    S2CTreasureFragCompose = 10326,
    S2CEquipFragCompose = 10328,
    S2CGmCmd = 102,
    S2CListMail = 40002,
    S2CGetAttach = 40004,
    S2CReadNewMailMsg = 40006,
    S2CDelMail = 40010,
    S2CGetAttachAll = 40014,
    /**监听属性改变 */
    PushPropertyChange = 10116,
    PushNewMail = 40012,
    S2CCardList = 2002,
    PushAddCard = 2004,
    S2CPubView = 1042,
    /**招募将领返回 */
    S2CPubBuy = 1044,
    S2CCardTakeOnItem = 2006,
    S2CCardTakeOffItem = 2008,
    S2CStageList = 3002,
    S2CStageEnd = 3004,
    S2CBattleFormationSave = 3006,
    S2CBoxAwardGet = 3008,
    S2CEliteStageEnd = 3010,
    S2CListSign = 3602,
    S2CGetSignAward = 3604,
    S2CKeyConvert = 3622,
    S2CTeamSkillList = 3202,
    S2CTeamSkillUpgrade = 3204,
    PushTeamSkillUnlock = 3206,
    S2CMallList = 1046,
    S2CArmyShopItemList = 1048,
    S2CArmyShopBuy = 1050,
    S2CArmyShopRefresh = 1052,
    S2CMallBuy = 1056,
    S2CMissionList = 2202,
    S2CMissionGetAward = 2204,
    PushMissionChange = 2206,
    S2CMissionGetAwardAll = 2208,
    S2CEliteBoxAwardGet = 3012,
    S2CElitePointAwardGet = 3014,
    S2CDailyMissionList = 3402,
    S2CDailyMissionGetAward = 3404,
    PushDailyMissionChange = 3406,
    S2CDailyMissionGetAwardAll = 3408,
    S2CGuozhanView = 3452,
    S2CGuozhanBattleStart = 3454,
    S2CGuozhanBattleEnd = 3456,
    S2CGuozhanMove = 3458,
    S2CGuozhanChangeNation = 3460,
    S2CGuozhanOfficeView = 3462,
    S2CGuozhanOfficeDetail = 3464,
    S2CGuozhanOfficeStart = 3466,
    S2CGuozhanOfficCalculate = 3468,
    S2CGuozhanFightView = 3472,
    S2CGuoZhanCityDetail = 3474,
    S2CGuoZhanCityMove = 3476,
    S2CGuozhanCityCalculate = 3478,
    PushGuoZhanPass = 3480,
    S2CGuozhanHistory = 3482,
    S2CCardAddLevel = 2010,
    S2CCardAddStar = 2012,
    S2CPaymentGetInfo = 4202,
    S2CPaymentBuyMoney = 4204,
    S2CPaymentBuyEnergy = 4206,
    S2CCardTrain = 2014,
    S2CCardAutoTrain = 2016,
    S2CCardUpgradeUnit = 2018,
    S2CCardCompose = 2020,
    S2CCardEquipUnit = 2022,
    PushCardAddLevel = 2024,
    /**解锁符槽 */
    S2CRuneUnlock = 2026,
    S2CRunePutup = 2028,
    S2CRuneHammerBuy = 2030,
    S2CRuneCombine = 2032,
    S2CRuneLevelup = 2034,
    S2CForge = 4602,
    S2CEquipCompose = 4604,
    S2CRuneSuccessRate = 4606,
    PushGuideInfo = 10118,
    S2CBlackMarketInfo = 4402,
    S2CBlackMarketBuy = 4404,
    S2CBlackMarketRefresh = 4406,
    S2CDownlineReconnect = 10128,
    S2CListRedPoints = 10130,
    S2CQunheiPayPre = 10132,
    PushPaymentResult = 10134,
    PushFirstPay = 10136,
    S2CGetYuekaAward = 10138,
    S2CGetQunheiWxShareAward = 10140,
    PushMarquee = 10142,
    S2CRankView = 10144,
    S2CRankPlayerDetail = 10146,
    S2CZMPayCheck = 10148,
    S2COfflineAwardDouble = 10150,
    S2C333PayPre = 10152,
    S2CChongChongPayPre = 10154,
    S2C4399PayPre = 10156,
    S2CRankLike = 10158,
    PushSmallTips = 10160,
    S2CWanBaGetBalance = 10162,
    S2CAddDesktopShortcutAward = 10166,
    S2CChangeName = 10168,
    S2CChangeIcon = 10170,
    S2CListHeadFrame = 10172,
    S2CChangeHeadFrame = 10174,
    PushIosIAPVerify = 10178,
    S2CSweepStage = 3016,
    S2CChargeInfo = 10122,
    S2CGetFirstPayAward = 10124,
    S2CGetVipGift = 10126,
    S2COvercomeItemList = 5012,
    S2COvercomeExchangeListRefresh = 5014,
    S2COvercomeExchange = 5016,
    S2CArenaExchangeList = 3802,
    S2CArenaExchange = 3804,
    S2CArenaView = 3806,
    S2CArenaEnemyDetail = 3808,
    S2CArenaRefreshEnemy = 3810,
    S2CArenaBattleStart = 3812,
    S2CArenaBattleCalculate = 3814,
    S2CLuckyRankInfo = 3816,
    S2CArenaBattleRecord = 3818,
    S2CArenaFormation = 3820,
    S2CArenaPlayerDetail = 3822,
    S2CArenaTopRankView = 3824,
    S2CPkEnemyFormation = 3826,
    S2CPkBattleCalculate = 3828,
    S2COvercomeInfoAll = 5002,
    S2CUserOvercomePassStage = 5006,
    S2COvercomeClaimReward = 5008,
    S2COvercomeReset = 5010,
    S2CActivitiesView = 5202,
    S2CActivitiesBattlePass = 5204,
    S2CActivitiesClaimAward = 5206,
    S2CActivitiesBattleBuyTicket = 5208,
    S2CActivitiesBattleFormation = 5210,
    S2CActivitiesBattleSweep = 5212,
    S2CTreasureRobList = 4802,
    S2CTreasureRobEnemyDetail = 4804,
    S2CTreasureRobCalculate = 4806,
    S2CTreasureAvoidRob = 4808,
    S2CTreasureAvoidRobTime = 4810,
    S2CTreasureRobBattleStart = 4812,
    S2CTreasureAutoRob = 4814,
    S2CTreasureRobReport = 4816,
    S2CTreasureRobGrab = 4818,
    S2CActivityList = 5402,
    S2CActivitiesGetAward = 5404,
    PushActivityProgressUpdate = 5406,
    S2CQiZhenYiBaoView = 5408,
    S2CQiZhenYiBaoJoin = 5410,
    PushQiZhenYiBaoKaiJiang = 5412,
    S2CQedjList = 10180,
    S2CQedjAward = 10182,

    S2UPBulid = 10186,
    /**士兵招募 */
    S2CRecSoldiers = 1058,
    // /**开启石槽 */
    // S2COpenRuneSlot = 2026,
    /**根据类型查找矿 */
    S2CFindMines = 3116,

    /**恶魔之门阵容 */
    S2CMineEviDetail = 3505,

    /**鉴定 */
    C2SIdentify = 2050,

    S2CIdentify = 2051,

    /**矿场建筑建造升级 */
    C2SMineConstructionUp = 3117,

    /**矿场建筑建造升级 */
    S2CMineConstructionUp = 3118,

    /**开启恶魔之门 */
    C2SEviGate = 3119,

    /**开启恶魔之门返回 */
    S2CEviGate = 3120,

    /**技能学习 */
    C2SSKillTeach = 2035,

    /**技能学习返回 */
    S2CSKillTeach = 2036,


    /**学习技能升级 */
    C2SSKillStUp = 2037,

    S2CSKillStUp = 2038,

    /**士兵复活 */
    C2SRebirth = 1059,

    S2CRebirth = 1060,

    /**兵种强化 */
    C2SSoliderStren = 10187,

    /**兵种强化 */
    S2CSoliderStren = 10188,

    /**胚体升级 */
    C2SEmbryoUp = 10330,

    /**胚体升级 */
    S2CEmbryoUp = 10331,

    /**武器还原 */
    C2SEquipRestore = 10332,

    /**武器还原 */
    S2CEquipRestore = 10333,

    /**符石卸载 */
    C2SDumpRuneSlot = 2040,

    /**符石卸载返回 */
    S2CDumpRuneSlot = 2041,


    C2SBussizeList = 1071,

    S2CBussizeList = 1072,

    C2SBussizeListAll = 1073,

    S2CBussizeListAll = 1074,

    C2SBussizeSave = 1075,

    S2CBussizeSave = 1076,

    C2SBussizeOff = 1077,

    S2CBussizeOff = 1078,

    C2SBussizeBuy = 1079,

    S2CBussizeBuy = 1080,

    C2SFriendList = 12001,

    S2CFriendList = 12002,

    C2SFriendAdd = 12003,

    S2CFriendAdd = 12004,

    C2SFriendApplyList = 12005,

    S2CFriendApplyList = 12006,

    C2SFriendBlackList = 12007,

    S2CFriendBlackList = 12008,

    C2SBlackFriendAdd = 12011,

    S2CBlackFriendAdd = 12012,

    C2SFriendBlackRemove = 12019,

    S2CFriendBlackRemove = 12020,

    C2SFriendsSearch = 12030,

    S2CFriendsSearch = 12031,

    //家族
    //     13009 查看所有家族   无参数
    // 13003 查找家族    参数：  家族ID
    // 13011 申请家族    参数： 用户ID   工会ID
    // 13013  审核加入   参数： 用户ID   工会ID
    // 13015 退出家族    无参数
    // 13018 工会日志    无参数
    //  13005 创建家族    参数： 家族名称，图标   有需要自己加  

    /**创建家族 */
    C2SCreaterFamily = 13005,

    /**创建家族 */
    S2CCreaterFamily = 13006,

    /**查看所有家族 */
    C2SFindFamilys = 13009,

    /**查看所有家族 */
    S2CFindFamilys = 13010,
    /**查找家族 */
    C2SFindFamily = 13003,
    /**查找家族 */
    S2CFindFamily = 13004,

    /**申请家族 */
    C2SApplyEnterFamily = 13011,
    /**申请家族 */
    S2CApplyEnterFamily = 13012,

    /**审核加入家族 */
    C2SExamineEnterFamily = 13013,
    /**审核加入家族 */
    S2CExamineEnterFamily = 13014,

    /**退出家族 */
    C2SQuitFamily = 13015,
    /**退出家族 */
    S2CQuitFamily = 13016,

    /**工会日志 */
    C2SFamilyLog = 13018,
    /**工会日志 */
    S2CFamilyLog = 13019,





}



