import httpUtil from "./httpUtil";
import DataManager from "./Manager/DataManager";
import EnumManager from "./Manager/EnumManager";
import EventManager from "./Manager/EventManager";
import ViewManager from "./Manager/ViewManager";
import md5 from "./md5";

var xhrSupport = {
  httpUrl: "https://kgkg.vip.hnhxzkj.com/",
  siteid: 271,

  // http://271api.vip.hnhxzkj.com/Login/WxLogin_01/271?openid=2
  loginTest(successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Login/index`,
      {
        platform: 0,
        code: "2"
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },


  // http://247api.vip.hnhxzkj.com/Login/WxAppletLogin/247?code=073IVB1w3uxzLY2o7V0w3cLQwc0IVB1y
  WxAppletLogin(code: string, successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Login/index`,
      {
        platform: 1,
        code: code,
        user_info: {
          "nickName": DataManager.cusInfo.nickname,
          "avatarUrl": DataManager.cusInfo.head
        }
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  // http://247api.vip.hnhxzkj.com/Login/WxAppletNickName?nickname=sdf&head=sdf
  WxAppletNickName(nickname: string, head: string, successCb: Function, failCb: Function) {
    httpUtil.get(
      `${this.httpUrl}Login/WxAppletNickName?nickname=${nickname}&head=${head}`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  // http://280api.vip.hnhxzkj.com/Put/set280Address?lat=1&lng=1
  /**获取用户位置 */
  set280Address(lat: string, lng: string, successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}Put/set280Address?lat=${lat}&lng=${lng}`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  // http://280api.vip.hnhxzkj.com/Query/getInfo
  /**获取用户信息 */
  getInfo(successCb, failCb) {
    httpUtil.get(`${this.httpUrl}user/Index/index`, { isNeedToken: true },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      });
  },

  // user/Index/skin
  /**图鉴信息 */
  getAtlas(successCb, failCb) {
    httpUtil.get(`${this.httpUrl}user/Index/skin`, { isNeedToken: true },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      });
  },

  getWxConfig(successCb: Function, failCb: Function) {
    httpUtil.post(
      `user/Index/getApiTicketAction`,
      {
        url: location.href,
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  getTicket(msg) {
    var { url, appId, timestamp, nonceStr, signature } = msg.data;
    if (!window["wx"]) {
      return;
    }
    window["wx"].config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名
      jsApiList: [
        // "updateAppMessageShareData", //好友
        // "updateTimelineShareData", //空间&朋友圈
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "showAllNonBaseMenuItem",
        "showMenuItems",
      ], // 必填，需要使用的JS接口列表
    });

    var shareConfig = xhrSupport.shareConfig();

    window["wx"].ready(function () {
      // window["wx"].updateAppMessageShareData(shareConfig);
      // window["wx"].updateTimelineShareData(shareConfig);
      window["wx"].onMenuShareTimeline(shareConfig);
      window["wx"].onMenuShareAppMessage(shareConfig);
      window["wx"].showAllNonBaseMenuItem();
      window["wx"].showMenuItems({
        menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"], // 要显示的菜单项，所有menu项见附录3
      });
    });
    window["wx"].error(function (res) {
      console.log("share_res:", res);
    });
  },
  shareConfig() {
    return {
      title: "兔某某新年大作战", // 分享标题
      desc: "兔某某新年大作战", // 分享描述
      link: `https://games.vip.hnhxzkj.com/zq/rabbit`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: "https://games.vip.hnhxzkj.com/zq/rabbit/avatar.png", // 分享图标
      success: () => {
        console.log('------分享成功------------')
        xhrSupport.shareSuccess();
      },
    };
  },

  shareSuccess() {
    // xhrSupport.ReceiveAward((success) => {
    //   success = JSON.parse(success)
    //   ViewManager.instance.showToast(success.message)
    // }, (fail) => { })
  },

  GetInfo(successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Index/index`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  StartGame(successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}Front/StartGame`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  // https://tmm.vip.hnhxzkj.com//user/Games/gameOver  
  EndGame(fraction, successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Games/gameOver`,
      {
        fraction: fraction,
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  //   100.007.排行榜:https://tmm.vip.hnhxzkj.com//user/Index/provinceRanking
  // 提交参数{}
  GetRanks(successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Index/RankingList`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },
  // Games/appear_spirit
  /**首次进入游戏时显示go */
  showGo(successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Games/appear_spirit`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },


  //user/Games/refresh
  /**刷新 */
  refresh(successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Games/refresh`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  // https://kgkg.vip.hnhxzkj.com/user/Games/catch_spirit
  catchGo(sid, type, successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Games/catch_spirit`,
      {
        sid: sid,
        type: type,
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },


  // https://kgkg.vip.hnhxzkj.com/user/Games/spirit_watch_videos
  /**看视频刷新精灵 */
  videoRefreshGo(successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Games/spirit_watch_videos`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  //https://kgkg.vip.hnhxzkj.com/user/Games/refresh_watch_videos
  /**看视频刷新冷却按钮 */
  videoRefreshBtn(successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Games/refresh_watch_videos`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  videoRefreshBoll(successCb: Function, failCb: Function) {
    httpUtil.post(
      `${this.httpUrl}user/Games/refresh_videos_ball`,
      {
        isNeedToken: true
      },
      (success) => {
        successCb && successCb(success), (successCb = null);
      },
      (fail) => {
        failCb && failCb(fail), (failCb = null);
      })
  },

  // 

};
export default xhrSupport;
