// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";
import stageBattleRender from "./stageBattleRender";
import stageRender from "./stageRender";

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
    renderPfb0: cc.Prefab = null;

    @property(cc.Prefab)
    renderPfb1: cc.Prefab = null;

    showType: number = 0 // 0 分组 1 分组内

    chapters = {}

    hasFrom: boolean = false


    // groupsData = [
    //     {
    //         group: '剧情副本',
    //         describe: '在精心动魄的剧情中游历七国，扫平邪恶，将领升级的最佳场所',
    //         frameIdx: 0
    //     },
    //     {
    //         group: '名将试炼场',
    //         describe: '穿越时空挑战',
    //         frameIdx: 1
    //     },
    //     {
    //         group: '秘籍藏经阁',
    //         describe: '秘籍藏经阁秘籍藏经阁秘籍藏经阁',
    //         frameIdx: 2
    //     },
    //     {
    //         group: '神兽英雄殿',
    //         describe: '神兽英雄殿神兽英雄殿神兽英雄殿',
    //         frameIdx: 3
    //     }
    // ]

    start() {
        this.showGroups(DataManager.stagesData.chapters)
        // NetEventDispatcher.addListener(NetEvent.S2CStageList, this.S2CStageList.bind(this))

    }

    protected onDestroy(): void {
        // NetEventDispatcher.removeListener(NetEvent.S2CStageList, this.S2CStageList.bind(this))

    }

    private showGroups(data) {
        console.log('---data---:' + JSON.stringify(data))
        this.showType = 0
        this.contect.removeAllChildren()

        for (let i = 0; i < DataManager.GameData.Stages.length; i++) {
            let render = cc.instantiate(this.renderPfb0)
            render.parent = this.contect
            if (i < 5) {
                render.x = 1000
                this.scheduleOnce(() => {
                    render.runAction(cc.moveTo(0.4, cc.v2(0, render.y)))
                }, 0.3 * i)
            }

            let isOpen = (i <= data.length) ? true : false
            // 
            let rank
            if (data[i]) {
                rank = `${data[i].stages.length}/${DataManager.GameData.Stages[i].stage.length}`
            } else {
                rank = `0/${DataManager.GameData.Stages[i].stage.length}`
            }

            render.getComponent(stageRender).init(DataManager.GameData.Stages[i], isOpen, rank)
            // render.getComponent(renderBulid0).init(this.groupsData[i])
            render.on(cc.Node.EventType.TOUCH_END, () => {
                // this.showIntragroup(DataManager.GameData.Stages[i].stage)
                if (isOpen) {
                    ViewManager.instance.hideWnd(DataManager.curWndPath, true)
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE_SELECT, ...[DataManager.GameData.Stages[i], data[i]])
                } else {
                    ViewManager.instance.showToast('关卡尚未开启')
                }

            }, this)
        }
    }

    init() {
        // this.showGroups()
        // MyProtocols.send_C2SStageList(DataManager._loginSocket)
    }

    onBackHandler() {
        if (this.showType == 0) {
            Logger.log('关闭窗口')
            ViewManager.instance.hideWnd(DataManager.curWndPath, true)
        }
        // else if (this.showType == 1) {
        //     this.showGroups(this.chapters)
        // }

    }
}
