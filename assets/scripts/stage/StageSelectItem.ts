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
    lvDisplay: cc.Label = null;

    @property(cc.Label)
    timesDisplay: cc.Label = null;

    @property(cc.SpriteFrame)
    starDark: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    starBright: cc.SpriteFrame = null;

    selectIdx = 1

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

        // this.node.on(cc.Node.EventType.TOUCH_END, () => {
        //     let children = this.node.parent.children
        //     for (let i = 0; i < children.length; i++) {
        //         children[i].getChildByName('selected').active = false
        //     }
        //     this.node.getChildByName('selected').active = true

        //     for (let i = 0; i < children.length; i++) {
        //         if (children[i].getChildByName('selected').active == true) {
        //             this.selectIdx = i + 1
        //         }
        //     }
        //     console.log('this.selectIdx:' + this.selectIdx)
        // }, this)

    }


    // {
    //     "star": 3,
    //     "times": 5,
    //     "is_get_award": false
    // }
    init(data, isopen, rank, times) {
        console.log("data:" + JSON.stringify(data))
        this.lvDisplay.string = rank
        this.node.getChildByName('selected').active = false
        if (data) {
            this.timesDisplay.string = `${data.times}/${times}`
            this.node.getChildByName('lock').active = false
            for (let i = 0; i < 3; i++) {
                if (i < data.star) {
                    this.node.getChildByName(`star${i}`).getComponent(cc.Sprite).spriteFrame = this.starBright
                } else {
                    this.node.getChildByName(`star${i}`).getComponent(cc.Sprite).spriteFrame = this.starDark
                }
            }
        } else {
            this.timesDisplay.string = `${times}/${times}`
            if (isopen) {
                this.node.getChildByName('lock').active = false
            }
        }

        if (rank == '1') {
            this.node.getChildByName('selected').active = true
        }
    }

    // update (dt) {}
}
