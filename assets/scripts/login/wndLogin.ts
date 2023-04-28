// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({ type: cc.EditBox, displayName: '账户' })
    editAccount: cc.EditBox = null;

    @property({ type: cc.EditBox, displayName: '密码' })
    editPwd: cc.EditBox = null;

    @property({ type: cc.Node, displayName: '登陆' })
    btnLogin: cc.Node = null;

    @property({ type: cc.Node, displayName: '游客' })
    btnTourist : cc.Node = null;

    strAccount: string

    strPwd: string


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        this.editAccount.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.strAccount = editBox.textLabel.string
        }, this)

        this.editPwd.node.on('editing-did-ended', (editBox: cc.EditBox) => {
            this.strPwd = editBox.textLabel.string
        }, this)

        this.btnLogin.on(cc.Node.EventType.TOUCH_END,()=>{

        },this)

        this.btnTourist.on(cc.Node.EventType.TOUCH_END,()=>{
            
        },this)
    }

    init() {


    }

    // update (dt) {}
}
