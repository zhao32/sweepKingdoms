// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EnumManager from "../utils/Manager/EnumManager";
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
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_STAGE)

                } else if (i == 2) {//出征

                } else if (i == 3) {//背包
                    console.log('----------打开背包----------')
                    ViewManager.instance.showWnd(EnumManager.viewPath.WND_PACK)

                } else if (i == 4) {//奖励

                } else if (i == 5) {//系统

                }
            }, this)

        }

    }

    // update (dt) {}
}
