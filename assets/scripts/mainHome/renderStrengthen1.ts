// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: '强化属性' })
    attributeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '等级' })
    gradeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '百分比' })
    percentDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '强化增加' })
    plusDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '单价' })
    priceDisplay: cc.Label = null;

    @property({ type: cc.Sprite, displayName: '消耗晶元图片' })
    pearlSprite: cc.Sprite = null;

    @property({ type: cc.ProgressBar })
    proBar: cc.ProgressBar = null;




    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    onStrengthHandler() {
        
    }

    // update (dt) {}
}
