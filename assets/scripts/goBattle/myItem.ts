// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    fightLabel: cc.Label = null;


    @property(cc.Label)
    heroLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;


    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // "hold_player": {
    //     "id": 9961,
    //     "nickname": "黝黑的湖北地主",
    //     "level": 50,
    //     "icon": 33,
    //     "head_frame_id": 1,
    //     "fight": 0,
    //     "cd_time": 0,
    //     "group": 101,
    //     "lv": 1
    // }

    init(data) {
        this.nameLabel.string = DataManager.mineData[data.group].name
        this.fightLabel.string = data.fight
    }

    // update (dt) {}
}
