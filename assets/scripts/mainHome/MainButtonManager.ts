// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EnumManager from "../utils/Manager/EnumManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Node, displayName: 'node区域' })
    nodeArea: cc.Node = null;

    // @property({ type: cc.Node, displayName: '领土中心' })
    // 领土中心: cc.Node = null;

    // @property({ type: cc.Node, displayName: '粮草工坊' })
    // mainNode1: cc.Node = null;

    // @property({ type: cc.Node, displayName: '铸币工坊' })
    // mainNode2: cc.Node = null;

    // @property({ type: cc.Node, displayName: '巅峰战场' })
    // mainNode3: cc.Node = null;

    // @property({ type: cc.Node, displayName: '居民区' })
    // mainNode4: cc.Node = null;

    // @property({ type: cc.Node, displayName: '酒馆' })
    // mainNode5: cc.Node = null;

    // @property({ type: cc.Node, displayName: '战神像' })
    // mainNode6: cc.Node = null;

    // @property({ type: cc.Node, displayName: '招募所' })
    // mainNode7: cc.Node = null;

    // @property({ type: cc.Node, displayName: '国会' })
    // mainNode8: cc.Node = null;

    // @property({ type: cc.Node, displayName: '资源仓库' })
    // mainNode9: cc.Node = null;

    // @property({ type: cc.Node, displayName: '军营' })
    // mainNode10: cc.Node = null;

    // @property({ type: cc.Node, displayName: '英魂墓地' })
    // mainNode11: cc.Node = null;

    // @property({ type: cc.Node, displayName: '盾卫训练所' })
    // mainNode12: cc.Node = null;

    // onLoad () {}

    start() {

    }

    onClick(event, customData) {
        [
            '居民区', '资源仓库', '神像', '英魂墓地', '城墙',
            '铸币工坊', '粮草工坊', '领土中心', '技术研究所',
            '军营', '枪兵训练场', '箭手训练场', '骑士训练场', '盾卫训练场', '部队强化', '军魂祭坛', '招募所', '酒馆', '木牛工厂', '资源仓库', '巅峰战场', '建造建筑'
        ];

        // ["居民区","资源仓库","城墙","神像","英魂墓地"];
        // ["铸币工坊","粮草工坊","领土中心","技术研究所"];
        // ["军营",'枪兵训练场', '箭手训练场', '骑士训练场', '盾卫训练场', '军魂祭坛','部队强化','木牛工厂']

        let ani = ['铸币工坊', '军营', '枪兵训练场', '箭手训练场', '酒馆', '巅峰战场', '建造建筑']

        let normalLList = ['居民区', '资源仓库', '神像', '英魂墓地', '城墙', '铸币工坊', '粮草工坊', '领土中心', '技术研究所', '军营']

        let armList = ['枪兵训练场', '箭手训练场', '骑士训练场', '盾卫训练场', '军魂祭坛', '木牛工厂']

        if (ani.indexOf(customData) != -1) {
            Logger.log('点中' + customData)
            let ani = this.nodeArea.getChildByName(customData).getComponent(dragonBones.ArmatureDisplay)
            ani.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                ani.playAnimation('action1', 0)
            }, this)
            if (customData == '枪兵训练场' || customData == '铸币工坊') {
                this.nodeArea.getChildByName(customData).getComponent(dragonBones.ArmatureDisplay).playAnimation('action3', 1)
            } else if (customData == '酒馆') {
                this.nodeArea.getChildByName(customData).getComponent(dragonBones.ArmatureDisplay).playAnimation('action4', 1)
            } else if (customData == '巅峰战场') {
                this.nodeArea.getChildByName(customData).getComponent(dragonBones.ArmatureDisplay).playAnimation('action5', 1)
            } else {
                this.nodeArea.getChildByName(customData).getComponent(dragonBones.ArmatureDisplay).playAnimation('action2', 1)
            }
        } else {
            console.log('customData:' + customData)
            this.nodeArea.getChildByName(customData).runAction(cc.sequence(cc.fadeTo(0.4, 180), cc.fadeTo(0.3, 255)))
        }

        if (normalLList.indexOf(customData) != -1) {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_NORMAL, ...[customData])
        } else if (customData == '建造建筑') {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_BULID)
        } else if (customData == '酒馆') {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_HOTEL)
        } else if (customData == '部队强化') {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_STRENGTHEN)
        } else if (armList.indexOf(customData) != -1) {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_ARM, ...[customData])
        } else if (customData == '招募所') {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_RECRUITOFFICE)
        } else if (customData == '巅峰战场') {
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_BATTLEFILED)
        }

    }

    // update (dt) {}
}
