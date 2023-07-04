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
    nameLabel: cc.Label = null;

    @property(cc.RichText)
    richLabel: cc.RichText = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        // "skills_equips":[{"id":0,"level":0,"type":2},{"id":0,"level":0,"type":1},{"id":0,"level":0,"type":2}]
        this.nameLabel.string = data.name
        this.richLabel.string = data.des

    }

    // update (dt) {}
}
