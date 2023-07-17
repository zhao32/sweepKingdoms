// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MarqueeBufferMgr from "../net/MarqueeBufferMgr";
import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    msgContentLabel: cc.Label = null

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onLoad() {
        var msgContent = MarqueeBufferMgr.instance.getPlayingMsg();
        this.msgContentLabel.string = this.format2PlayMsg(msgContent);
        this.msgContentLabel.node.x = 240;
        this.node.opacity = 0;
    }

    format2PlayMsg(msgObj) {
        if (msgObj.template_id == -1) {
            return msgObj.content;
        } else {
            var MarqueeConfig = DataManager.GameData.Marquee;
            var aMarqueeCfg = MarqueeConfig[msgObj.template_id];
            var param1 = msgObj.parameters[1];
            if (msgObj.template_id == 0 || msgObj.template_id == 1 || msgObj.template_id == 2 || msgObj.template_id == 24) {
                var cardTemplateId = msgObj.parameters[1];
                var cardName = DataManager.GameData.Cards[cardTemplateId].name;
                param1 = cardName;
            } else if (msgObj.template_id == 13) {
                var equipTemplateId = msgObj.parameters[1];
                var cardName = DataManager.GameData.Equips[equipTemplateId].name;
                param1 = cardName;
            } else if (msgObj.template_id == 14) {
                var treasureTemplateId = msgObj.parameters[1];
                var cardName = DataManager.GameData.Treasures[treasureTemplateId].name;
                param1 = cardName;
            }
            if (msgObj.parameters.length == 2) {
                return cc.js.formatStr(aMarqueeCfg.text[0], msgObj.parameters[0], param1);
            } else if (msgObj.parameters.length == 3) {
                return cc.js.formatStr(aMarqueeCfg.text[0], msgObj.parameters[0], param1, msgObj.parameters[2]);
            }
            return cc.js.formatStr(aMarqueeCfg.text[0], msgObj.parameters);
        }
    }

    start() {
        this.node.runAction(cc.fadeIn(0.2));
    }

    update(dt) {
        this.msgContentLabel.node.x -= 100 * dt;
        if (this.msgContentLabel.node.x < -(this.msgContentLabel.node.width + 280)) {
            this.playNext();
        }
    }

    playNext() {
        MarqueeBufferMgr.instance.addPlayCount();
        var msgContent = MarqueeBufferMgr.instance.getPlayingMsg();
        //全部播完
        if (msgContent == null) {
            this.node.runAction(cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
                this.node.destroy();
            }, this)));
        } else {
            this.msgContentLabel.string = this.format2PlayMsg(msgContent);
            this.msgContentLabel.node.x = 280;
        }
    }


    // update (dt) {}
}
