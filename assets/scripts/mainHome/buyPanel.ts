// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel1: cc.Label = null;

    @property(cc.Label)
    nameLabel2: cc.Label = null;

    @property(cc.Label)
    decLabel: cc.Label = null;

    @property(cc.Label)
    numLabel: cc.Label = null;

    @property(cc.Label)
    moneyLabel: cc.Label = null;



    @property(cc.Node)
    pic: cc.Node = null;

    num: number = 0


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    init() {

    }

    onPlusOne() {
        if (this.num > 0) {
            this.num--
        }
        this.numLabel.string = `x${this.num}`
    }

    onReduceOne() {
        this.num++
        this.numLabel.string = `x${this.num}`
    }

    onPlusTen() {
        this.num += 10
        this.numLabel.string = `x${this.num}`

    }

    onReduceTen() {
        if (this.num >= 10) {
            this.num -= 10
        } else {
            this.num = 0
        }
        this.numLabel.string = `x${this.num}`
    }



    // update (dt) {}
}
