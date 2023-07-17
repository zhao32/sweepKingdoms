// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

export default class MarqueeBufferMgr {

    //单例唯一实例
    private static _instance: MarqueeBufferMgr = null;
    public static get instance(): MarqueeBufferMgr {
        if (!this._instance) {
            this._instance = new MarqueeBufferMgr();
        }
        return this._instance;
    }

    msgList = [];
    currentLoopCount = 0;
    marqueeCanPlay = true;

    insertMsgContent(newMsgContent) {
        this.msgList.push(newMsgContent);
    }

    doPlay() {
        if (!this.marqueeCanPlay) {
            return;
        }
        var MarqueeWidget = cc.Canvas.instance.node.getChildByName("MarqueeWidget");
        if (MarqueeWidget != null) {
            return;
        } else {
            var _MarqueeWidget = cc.instantiate(DataManager.Main.MarqueeWidget);
            _MarqueeWidget.name = "MarqueeWidget";
            _MarqueeWidget.zIndex = 10000;
            _MarqueeWidget.y = 180
            cc.Canvas.instance.node.addChild(_MarqueeWidget);
        }
    }

    addPlayCount = function () {
        this.currentLoopCount++;
        if (this.msgList.length == 0) {
            return;
        }
        var firstElement = this.msgList[0];
        if (this.currentLoopCount >= firstElement.count) {
            this.msgList.shift();
            this.currentLoopCount = 0;
        }
    }

    setMarqueeCanPlay = function (isCanPlay) {
        this.marqueeCanPlay = isCanPlay;
    }

    getPlayingMsg = function () {
        if (this.msgList.length == 0) {
            return null;
        } else {
            return this.msgList[0];
        }
    }

    checkHasMsg = function () {
        return this.msgList.length > 0;
    }
}
