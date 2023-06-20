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
    coinLabel: cc.Label = null;

    @property(cc.Label)
    foodLabel: cc.Label = null;

    @property(cc.Label)
    fightLabel: cc.Label = null;

    @property(cc.Label)
    nameLabel: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {

        // {"hold_player":{"id":9976,"nickname":"无谓的遂平秀才","level":49,"icon":1,"head_frame_id":1,"fight":2796,"cd_time":0,"group":2,"lv":3,"page":0,"idx":3}}
        this.nameLabel.string = data.hold_player.nickname
        // this.foodLabel.string = data.hold_player.nickname
    }

    // update (dt) {}
}
