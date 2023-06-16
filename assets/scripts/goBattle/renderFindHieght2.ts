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

    @property(cc.Label)
    lordLabel: cc.Label = null;

    @property(cc.Node)
    icon: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {

        let filedData = {
            101: {
                name: "主城",
            },
            102: {
                name: "重镇",
            },
            103: {
                name: "名城",
            },
            104: {
                name: "圣都",
            },
            105: {
                name: "特殊",
            },
            106: {
                name: "遗迹",
            },
            0: {
                name: "",
            },
            1: {
                name: "魏国矿场",
            },
            2: {
                name: "燕国矿场",
            },
            3: {
                name: "秦国矿场",
            },
            4: {
                name: "赵国矿场",
            },
            5: {
                name: "齐国矿场",
            },
            6: {
                name: "韩国矿场",
            },
            7: {
                name: "楚国矿场",
            },
            8: {
                name: "农田",
            },
            9: {
                name: "金矿",
            },
        }
        this.nameLabel.string = data.lv + '级' + filedData[data.group].name
        this.lordLabel.string = data.nickname ? `领主：${data.nickname}` : '领主：无'

    }

    // update (dt) {}
}
