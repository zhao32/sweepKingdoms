// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.RichText, displayName: "描述" })
    label: cc.RichText = null;

    @property({ type: cc.Node, displayName: "头像" })
    icon: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }
    // {"Player1Id":10001,"Player1Id2":0,"Action":2,"time":1693038782,"icon":0}
    init(data) {
        if (data.icon == 0) {
            ResManager.loadItemIcon(`hero/head_1_1`, this.icon)
        } else if (data.icon == 1) {
            ResManager.loadItemIcon(`hero/head_2_1`, this.icon)
        } else {
            let defaultData = DataManager.GameData.Cards[data.icon]
            if (defaultData) {
                ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.icon)
            }
        }

        // Action 1： 申请家族 2 加入家族 3 踢出工会 4 退出工会  5 修改公告 
        let Actions = [``, '申请家族', '加入家族', '踢出工会', '退出工会', '修改公告']
        let runk = '';


        if (DataManager.familyDetail.familyChiefID == data.Player1Id) {
            runk = `族长`
        } else {
            runk = `成员`
        }
        this.label.string = `${runk}在${this.formatDate(data.time)}时 ${Actions[data.Action]}`
    }

    formatDate(value) {
        let date = new Date(value);
        let y = date.getFullYear(),
            m = date.getMonth() + 1 as any,
            d = date.getDate() as any,
            h = date.getHours() as any,
            i = date.getMinutes() as any,
            s = date.getSeconds() as any;
        if (m < 10) { m = '0' + m; } if (d < 10) { d = '0' + d; } if (h < 10) { h = '0' + h; } if (i < 10) { i = '0' + i; } if (s < 10) { s = '0' + s; } var t = y + '-' + m + '-' + d + ' ' + h + ':' + i + ':' + s; return t;
    }

    // update (dt) {}
}
