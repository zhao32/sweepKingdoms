// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Node, displayName: '新手救济' })
    btnBeginner: cc.Node = null;

    @property({ type: cc.Node, displayName: '最新活动' })
    btnActive: cc.Node = null;

    @property({ type: cc.Node, displayName: '新手保护' })
    btnProtect: cc.Node = null;

    @property({ type: cc.Label, displayName: '玩家等级' })
    labelLevel: cc.Label = null;

    @property({ type: cc.Label, displayName: '玩家名称' })
    labelName: cc.Label = null;

    @property({ type: cc.Label, displayName: '战力' })
    labelCombatPower: cc.Label = null;

    @property({ type: cc.Label, displayName: '粮草' })
    labelProvisions: cc.Label = null;

    @property({ type: cc.Label, displayName: '金币' })
    labelCoin: cc.Label = null;

    @property({ type: cc.Label, displayName: '元宝' })
    labelGold: cc.Label = null;


    // onLoad () {}

    start() {
        this.btnBeginner.on(cc.Node.EventType.TOUCH_END, () => {
            ViewManager.instance.showToast('新手保护')
        }, this)

    }

    init() {

    }

    // update (dt) {}
}
