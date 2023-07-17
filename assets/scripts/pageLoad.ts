// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import EnumManager from "./utils/Manager/EnumManager";
import ViewManager from "./utils/Manager/ViewManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    loadItem: cc.Node = null;
    @property({ type: cc.ProgressBar })
    loadbar: cc.ProgressBar = null

    is_loading: boolean

    disTime: number = 5000

    startTime = 0

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    start() {

    }

    onLoadComplete() {
        this.is_loading = false;
        cc.loader.onProgress = null
        let disTime = new Date().getTime() - this.startTime
        if (disTime < this.disTime) {
            this.scheduleOnce(() => { 
                ViewManager.instance.hideView(EnumManager.viewPath.LOAD, true)
                ViewManager.instance.showView(EnumManager.viewPath.GAME)
            }, disTime / 1000)
        } else {
            ViewManager.instance.hideView(EnumManager.viewPath.LOAD, true)
            ViewManager.instance.showView(EnumManager.viewPath.GAME)
        }
    }

    init() {
        this.startTime = new Date().getTime()
        this.is_loading = true;
        let jindu = 0
        cc.loader.onProgress = null
        // this.loadItem.x = -this.loadbar.totalLength / 2
        cc.loader.onProgress = (completedCount, totalCount, item) => {
            if (totalCount !== 0 && this.is_loading === true) {
                jindu = completedCount / totalCount;
            }
            this.loadbar.progress = jindu;
            const number_jindu = jindu * 100
            // this.loadtext.string = number_jindu.toFixed(0) + '%';
            // this.loadItem.x = -this.loadbar.totalLength / 2 + jindu * this.loadbar.totalLength
        }


        cc.loader.loadResDir("", (err, assets, urls) => {
            if (!err) {
                // console.log(JSON.stringify(assets))
                cc.log(`加载资源${err ? '失败' : '成功'}`)
                this.onLoadComplete();
                console.log(JSON.stringify(urls))
            } else {
                console.error('err:' + err)
            }
        });
    }
}
