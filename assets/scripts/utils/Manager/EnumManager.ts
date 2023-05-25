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

        LOAD: 'prefabs/pageLoad',

        /**登录页面 */
        PAGE_LOGIN: 'prefabs/login/loginLayer',

        PAGE_ROLE: 'prefabs/login/createrRoleLayer',


        WND_LOGIN: 'prefabs/login/wndLogin',


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

        ///////////////////// 酒馆
        /**酒馆 */
        WND_HOTEL: 'prefabs/hotel/wndHotel',
        /**招募 */
        WND_HOTEL_RECRUIT: 'prefabs/hotel/wndHotelRecruit',
        /**招募之外 */
        WND_HOTEL_LIST: 'prefabs/hotel/wndHeroList',


        /////////////////// 背包
        WND_PACK: 'prefabs/pack/wndPack',


        /**巅峰战场 */
        WND_BATTLEFILED: 'prefabs/battleFiled/wndBattleFiled',

        /**部队比较 */
        WND_BATTLE_ARMY: 'prefabs/battleFiled/wndArmy',

        /**副本 */
        WND_STAGE: 'prefabs/stage/wndStage',
        /**副本 */
        WND_STAGE_SELECT: 'prefabs/stage/wndStageSelect',

    }
}

/**刷新类型 */
export enum refash {
    /**刷新球 */
    REDASH_BOLL,
    /**刷新按钮 */
    REDASH_BTN,
    /**刷新 Go */
    REDASH_GO
} 
