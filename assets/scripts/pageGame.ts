// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AudioManager from "./utils/Manager/AudioManager";
import { BDManager } from "./utils/Manager/BDManager";
import DataManager from "./utils/Manager/DataManager";
import EnumManager from "./utils/Manager/EnumManager";
import ViewManager from "./utils/Manager/ViewManager";
import xhrSupport from "./utils/xhrSupport";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    btnAltas: cc.Node = null;

    @property(cc.Node)
    btnRank: cc.Node = null;

    @property(cc.Node)
    btnSet: cc.Node = null;

    @property(cc.Node)
    boll: cc.Node = null;

    @property(cc.Node)
    goNode: cc.Node = null;

    @property(cc.Button)
    btnRefrash: cc.Button = null;

    @property(cc.Label)
    coloTimeLabel: cc.Label = null;

    @property(cc.Label)
    bollNumLabel: cc.Label = null;

    grab: boolean = false

    timeSch: Function

    start() {

        BDManager.initIncentiveAD()

        this.goNode.getComponent(cc.Sprite).spriteFrame = null
        DataManager.pageGame = this
        this.btnAltas.on(cc.Node.EventType.TOUCH_END, () => {
            AudioManager.instance.wxShake()
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_ATLAS)
        }, this)

        this.btnRank.on(cc.Node.EventType.TOUCH_END, () => {
            AudioManager.instance.wxShake()
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_RANK)
        }, this)

        this.btnSet.on(cc.Node.EventType.TOUCH_END, () => {
            AudioManager.instance.wxShake()
            ViewManager.instance.showWnd(EnumManager.viewPath.WND_SET)
        }, this)

        this.node.getChildByName('bgGame').on(cc.Node.EventType.TOUCH_END, () => {
            if (DataManager.bollNum <= 0) {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_REFRASHBOLL)
                return
            }

            if (!DataManager.curGo.id) {
                if (DataManager.instance.BrowserInfo.isWeixin) {
                    wx.showToast({
                        title: '不存在精灵，请点击刷新键刷新',
                        icon: "none"

                    })
                } else {
                    ViewManager.instance.showToast('不存在精灵，请点击刷新键刷新')
                }
                return
            }
            if (this.grab) return
            this.grab = true

            if (DataManager.instance.BrowserInfo.isWeixin) {
                wx.vibrateShort({
                    // type:"medium",
                })
            }
            // this.boll.children[0].stopAllActions()
            this.boll.children[0].opacity = 0

            let type = 0
            if (Math.abs(this.boll.x) < 10) {
                type = 1//重合
            } else {
                type = 2//重合
            }

            this.boll.active = false


            this.scheduleOnce(() => {
                this.goNode.active = false
            }, 0.7)

            this.scheduleOnce(() => {
                this.grab = false
                this.boll.angle = 0
                this.catchGo(type)
            }, 2.4)
            this.node.getChildByName('dBonus').getComponent(dragonBones.ArmatureDisplay).playAnimation('newAnimation', 1)


            // this.boll.getComponent(cc.Animation).play()
            // this.boll.getComponent(dragonBones.ArmatureDisplay).playAnimation('闪烟', 1)
            // this.boll.runAction(cc.sequence(cc.scaleTo(0.1, 0.5), cc.moveTo(1, cc.v2(this.goNode.x, this.goNode.y)), cc.callFunc(() => {
            //     // this.boll.getComponent(cc.Animation).stop()
            // }), cc.spawn(cc.blink(1.2, 4), cc.scaleTo(0.8, 1.2)), cc.delayTime(0.4), cc.callFunc(() => {
            //     this.boll.getComponent(dragonBones.ArmatureDisplay).playAnimation('大球', 1)
            //     let spawn = cc.spawn(cc.moveTo(0.5, cc.v2(0, -125)), cc.scaleTo(0.5, 1))
            //     let seq = cc.sequence(spawn, cc.callFunc(() => {
            //         this.grab = false

            //         this.boll.angle = 0
            //         this.catchGo(type)
            //     }))

            //     this.boll.runAction(seq)
            // })))
        }, this)

        this.btnRefrash.node.on(cc.Node.EventType.TOUCH_END, () => {
            if (this.btnRefrash.interactable == false) {
                ViewManager.instance.showWnd(EnumManager.viewPath.WND_REFRASHBTN)
            }
        }, this)
    }

    catchGo(type) {
        xhrSupport.catchGo(DataManager.curGo.id, type, (success) => {
            success = JSON.parse(success)
            console.log(JSON.stringify(success))
            // if (DataManager.instance.BrowserInfo.isWeixin) {
            //     wx.showToast({
            //         title: success.msg,
            //         icon: "none"
            //     })
            // } else {
            //     ViewManager.instance.showToast(success.msg)
            // }

            if (success.code == 1) {
                AudioManager.instance.playSound(EnumManager.AudioPath.ding)
                // DataManager.bollNum--

                // DataManager.curGo.id = success.data.skin.id
                // DataManager.curGo.name = success.data.skin.name
                // DataManager.curGo.pic = success.data.skin.pic
                AudioManager.instance.playBGM(EnumManager.AudioPath.未遇见精灵)

                DataManager.curGo.id = null
                DataManager.curGo.name = null
                DataManager.curGo.pic = null
                // this.updateBollState()

                this.node.getChildByName("getNode").active = true
                this.scheduleOnce(() => {
                    this.node.getChildByName("getNode").active = false
                }, 1.5)

                this.goNode.getComponent(cc.Sprite).spriteFrame = null

                // cc.assetManager.loadRemote('https://kgkg.vip.hnhxzkj.com' + DataManager.curGo.pic, { ext: '.png' }, (err, texture: cc.Texture2D) => {
                //     let spriteFrame = new cc.SpriteFrame(texture)
                //     this.goNode.active = true
                //     this.goNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                // });
            } else if (success.code == -1) {// 精灵球数量不足
                if (DataManager.instance.BrowserInfo.isWeixin) {
                    wx.showToast({
                        title: `精灵球不足`,
                        icon: "none"
                    })
                } else {
                    ViewManager.instance.showToast(`精灵球不足`)
                }

            } else if (success.code == -2) {//捕捉失败
                // DataManager.bollNum--
                this.goNode.active = true
                // this.updateBollState()
                AudioManager.instance.playSound(EnumManager.AudioPath.pu)
                // if (DataManager.instance.BrowserInfo.isWeixin) {
                //     wx.showToast({
                //         title: `捕捉失败`,
                //         icon: "none"
                //     })
                // } else {
                //     ViewManager.instance.showToast(`捕捉失败`)
                // }
                this.node.getChildByName("loseNode").active = true
                this.scheduleOnce(() => {
                    this.node.getChildByName("loseNode").active = false
                }, 1.5)
            } else if (success.code == -3) {//逃跑
                // {"code":"-3","msg":"逃跑","data":null}
                AudioManager.instance.playSound(EnumManager.AudioPath.pu)
                // DataManager.bollNum--

                DataManager.curGo.id = null
                DataManager.curGo.name = null
                DataManager.curGo.pic = null

                // this.updateBollState()
                AudioManager.instance.playBGM(EnumManager.AudioPath.未遇见精灵)


                if (DataManager.instance.BrowserInfo.isWeixin) {
                    wx.showToast({
                        title: success.msg,
                        icon: "none"
                    })
                } else {
                    ViewManager.instance.showToast(success.msg)
                }

                ViewManager.instance.showWnd(EnumManager.viewPath.WND_REFRASHGO)
            } else {
                ViewManager.instance.showToast(success.msg)
            }

            xhrSupport.getInfo((success) => {
                success = JSON.parse(success)
                DataManager.bollNum = success.data.userInfo.fairy_ball_num
                this.bollNumLabel.string = `x${DataManager.bollNum}`
                this.updateBollState()
            }, (fail) => { })
        }, () => { })
    }

    doRefresh() {
        AudioManager.instance.wxShake()
        AudioManager.instance.playSound(EnumManager.AudioPath.go)
        xhrSupport.refresh((success) => {
            success = JSON.parse(success)
            console.log(JSON.stringify(success))
            if (success.code == 1) {

                DataManager.curGo.id = success.data.id
                DataManager.curGo.name = success.data.name
                DataManager.curGo.pic = success.data.pic
                AudioManager.instance.playBGM(EnumManager.AudioPath.抓精灵)

                cc.assetManager.loadRemote('https://kgkg.vip.hnhxzkj.com' + DataManager.curGo.pic, { ext: '.png' }, (err, texture: cc.Texture2D) => {
                    let spriteFrame = new cc.SpriteFrame(texture)
                    this.goNode.active = true
                    this.goNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                });

                xhrSupport.getInfo((success) => {
                    success = JSON.parse(success)
                    DataManager.getSkins = success.data.userInfo.get_skin
                    DataManager.bollNum = success.data.userInfo.fairy_ball_num
                    let dis = success.data.userInfo.refresh_cooling_time - new Date().getTime() / 1000
                    dis = parseInt((dis * 1000).toFixed(0))
                    DataManager.coloTime = dis

                    this.checkRefresh()
                    this.updateBollState()
                }, (fail) => { })
            } else {
                AudioManager.instance.playBGM(EnumManager.AudioPath.未遇见精灵)

                if (DataManager.instance.BrowserInfo.isWeixin) {
                    wx.showToast({
                        title: success.msg,
                        icon: "none"
                    })
                } else {
                    ViewManager.instance.showToast(success.msg)
                }

            }

        }, () => { })
    }

    /**看视频刷新go */
    videoRefreshGo() {
        xhrSupport.videoRefreshGo((success) => {
            success = JSON.parse(success)
            console.log(JSON.stringify(success))
            if (success.code != 1) {
                if (DataManager.instance.BrowserInfo.isWeixin) {
                    wx.showToast({
                        title: success.msg,
                        icon: "none"
                    })
                } else {
                    ViewManager.instance.showToast(success.msg)
                }
                return
            }

            if (success.code == 1) {
                ViewManager.instance.showToast('恭喜您，找到逃跑的小快Go');
                DataManager.curGo.id = success.data.id
                DataManager.curGo.name = success.data.name
                DataManager.curGo.pic = success.data.pic
                AudioManager.instance.playBGM(EnumManager.AudioPath.抓精灵)

                cc.assetManager.loadRemote('https://kgkg.vip.hnhxzkj.com' + DataManager.curGo.pic, { ext: '.png' }, (err, texture: cc.Texture2D) => {
                    let spriteFrame = new cc.SpriteFrame(texture)
                    this.goNode.active = true
                    this.goNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                });
                xhrSupport.getInfo((success) => {
                    success = JSON.parse(success)
                    if (success.code != 1) {
                        if (DataManager.instance.BrowserInfo.isWeixin) {
                            wx.showToast({
                                title: success.msg,
                                icon: "none"
                            })
                        } else {
                            ViewManager.instance.showToast(success.msg)
                        }
                    }
                    DataManager.getSkins = success.data.userInfo.get_skin
                    DataManager.bollNum = success.data.userInfo.fairy_ball_num

                    let dis = success.data.userInfo.refresh_cooling_time - new Date().getTime() / 1000
                    dis = parseInt((dis * 1000).toFixed(0))
                    DataManager.coloTime = dis

                    this.checkRefresh()
                    this.updateBollState()
                }, (fail) => { })
            } else {
                AudioManager.instance.playBGM(EnumManager.AudioPath.未遇见精灵)
                if (DataManager.instance.BrowserInfo.isWeixin) {
                    wx.showToast({
                        title: success.msg,
                        icon: "none"
                    })
                } else {
                    ViewManager.instance.showToast(success.msg)
                }
            }

        }, () => { })
    }
    /**刷新冷却按钮 */
    videoRefreshBtn() {
        xhrSupport.videoRefreshBtn((success) => {
            success = JSON.parse(success)
            console.log(JSON.stringify(success))
            // {"code":"1","msg":"冷却清除成功"}
            if (success.code == 1) {
                // ViewManager.instance.showToast('恭喜您，遇到新的小快Go');
                ViewManager.instance.showToast(success.msg);
                xhrSupport.getInfo((success) => {
                    success = JSON.parse(success)
                    DataManager.bollNum = success.data.userInfo.fairy_ball_num
                    this.bollNumLabel.string = `x${DataManager.bollNum}`
                    this.updateBollState()
                }, (fail) => { })

                DataManager.coloTime = -1
                this.checkRefresh()
            } else {
                if (DataManager.instance.BrowserInfo.isWeixin) {
                    wx.showToast({
                        title: success.msg,
                        icon: "none"
                    })
                } else {
                    ViewManager.instance.showToast(success.msg)
                }
            }
        }, () => { })
    }

    /**刷新精灵球 */
    videoRefreshBoll() {
        // {"code":"1","msg":"成功"}
        xhrSupport.videoRefreshBoll((success) => {
            success = JSON.parse(success)
            console.log(JSON.stringify(success))
            if (success.code != 1) {
                if (DataManager.instance.BrowserInfo.isWeixin) {
                    wx.showToast({
                        title: success.msg,
                        icon: "none"
                    })
                } else {
                    ViewManager.instance.showToast(success.msg)
                }
            }
            if (success.code == 1) {
                ViewManager.instance.showToast('恭喜获得额外的快Go球');

                xhrSupport.getInfo((success) => {
                    success = JSON.parse(success)
                    DataManager.bollNum = success.data.userInfo.fairy_ball_num
                    this.bollNumLabel.string = `x${DataManager.bollNum}`
                    this.updateBollState()
                }, (fail) => { })

            }
        }, (fail) => { })

    }

    checkRefresh() {
        console.log('---------------DataManager.coloTime---------------:'+DataManager.coloTime)
        this.bollNumLabel.string = `x${DataManager.bollNum}`
        if (DataManager.coloTime <= 0) {
            this.coloTimeLabel.string = ''
            this.unschedule(this.timeSch)
            this.btnRefrash.interactable = true
        } else {
            let date = new Date(DataManager.coloTime)
            this.btnRefrash.interactable = false
            this.unschedule(this.timeSch)
            console.log('checkData:' + date)

            let hour = date.getHours()
            let min = date.getMinutes()
            let sec = date.getSeconds()

            if (hour == 8) hour = 0

            let time = hour * 60 * 60 + min * 60 + sec
            this.timeSch = () => {
                time--
                if (time >= 0) {
                    this.coloTimeLabel.string = `冷却时间：${this.coventTime(time)}`
                } else {
                    this.coloTimeLabel.string = ''
                    this.unschedule(this.timeSch)
                    this.btnRefrash.interactable = true
                }
            }
            this.schedule(this.timeSch, 1)
        }
    }

    init() {
        this.boll.active = false
        if (DataManager.bollNum > 0) {
            let circle = this.boll.children[0]
            circle.x = 450
            let ani = cc.repeatForever(cc.sequence(cc.moveTo(1.5, cc.v2(-450, 0)), cc.callFunc(() => {
                circle.x = 450
            })))
            circle.runAction(ani)
        }
        xhrSupport.showGo((success) => {
            success = JSON.parse(success)
            console.log(JSON.stringify(success))
            if (success.code == 1) {
                if (success.data.id) {
                    DataManager.curGo.id = success.data.id;
                    DataManager.curGo.name = success.data.name;
                    DataManager.curGo.pic = success.data.pic
                    cc.assetManager.loadRemote('https://kgkg.vip.hnhxzkj.com' + success.data.pic, { ext: '.png' }, (err, texture: cc.Texture2D) => {
                        let spriteFrame = new cc.SpriteFrame(texture)
                        this.goNode.getComponent(cc.Sprite).spriteFrame = spriteFrame
                    });
                    AudioManager.instance.playBGM(EnumManager.AudioPath.抓精灵)

                } else {
                    this.goNode.getComponent(cc.Sprite).spriteFrame = null
                    AudioManager.instance.playBGM(EnumManager.AudioPath.未遇见精灵)

                }

                this.updateBollState()
            } else {
                if (DataManager.instance.BrowserInfo.isWeixin) {
                    wx.showToast({
                        title: 'appear_spirit:' + success.msg,
                        icon: "none"
                    })
                } else {
                    ViewManager.instance.showToast('appear_spirit:' + success.msg)
                }
            }
        }, (fail) => { });
        this.checkRefresh()
        // let circle = this.boll.children[0]
        // circle.x = -200
        // circle.runAction(cc.repeatForever(cc.sequence(cc.moveTo(2, cc.v2(200, 0)), cc.moveTo(2, cc.v2(-200, 0)))))
    }

    updateBollState() {
        this.boll.children[0].x = 0
        this.boll.children[0].y = 0

        this.boll.active = DataManager.curGo.id ? true : false
        // this.bollNumLabel.string = `x${DataManager.bollNum}`

        if (DataManager.bollNum > 0) {
            if (DataManager.curGo.id) {
                this.bollNumLabel.string = `x${DataManager.bollNum}`
                this.boll.opacity = 255
                let circle = this.boll.children[0]
                circle.opacity = 255

                if (circle.getNumberOfRunningActions() == 0) {
                    circle.x = 450
                    let ani = cc.repeatForever(cc.sequence(cc.moveTo(1.5, cc.v2(-450, 0)), cc.callFunc(() => {
                        circle.x = 450
                    })))
                    circle.runAction(ani)
                } else {
                    circle.resumeAllActions()
                }
            } else {
                this.bollNumLabel.string = `x0`
                this.boll.opacity = 0
            }
        } else {
            this.bollNumLabel.string = `x0`
            this.boll.opacity = 0

        }
    }

    coventTime(time) {
        let hour = Math.floor(time / 60 / 60)
        let min = Math.floor((time - hour * 60 * 60) / 60)
        let sec = time % 60
        return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
    }

    // update (dt) {}
}
