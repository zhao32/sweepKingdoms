// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NetEvent } from "../net/NetEvent";
import DataManager from "../utils/Manager/DataManager";
import EnumManager from "../utils/Manager/EnumManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.Label, displayName: '名称' })
    nameDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '等级' })
    gradeDisplay: cc.Label = null;

    @property({ type: cc.Label, displayName: '星级' })
    starDisplay: cc.Label = null;

    @property(cc.Node)
    head: cc.Node = null;

    @property(cc.Node)
    headBg: cc.Node = null;

    @property(cc.Node)
    heroNameBg: cc.Node = null;

    @property({ type: cc.ProgressBar, displayName: '体力条' })
    proBar: cc.ProgressBar = null;

    @property({ type: cc.Label, displayName: '进度条label' })
    proTxt: cc.Label = null;

    @property({ type: cc.ProgressBar, displayName: '经验条' })
    expProBar: cc.ProgressBar = null;

    @property({ type: cc.Label, displayName: '经验条label' })
    expProTxt: cc.Label = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    _data

    start() {

    }

    init(data) {
        this._data = data
        let defaultData = DataManager.GameData.Cards[data.template_id]
        this.nameDisplay.string = DataManager.qualityList[defaultData.quality] + "  " + defaultData.name
        ResManager.loadItemIcon(`hero/icon/${defaultData.name}`, this.head)
        ResManager.loadItemIcon(`hero/heroHeadBg${defaultData.quality - 1}`, this.headBg)
        ResManager.loadItemIcon(`hero/heroNameBg${defaultData.quality - 1}`, this.heroNameBg)

        this.starDisplay.string = `x${data.grade}`
        this.gradeDisplay.string = 'LV ' + data.level


        this.proBar.progress = data.physical / 200
        this.proTxt.string = `${data.physical}/${200}`

        let maxExp = DataManager.GameData.CardLevels[defaultData.potential][data.level - 1][0]
        this.expProTxt.string = `${data.exp}/${maxExp}`
        this.expProBar.progress = data.exp / maxExp

        console.log('data:'+ JSON.stringify(data))
        console.log(`aptitude:` + data.aptitude)

        for (let i = 0; i < data.talents.length; i++) {
            let node = this.node.getChildByName("shuxing").getChildByName(`soldierType${i + 1}`)
            node.active = true
            node.getChildByName('label0').getComponent(cc.Label).string = DataManager.armList[data.talents[i]] + `兵熟练度：`
            ResManager.loadItemIcon(`hero/soldierType${data.talents[i]}`, node)

            node.getChildByName('proTxt').getComponent(cc.Label).string = `${data.proficiency[i]}/${0}`
            node.getChildByName(`progressBar`).getComponent(cc.ProgressBar).progress = 0.8
            node.getChildByName('label1').getComponent(cc.Label).string = `成长潜质` //DataManager.armList[defaultData.talents[i]] + `兵熟练度：`
            node.getChildByName('label2').getComponent(cc.Label).string = `${data.aptitude[i]}/${999}`
        }

        NetEventDispatcher.addListener(NetEvent.S2CIdentify, this.S2CIdentify, this)
        NetEventDispatcher.addListener(NetEvent.S2CCardAddLevel, this.S2CCardAddLevel, this)

        this.headBg.on(cc.Node.EventType.TOUCH_END,()=>{
            // let str = DataManager.getGeneralDes(data.template_id, data.id)
            ViewManager.instance.showNote(EnumManager.viewPath.NOTE_GENERAL,...[data.template_id, data.id])
        },this)

    }

    S2CCardAddLevel(data) {
        console.log(`强化返回`)
        console.log(JSON.stringify(data))
        // {"card_id":151120,"level":6,"type":4,"a":[1819,179,219]}
        for (let i = 0; i < data.a.length; i++) {
            let node = this.node.getChildByName("shuxing").getChildByName(`soldierType${i + 1}`)
            node.getChildByName('proTxt').getComponent(cc.Label).string = `${data.a[i]}/${0}`            
        }

    }

    S2CIdentify(data) {
        console.log(`鉴定返回：` + JSON.stringify(data))
    }

    onCloseHandler() {
        ViewManager.instance.hideWnd(DataManager.curWndPath)
    }

    onClose() {
        NetEventDispatcher.removeListener(NetEvent.S2CIdentify, this.S2CIdentify, this)
        NetEventDispatcher.removeListener(NetEvent.S2CCardAddLevel, this.S2CCardAddLevel, this)

    }

    onQHHandler(target, data) {
        MyProtocols.send_C2SCardAddLevel(DataManager._loginSocket, this._data.id, null, null, data)
    }

    onJianDHandler() {
        MyProtocols.send_C2SIdentify(DataManager._loginSocket, this._data.id)
    }


    // update (dt) {}
}
