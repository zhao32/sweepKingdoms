import DataManager from "./DataManager";
import { refash } from "./EnumManager";
import ViewManager from "./ViewManager";



export enum E_ADType {
    /**道具 */
    revoke = 0,
    rush = 1,
    toPre = 2
}

/**广告管理类 */
export const BDManager = new class {

    /**banner广告实例 */
    private bannerAD;
    /**banner 广告位置 */
    private bannerPos;

    /**激励视频广告 实例 */
    private incentiveAD: RewardedVideoAd;
    /**激励视频广告 类型 */
    // public incentiveType: E_ADType;

    /**初始化广告 */
    initAD() {
        this.initIncentiveAD();
        this.bannerAD = wx.createBannerAd({
            adUnitId: '',
            style: {
                left: 0,
                top: 0,
                width: 320,
            }
        })
    }

    /**初始化 banner广告 */
    initBanner() {
        // console.log("创建banner广告");
        let info = wx.getSystemInfoSync();
        this.bannerAD = wx.createBannerAd({
            adUnitId: 'adunit-ca25ae162e514fc3',
            style: {
                left: 0,
                top: 0,
                width: 320,
            }
        });
        this.bannerAD.onLoad(res => {
            // console.log("banner广告拉取成功");
            // console.log(this.bannerPos)
            if (this.bannerPos != null) {
                let width;
                if (info.windowWidth * 0.9 < 300) {
                    width = 300;
                }
                else {
                    width = Math.floor(info.windowWidth * 1);
                    // width = Math.floor(info.windowWidth * 0.9);
                }
                let rate = (cc.winSize.height - this.bannerPos) / cc.winSize.height;
                let top = info.windowHeight * rate;

                this.bannerAD.style.width = width;
                // this.bannerAD.style.left = (info.windowWidth - width) / 2;
                // if(rate > 1 || rate < 0.5){
                this.bannerAD.style.top = info.windowHeight - width * 0.25 - 35;
                // }
                // else{
                //     this.bannerAD.style.top = top;
                // }
                // let rate = (cc.winSize.height - this.bannerPos);
                // this.bannerAD.style.width = width;
                // this.bannerAD.style.top = rate;
            }
            this.bannerAD.show()
                .then(() => { console.log("banner广告 显示成功") })
                .catch(err => { console.error("banner广告 显示失败"); console.error(err); })
        })
        this.bannerAD.onError(err => {
            // console.error("banner广告拉取失败：");
            console.error(err);
        })
    }
    /**刷新banner 广告 */
    refreshBanner() {
        // console.log("刷新banner广告");
        if (this.bannerAD) {
            this.bannerAD.destroy();
        }
        this.initBanner();
    }
    /**设置banner 位置 */
    setBannerPos(posy: number) {
        this.bannerPos = posy;
    }

    /**初始化 激励视频广告 */
    initIncentiveAD() {

        this.incentiveAD = wx.createRewardedVideoAd({
            adUnitId: "adunit-bc4f695eaf0d1035",
        });
        this.incentiveAD.onLoad(() => {
            // console.log("激励视频 广告加载成功");
        });
        this.incentiveAD.onError(() => {
            ViewManager.instance.showToast("没有广告");

            if (DataManager.instance.bIsOpenMusic) {
                cc.audioEngine.resumeMusic();
            }
        });
        this.incentiveAD.onClose((res) => {
            if (DataManager.instance.bIsOpenMusic) {
                cc.audioEngine.resumeMusic();
            }            // if(!res.isEnded) return;
            if (res && res.isEnded || res === undefined) {
                switch (DataManager.reflsahType) {
                    case refash.REDASH_BOLL:
                        // ViewManager.instance.showToast('恭喜获得额外的快Go球');
                        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
                        DataManager.pageGame.videoRefreshBoll()
                        break;
                    case refash.REDASH_BTN:
                        // ViewManager.instance.showToast('恭喜您，遇到新的小快Go');
                        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
                        DataManager.pageGame.videoRefreshBtn()
                        break;
                    case refash.REDASH_GO:
                        // ViewManager.instance.showToast('恭喜您，找到逃跑的小快Go');
                        ViewManager.instance.hideWnd(DataManager.curWndPath, true)
                        DataManager.pageGame.videoRefreshGo()
                        break;

                }
            } else {
                ViewManager.instance.showToast("视频还没看完，无法解锁奖励");

                // switch (this.incentiveType) {
                //     case E_ADType.propPlay:
                //         ViewManager.instance.showToast("视频还没看完，无法使用道具");
                //         // UIManager.closeUI("UI_Prop");  
                //         break;
                //     case E_ADType.againPlay:
                //         ViewManager.instance.showToast("视频还没看完，无法复活");
                //         // UIManager.closeUI("UI_Aga");
                //         // UIManager.openUI("UI_Lose"); 
                //         break;
                // }
            }
            DataManager.reflsahType = -1

        })
    }

    /**播放 激励视频 */
    showIncentiveAD() {
        // AudioManager.instance.stopMusic();
        cc.audioEngine.pauseMusic();

        this.incentiveAD.show()
            .then(() => {
                // console.log("激励视频 播放成功");
                // switch (this.incentiveType) {
                //     case E_ADType.propPlay:
                //         break;
                //     case E_ADType.againPlay:
                //         // UIManager.closeUI("UI_Aga")
                //         break;
                // }
            })
            .catch(err => {
                // UIManager.closeUI("UI_Aga");
                // UIManager.closeUI("UI_Prop");    
            })
    }

    /**刷新盒子广告 */
    refreshBoxAD() {
        // let boxAD = wx.createAppBox({ adUnitId: "adunit-59338dc0f3f22c5b" });
        // boxAD.load().
        //     then(()=>{
        //         console.log("盒子广告 加载成功");
        //         boxAD.show()
        //             .then(()=>{
        //                 console.log("盒子广告 播放成功");
        //             })
        //             .catch((err)=>{
        //                 console.error("盒子广告 播放失败");
        //                 console.error(err);
        //             })
        //     })
        //     .catch((err)=>{
        //         console.error("盒子广告 加载失败");
        //         console.error(err);
        //     })
    }



}