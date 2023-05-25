// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "../utils/Manager/DataManager";
import ViewManager from "../utils/Manager/ViewManager";
import { getRandHeroName } from "./SelectRoleInfo";

//@ts-ignore
var MyProtocols = require("MyProtocols");

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteFrame)
    manFrame: cc.SpriteFrame[] = [];

    @property(cc.SpriteFrame)
    womanFrame: cc.SpriteFrame[] = [];

    @property({ type: cc.EditBox, displayName: '名字' })
    editBox: cc.EditBox = null;

    @property({ type: cc.Sprite, displayName: '男' })
    manSprite: cc.Sprite = null;

    @property({ type: cc.Sprite, displayName: '女' })
    womenSprite: cc.Sprite = null;

    strName: string = ''

    roleType = 0

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        if (this.roleType == 0) {//男
            this.manSprite.spriteFrame = this.manFrame[1]
            this.womenSprite.spriteFrame = this.womanFrame[0]
        } else {//女
            this.manSprite.spriteFrame = this.manFrame[0]
            this.womenSprite.spriteFrame = this.womanFrame[1]
        }

        this.editBox.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.strName = editBox.textLabel.string
        }, this)

    }

    init() {

    }

    selectManHandler(event, customData) {
        this.manSprite.spriteFrame = this.manFrame[1]
        this.womenSprite.spriteFrame = this.womanFrame[0]
        this.roleType = 0
    }

    selectWomanHandler(event, customData) {
        this.manSprite.spriteFrame = this.manFrame[0]
        this.womenSprite.spriteFrame = this.womanFrame[1]
        this.roleType = 1
    }

    selectNameHander() {
        let strName = getRandHeroName()
        this.editBox.string = strName
        this.strName = strName
    }

    startHandler() {
        console.log('session_id:'+ DataManager.instance.session_id)
        if(!this.strName){
            ViewManager.instance.showToast('请确定的名称')
            return
        }
        MyProtocols.send_C2SCreateCharacter(DataManager._loginSocket,this.roleType,this.strName,DataManager.instance.session_id)
    }


    // update (dt) {}
}
