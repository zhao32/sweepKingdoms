// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import { Logger } from "../utils/Manager/Logger";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteFrame)
    controlFrame: cc.SpriteFrame[] = [];

    @property(cc.Node)
    btnControl: cc.Node = null

    @property(cc.Node)
    btnArr: cc.Node[] = []

    _isOpen: boolean = false





    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this._isOpen = true
        let animation = this.node.getComponent(cc.Animation)
        animation.play('btnBarHide', animation.getAnimationState('btnBarHide').duration * 0.9)//.wrapMode = cc.WrapMode.Reverse
        this.btnControl.getComponent(cc.Sprite).spriteFrame = this.controlFrame[0]
        this.btnControl.on(cc.Node.EventType.TOUCH_END, () => {
            if (animation.getAnimationState('btnBarHide').isPlaying) return
            if (this._isOpen) {
                animation.play().wrapMode = cc.WrapMode.Normal
            } else {
                animation.play().wrapMode = cc.WrapMode.Reverse
            }
        }, this)

        animation.on('finished', () => {
            this._isOpen = !this._isOpen
            if (this._isOpen) this.btnControl.getComponent(cc.Sprite).spriteFrame = this.controlFrame[1]
            else {
                this.btnControl.getComponent(cc.Sprite).spriteFrame = this.controlFrame[0]
            }
        }, this)

        for (let i = 0; i < this.btnArr.length; i++) {
            this.btnArr[i].on(cc.Node.EventType.TOUCH_END, () => {
                if (i == 0) {//俸禄

                } else if (i == 1) {//副本   
                    if (DataManager.cardsList.length == 0) {
                        ViewManager.instance.showToast(`请先招募将领`)
                        return
                    }
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE)
                } else if (i == 2) {//出征
                    if (DataManager.cardsList.length == 0) {
                        ViewManager.instance.showToast(`请先招募将领`)
                        return
                    }
                    if (DataManager.playData.level < 30) {
                        ViewManager.instance.showToast(`等级达到30级时开放`)
                        return
                    }
                    ViewManager.instance.showView(EnumManager.viewPath.PAGE_GOBATTLE)
                } else if (i == 3) {//背包
                    Logger.log('----------打开背包----------')
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_PACK)
                    return
                } else if (i == 4) {//奖励
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_REWARD)

                } else if (i == 5) {//系统
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_MAIN_USERINFO)
                }
            }, this)

        }

    }

    // update (dt) {}
}
