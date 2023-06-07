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

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    bload: cc.Node = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // {
    //     "x": 1,
    //     "y": 25,
    //     "type": 1,
    //     "name": "农田",
    //     "lv": 2,
    //     "troops": 1000,
    //     "min": 0,
    //     "max": 9500
    //   },

    init(data) {
        if (data.type == 0) {//城池
            this.icon.active = false
            this.bload.active = false
            this.nameLabel.string = ''

        } else {
            this.icon.active = true
            this.bload.active = true

            this.nameLabel.string = data.lv + '级' + data.name
        }


    }

    // update (dt) {}
}
