// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class heroItem extends cc.Component {

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    @property({ type: cc.Label, displayName: '星级' })
    starDisplay: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        let defaultData = DataManager.GameData.Cards[data.template_id]
        // this.nameDisplay.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
        // ResManager.loadItemIcon(`hero/heroNameBg${defaultData.quality - 1}`, this.heroNameBg)

        for (let i = 1; i <= 3; i++) {
            this.node.getChildByName(`soldierType${i}`).active = false
        }

        for (let i = 0; i < data.talents.length; i++) {
            let node = this.node.getChildByName(`soldierType${i + 1}`)
            node.active = true
            ResManager.loadItemIcon(`hero/soldierType${data.talents[i]}`, node)
        }

        // for (let i = 1; i <= 3; i++) {
        //     this.node.getChildByName(`starGet${i}`).active = false
        // }

        // // console.log('data.grade:' + data.grade)
        // for (let i = 1; i <= data.grade; i++) {
        //     this.node.getChildByName(`starGet${i}`).active = true
        // }
        this.starDisplay.string = `x` +(data.grade + 1)

        this.headBg.on(cc.Node.EventType.TOUCH_END,()=>{
            // let str = DataManager.getGeneralDes(data.template_id, data.id)
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_GENERAL,...[data.template_id, data.id])
        },this)

    }

    // update (dt) {}
}
