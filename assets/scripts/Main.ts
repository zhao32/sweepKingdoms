// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "./net/NetEvent";
import DataManager from "./utils/Manager/DataManager";
import EnumManager from "./utils/Manager/EnumManager";
import EventManager from "./utils/Manager/EventManager";
import ViewManager from "./utils/Manager/ViewManager";

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var LejiSocket = require("LejiSocket");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    shortLoadLayer: cc.Prefab = null;

    onLoad() {
        // EventNetManager.getInstance().addListener(10014, this.login,this)

        NetEventDispatcher.addListener(NetEvent.ErrorCode, this.errCodeBack, this)


        NetEventDispatcher.addListener(NetEvent.S2CUserInfoStruct, this.S2CUserInfoStruct, this)

        NetEventDispatcher.addListener(NetEvent.S2CCreateCharacter, this.S2CCreateCharacter, this)

        NetEventDispatcher.addListener(NetEvent.PushPropertyChange, this.PushPropertyChange, this)

        NetEventDispatcher.addListener(NetEvent.S2CStageList, this.S2CStageList, this)

        NetEventDispatcher.addListener(NetEvent.S2CCardList, this.S2CCardList, this)

        NetEventDispatcher.addListener(NetEvent.PushAddCard, this.PushAddCard, this)

        NetEventDispatcher.addListener(NetEvent.PushItemChange, this.PushItemChange, this)


        // S2CCreateCharacter
    }

    PushItemChange(retObj) {
        // {"item_info":{"uuid":"","template_id":5001,"enhance_level":0,"stars":0,"num":300,"bagId":4,"hpEx":0,"atkEx":0,"defEx":0,"attrEx":[],"exp":0}}

        for (let i = 0; i < DataManager.instance.curRuneList.length; i++) {
            if (DataManager.instance.curRuneList[i].template_id == retObj.item_info.template_id) {
                DataManager.instance.curRuneList[i] = retObj.item_info
                if (retObj.item_info.num == 0) {
                    DataManager.instance.curRuneList.splice(i, 1)
                }
            }
        }
    }
    /**获取玩家信息 */
    S2CUserInfoStruct(retObj) {
        console.log('------------------------------')
        console.log('retObj:' + JSON.stringify(retObj))
        DataManager.playData.id = retObj.id
        DataManager.playData.account_id = retObj.account_id
        DataManager.playData.food = retObj.army
        DataManager.playData.troops = retObj.troops
        DataManager.playData.formationSlots = retObj.formationSlots
        DataManager.playData.formationStatus = retObj.formationStatus
        DataManager.playData.coinMoney = retObj.gameMoney
        DataManager.playData.head_frame = retObj.head_frame
        DataManager.playData.honor = retObj.honor
        DataManager.playData.icon = retObj.icon
        DataManager.playData.level = retObj.level
        DataManager.playData.level_exp = retObj.level_exp
        DataManager.playData.goldMoney = retObj.money
        DataManager.playData.name = retObj.name
        DataManager.playData.nation_id = retObj.nation_id
        DataManager.playData.offline_add_level = retObj.offline_add_level
        DataManager.playData.offline_minutes = retObj.offline_minutes
        DataManager.playData.offline_rewards = retObj.offline_rewards
        DataManager.playData.server_id = retObj.server_id
        DataManager.playData.sex = retObj.sex
        DataManager.playData.stamina = retObj.stamina
        DataManager.playData.team_skills = retObj.team_skills
        DataManager.playData.vip_exp = retObj.vip_exp
        DataManager.playData.vip_level = retObj.vip_level

        DataManager.playData.population = retObj.population

        DataManager.playData.basic_build = retObj.basic_build
        DataManager.playData.barracks_build = retObj.barracks_build
        DataManager.playData.resource_build = retObj.resource_build
        if (retObj.military_data.length == 0) {
            for (let i = 0; i < 19; i++) {
                retObj.military_data.push(0)
            }
        }
        DataManager.playData.military_data = retObj.military_data


        for (let i = 0; i < retObj.basic_build.length; i++) {
            DataManager.GameData.build['basic'][i].grade = retObj.basic_build[i]
        }

        for (let i = 0; i < retObj.barracks_build.length; i++) {
            DataManager.GameData.build['barracks'][i].grade = retObj.barracks_build[i]
        }

        for (let i = 0; i < retObj.resource_build.length; i++) {
            DataManager.GameData.build['resource'][i].grade = retObj.resource_build[i]
        }

        EventManager.getInstance().sendListener(EventManager.UPDATE_MAINHOME_INFO)
        EventManager.getInstance().sendListener(EventManager.UPDATE_BULID_STATE)

        MyProtocols.send_C2SStageList(DataManager._loginSocket)

    }

    S2CStageList(retObj) {
        DataManager.stagesData = retObj
        if (retObj.chapters.length == 0) {
            retObj.chapters = [{ "stages": [] }]
        }

        console.log(retObj.chapters[retObj.chapters.length - 1].stages.length)
        console.log(DataManager.GameData.Stages[retObj.chapters.length - 1].stage.length)

        if (retObj.chapters[retObj.chapters.length - 1].stages.length == DataManager.GameData.Stages[retObj.chapters.length - 1].stage.length && DataManager.GameData.Stages[retObj.chapters.length]) {
            retObj.chapters.push({ "stages": [] })
        }

        console.log('retObj:' + JSON.stringify(retObj))
        // {"chapters":[],"chapters_elite":[],"elite_count":5,"crawl_state":0}
        // if (retObj.chapters.length == 0) {
        //     DataManager.stagesData.chapters = [{ "stages": [] }]
        // }
        // DataManager.stagesData = { "chapters": [{ "stages": [{ "star": 3, "times": 5, "is_get_award": false }, { "star": 3, "times": 19, "is_get_award": false }], "star_award": [] }], "chapters_elite": [], "formation": { "fid": 0, "formationId": 1, "forward": 1, "flip": 0, "a": 0, "b": 73, "c": 5, "d": 0, "e": 0, "f": 0, "g": 0, "h": 0, "i": 0, "j": 0 }, "elite_count": 5, "crawl_state": 10 }
    }

    S2CCreateCharacter(retObj) {
        console.log('创建角色返回：' + JSON.stringify(retObj))
        ViewManager.instance.hideView(EnumManager.viewPath.PAGE_ROLE, true)
        // MyProtocols.send_C2SListRedPoints(DataManager._loginSocket)
        MyProtocols.send_C2SEnterGame(DataManager._loginSocket, DataManager.instance.session_id)


    }


    /**监听属性变化 */
    PushPropertyChange(retObj) {
        console.log('属性变化：' + JSON.stringify(retObj))
        //属性变化：{"type":4,"value":10396}
        //属性变化：{"type":11,"value":10400}
        //1 游戏币  2元宝  3 等级  4 暂时没用 5 人口  6  经验  7 vip 等级 8 vip 经验 9 暂时没用  10 声望  11 兵力 12 战力
        if (retObj.type == 1) {
            DataManager.playData.coinMoney = retObj.value
        } else if (retObj.type == 2) {
            DataManager.playData.goldMoney = retObj.value
        } else if (retObj.type == 3) {
            DataManager.playData.level = retObj.value
        } else if (retObj.type == 4) {

        } else if (retObj.type == 5) {
            DataManager.playData.population = retObj.value
        } else if (retObj.type == 6) {
            DataManager.playData.level_exp = retObj.value
        } else if (retObj.type == 7) {
            DataManager.playData.vip_level = retObj.value
        } else if (retObj.type == 8) {
            DataManager.playData.vip_exp = retObj.value
        } else if (retObj.type == 9) {

        } else if (retObj.type == 10) {
            DataManager.playData.honor = retObj.value
        } else if (retObj.type == 11) {
            DataManager.playData.troops = retObj.value
        } else if (retObj.type == 12) {

        }

        EventManager.getInstance().sendListener(EventManager.UPDATE_MAINHOME_INFO)
    }

    S2CCardList(retObj) {
        retObj.cards.sort((a, b) =>
            a.template_id - b.template_id
        )
        console.log('我的将表:' + JSON.stringify(retObj))

        DataManager.cardsList = retObj.cards
    }

    PushAddCard(retObj) {
        console.log('将表增加:' + JSON.stringify(retObj))
        DataManager.cardsList.push(...[retObj.cards])
    }
    errCodeBack(retObj) {
        console.log('接口错误码：' + JSON.stringify(retObj))
        ViewManager.instance.showToast(DataManager.GameData.zh[retObj.ret_code])
    }


    start() {
        DataManager.Main = this
        cc.macro.ENABLE_MULTI_TOUCH = false
        let socketUrl = "ws://192.168.1.50:7550/ws"
        // let socketUrl = "ws://8.218.9.194:7550/ws"

        DataManager._loginSocket = new LejiSocket(socketUrl);
        ViewManager.instance.showView(EnumManager.viewPath.PAGE_LOGIN)

        // cc.resources.load("json/zh", cc.JsonAsset, (err, res: cc.JsonAsset) => {
        //     cc.log(`加载游戏数据${err ? '失败' : '成功'}`)
        //     if (!err) {
        //         var object = res.json
        //         DataManager.zh = object
        //     }
        // });

        cc.resources.loadDir("json", (err, res: cc.JsonAsset[]) => {
            cc.log(`加载游戏数据${err ? '失败' : '成功'}`)
            if (!err) {
                // var object = res.json
                // DataManager.errCodeData = object
                // console.log('res:' + JSON.stringify(res))
                let keys = Object.keys(DataManager.GameData)
                for (let i = 0; i < res.length; i++) {
                    for (let j = 0; j < keys.length; j++) {
                        //@ts-ignore
                        if (res[i]._name == keys[j]) {
                            DataManager.GameData[keys[j]] = res[i].json
                        }
                    }
                }
                // console.log(JSON.stringify(DataManager.GameData))
            } else {
                console.log(err)
            }
        });


        // console.log(this.soldierData.json)

    }


    // update (dt) {}
}

