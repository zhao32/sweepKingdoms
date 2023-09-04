// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import AlertLayer from "../common/AlertLayer";
import DataManager from "../utils/Manager/DataManager";
import ResManager from "../utils/Manager/ResManager";
import ViewManager from "../utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

//@ts-ignore
var MyProtocols = require("MyProtocols");

//@ts-ignore
var NetEventDispatcher = require("NetEventDispatcher");

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    nameLabel: cc.Label = null;

    @property(cc.Label)
    btnLabel: cc.Label = null;

    @property(cc.RichText)
    richLabel: cc.RichText = null;

    @property(cc.Node)
    icon: cc.Node = null;

    @property(cc.Node)
    bg: cc.Node = null;

    _data;
    _idx;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.icon.on(cc.Node.EventType.TOUCH_END, () => {
            let skillSt = DataManager.GameData.SkillStudy[this._data.id]
            // console.log(`skillSt.name.length - 2:` + (skillSt.name.length - 2))
            if (this._data.id != 0) {
                if (skillSt.name.length - 2 == 4) {
                    if (this._data.level < 10 - 1) {
                        DataManager.wndHotelDetail.openSkillstUpPanel(this._data, this._idx)
                    } else {
                        ViewManager.instance.showToast(`该技能已达到10级最高级`)
                    }
                } else {
                    if (this._data.level < 6 - 1) {
                        DataManager.wndHotelDetail.openSkillstUpPanel(this._data, this._idx)
                    } else {
                        ViewManager.instance.showToast(`该技能已达到6级最高级`)
                    }
                }
            }
            // MyProtocols.send_C2SSKillStUp(DataManager._loginSocket, DataManager.wndHotelDetail._data.id, this._idx, this._data.id, this._data.level + 1)
        }, this)
    }

    getDes(skillSt) {
        if (skillSt.effect_1.length > 0) { //基础属性加成
            for (let i = 0; i < skillSt.effect_1.length; i++) {
                
            }

        }

    }

    init(data, idx) {
        console.log(JSON.stringify(data))
        // "skills_equips":[{"id":0,"level":0,"type":2},{"id":0,"level":0,"type":1},{"id":0,"level":0,"type":2}]
        // this.nameLabel.string = data.name
        // this.richLabel.string = data.des
        this._data = data
        this._idx = idx

        if (data.type == 0) {
            ResManager.loadItemIcon(`skillats/红`, this.bg)
        } else if (data.type == 1) {
            ResManager.loadItemIcon(`skillats/黄`, this.bg)
        } else if (data.type == 2) {
            ResManager.loadItemIcon(`skillats/蓝`, this.bg)
        }

        // this.node.getChildByName(`btnTeach`).active = data.id == 0
        if (data.id != 0) {
            this.icon.active = true
            let skillSt = DataManager.GameData.SkillStudy[data.id]
            ResManager.loadItemIcon(`skillats/${skillSt.name}`, this.icon)
            this.nameLabel.string = `${skillSt.name.slice(0, -2)} LV ${data.level + 1}`
            this.richLabel.string = skillSt.des

            this.btnLabel.string = `遗忘`
        } else {
            this.icon.active = false
            this.btnLabel.string = `学习`
            this.richLabel.string = ''
            this.nameLabel.string = ''
        }
    }

    onTeachHandler() {
        if (this._data.id == 0) {
            DataManager.wndHotelDetail.openSkillstPanel(this._data, this._idx)
        } else {
            let self = this
            var _alert_layer = cc.instantiate(DataManager.Main.AlertLayer);
            cc.Canvas.instance.node.addChild(_alert_layer);
            _alert_layer.getComponent(AlertLayer).init("是否遗忘此技能？",
                function () {
                    // MyProtocols.send_C2SCardTakeOffItem(DataManager._loginSocket, this._data.id, this._idx);//
                    MyProtocols.send_C2SSKillTeach(DataManager._loginSocket, DataManager.wndHotelDetail._data.id, self._idx, self._data.id, 1)
                    _alert_layer.destroy();
                });
        }
    }

    // update (dt) {}
}
