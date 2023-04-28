// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class EventManager {

    private dic = {};

    /**签到 */
    public static DOSIGN: string = 'doSign'

    public static COLLISH:string = 'collish'

    public static UPDATECOIN:string = 'updatecoin'

    public static UPDATESHARE:string = 'updateshare'


    public static UPDATEEXCHARGE:string = 'upexcharge'


    protected static instance: EventManager;
    public static getInstance(): EventManager {
        if (!this.instance) {
            this.instance = new EventManager();
        }
        return this.instance;
    }

    registerListener(typeName: string, cc: cc.Component, action: Function) {
        this.clearSingleRegister(typeName);
        if (!this.dic[typeName]) {
            this.dic[typeName] = [];
        }
        this.dic[typeName].push({ cc: cc, action: action });
    }

    unRegisterListener(typeName: string, cc: cc.Component) {
        this.clearSingleRegister(typeName);
        if (!this.dic[typeName]) return;
        this.dic[typeName].splice(this.dic[typeName].indexOf(cc), 1);
    }

    clearSingleRegister(typeName: string) {
        if (this.dic[typeName]) {
            for (let i = this.dic[typeName].length - 1; i >= 0; i--) {
                if (!this.dic[typeName][i].cc.node) {
                    this.dic[typeName].splice(i, 1);
                }
            }
        }
    }

    sendListener(typeName: string, obj?: any) {
        this.clearSingleRegister(typeName);
        if (this.dic[typeName]) {
            for (let i = 0; i < this.dic[typeName].length; i++) {
                if (this.dic[typeName][i].cc.node) {
                    this.dic[typeName][i].action(this.dic[typeName][i].cc, obj);
                }
            }
        }
    }
}

