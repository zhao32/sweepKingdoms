// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");


@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: '名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '状态' })
    stateDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '等级' })
    gradeDisplay: cc.Label = null;

    @property({ type: cc.ProgressBar, displayName: '体力条' })
    proBar: cc.ProgressBar = null;

    @property({ type: cc.Label, displayName: '进度条label' })
    proTxt: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    @property(cc.Node)
    heroNameBg: cc.Node = null;

    @property({ type: cc.Label, displayName: '星级' })
    starDisplay: cc.Label = null;

    _data

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    init(data) {
        this._data =data
        let defaultData = DataManager.GameData.Cards[data.template_id]
        this.nameDisplay.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
        ResManager.loadItemIcon(`hero/heroNameBg${defaultData.quality - 1}`, this.heroNameBg)

        for (let i = 1; i < 6; i++) {
            this.node.getChildByName(`soldierType${i}`).active = false
        }

        for (let i = 0; i < defaultData.talents.length; i++) {
            let node = this.node.getChildByName(`soldierType${i + 1}`)
            node.active = true
            ResManager.loadItemIcon(`hero/soldierType${defaultData.talents[i]}`, node)
        }

        this.proBar.progress = data.physical / 200
        this.proTxt.string = `${data.physical}/${200}`
        this.gradeDisplay.string = 'LV ' + data.level
        this.starDisplay.string = `x${data.grade}`

        if (data.level >= 60 && data.grade >= 6) {
            this.node.getChildByName(`btnZS`).getComponent(cc.Button).interactable = true
        } else {
            this.node.getChildByName(`btnZS`).getComponent(cc.Button).interactable = false
        }


        // for (let i = 1; i <= 3; i++) {
        //     this.node.getChildByName(`starGet${i}`).active = false       
        // }

        // // console.log('data.grade:' + data.grade)
        // for (let i = 1; i <= data.grade; i++) {
        //     this.node.getChildByName(`starGet${i}`).active = true
        // }

        NetEventDispatcher.addListener(NetEvent.S2CCardAddStar, this.S2CCardAddStar, this)


    }

    doZSHandler() {
        MyProtocols.send_C2SCardAddStar(DataManager._loginSocket, this._data.id)

    }

    protected onDestroy(): void {
        NetEventDispatcher.removeListener(NetEvent.S2CCardAddStar, this.S2CCardAddStar, this)
  
    }

    
    S2CCardAddStar(data) {
        console.log(`转生返回`)
        console.log(JSON.stringify(data))
    }


    // update (dt) {}
}
