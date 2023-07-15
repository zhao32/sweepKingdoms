// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import boxItem from "./boxItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    itemContent: cc.Node = null
    @property(cc.Prefab)
    itemBox_prefab: cc.Prefab = null
    @property(cc.Node)
    panel_node: cc.Node = null
    @property(cc.Node)
    tipsGoOn: cc.Node = null

    _isRuningAction = false
    _creatCount = 0
    _itemlist = null
    _closeCb = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    onLoad() {
        this.fadeInStart();
        this.tipsGoOn.runAction(cc.repeatForever(cc.sequence(cc.fadeTo(1, 255 * 0.4), cc.fadeTo(1, 255))));
    }

    showItem(list) {
        var self = this;
        // list.forEach(function(element){
        //     var newNode=cc.instantiate(self.itemBox_prefab);
        //     self.itemContent.addChild(newNode);
        //     newNode.getComponent('ItemBox').ChangeItemInfo(element.itemId,element.cnt,true);
        // }, this);

        this._creatCount = 0;
        var creat = cc.callFunc(function () {
            var newNode = cc.instantiate(self.itemBox_prefab);
            newNode.y = 0
            this.itemContent.addChild(newNode);
            // newNode.getComponent('ItemBox').ChangeItemInfo(list[this._creatCount].itemId || list[this._creatCount].item_template_id || list[this._creatCount].nID,list[this._creatCount].cnt || list[this._creatCount].item_count || list[this._creatCount].nNum,true,null,true);
            newNode.getComponent(boxItem).init(list[this._creatCount])

            newNode.stopAllActions();
            newNode.scale = 0.1;
            var action1 = cc.scaleTo(0.1, 1.1);
            var action2 = cc.scaleTo(0.1, 1.0);
            //var action3=cc.delayTime(0.1);
            var callfunc = cc.callFunc(function () {
                // var flashNode = this.getComponent('ItemBox').m_pActionFrame.node;
                // flashNode.active = true;
                // flashNode.stopAllActions();
                // flashNode.opacity = 255;
                // var flashEnd = cc.callFunc(function () { this.active = false; }, flashNode);
                // var flashAction = cc.sequence(cc.fadeOut(0.2), flashEnd);
                // flashNode.runAction(flashAction);
            }, newNode);
            var seq = cc.sequence(action1, action2, callfunc);
            newNode.runAction(seq);
            // SoundUtil.playGainGoodsEffect();//播放获得物品声音

            this._creatCount++;
        }, this);
        var createItemAction = cc.sequence(creat, cc.delayTime(0.2));
        createItemAction = cc.repeat(createItemAction, list.length);
        this.itemContent.runAction(createItemAction);
    }

    closeSelf() {
        this.node.removeFromParent();
        this.node.destroy();
        if (this._closeCb != null) {
            this._closeCb();
        }
    }

    fadeInStart() {
        this._isRuningAction = true;
        this.panel_node.scale = 0.5;
        var action = cc.scaleTo(0.2, 1);
        var finish = cc.callFunc(this._fadeInComplete, this);
        action = cc.sequence(action, finish);
        this.panel_node.runAction(action);
    }
    _fadeInComplete() {
        this._isRuningAction = false;
        this.showItem(this._itemlist);
        //this.initData(this._mailData);
    }

    fadeOutStart() {
        if (this._isRuningAction) return;
        this._isRuningAction = true;
        this.panel_node.stopAllActions();
        var action = cc.scaleTo(0.3, 0.5);
        var finish = cc.callFunc(this._fadeOutComplete, this);
        action = cc.sequence(action, finish);
        this.panel_node.runAction(action);
    }
    _fadeOutComplete() {
        this._isRuningAction = false;
        this.closeSelf();
    }

    // update (dt) {}
}
