import { Logger } from "./Logger";


/**存放全局数据的了 */
export default class BaseUtil {

    private static _instance: BaseUtil;

    private static volume = 1;

    private prefabs: { [key: string]: any[] } = {};
    private soundCache: { [key: string]: any[] } = {};

    private constructor() {
        Logger.log('构造BaseUtil函数')
    }

    public static getInstance() {
        if (!this._instance) {
            this._instance = new BaseUtil()
        }
        return this._instance
    }

    public static get Instance(): BaseUtil {
        if (!this._instance) {
            this._instance = new BaseUtil()
        }
        return this._instance
    }

    static loadSound(
        soundPath: string,
        soundType: number,
        loop: boolean,
        cb: Function = null,
        isRelease: boolean = false
    ) {
        Logger.log('播放：' + soundPath)
        var soundProperty = ["playMusic", "playEffect"][soundType];
        let self = this
        if (BaseUtil.Instance.soundCache[soundPath]) {
            cc.audioEngine[soundProperty](BaseUtil.Instance.soundCache[soundPath], loop);
        } else {
            BaseUtil.load(soundPath, cc.AudioClip, function (err, res) {
                if (!err) {
                    if (isRelease && !loop) {
                        let id = cc.audioEngine.play(res, false, self.volume);
                        cc.audioEngine.setFinishCallback(id, () => {
                            cc.audioEngine.stop(id);
                            cc.audioEngine.uncache(res);
                            BaseUtil.release(res);
                        });
                    } else {
                        BaseUtil.Instance.soundCache[soundPath] = res;
                        cc.audioEngine[soundProperty](res, loop);
                    }
                    cb && cb(res);
                    cb = null;
                }
            });
        }
    }

    /**
     * 资源加载
     * @param path
     * @param type
     * @param cb
     */
    static load(path: string, type, cb: Function) {
        cc.resources.load(path, type || cc.Asset, (err, res) => {
            cb && cb(err, res), (cb = null);
        });
    }

    /**
     * 资源释放
     * @param path
     * @param type
     * @param cb
     */
    static release(res: cc.AudioClip) {
        cc.assetManager.releaseAsset(res);
    }

    /***************************************
   * 生成从minNum到maxNum的随机数。
   * 如果指定decimalNum个数，则生成指定小数位数的随机数
   * 如果不指定任何参数，则生成0-1之间的随机数。
   ****************************************/
    static randomNum(maxNum, minNum, decimalNum = null) {
        var max = 0,
            min = 0;
        minNum <= maxNum
            ? ((min = minNum), (max = maxNum))
            : ((min = maxNum), (max = minNum));
        switch (arguments.length) {
            case 1:
                return Math.floor(Math.random() * (max + 1));
            case 2:
                return Math.floor(Math.random() * (max - min + 1) + min);
            case 3:
                return (Math.random() * (max - min) + min).toFixed(decimalNum);
            default:
                return Math.random();
        }
    }
    /**
     * 加载图片资源
     * @param resUrl 
     * @param node 
     */
    static loadItemIcon(resUrl: string, node: cc.Node) {
        node.getComponent(cc.Sprite).spriteFrame = null;
        BaseUtil.load(resUrl, cc.SpriteFrame, function (error, spriteFrame) {
            if (!error) {
                if (node && cc.isValid(node)) {
                    node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            } else {
                cc.log("icon load error:" + resUrl);
            }
        })
    }

    static destroyNode(node) {
        if (node && cc.isValid(node)) {
            if (node.childrenCount > 0) {
                var children = node.children;
                children.forEach(child => {
                    this.destroyNode(child);
                });
            };
            node.destroy();
        };
    }

    static getPrefabByResName(resName: string, callback?: Function) {
        if (!BaseUtil.Instance.prefabs[resName]) {
            BaseUtil.load(resName, cc.Prefab, function (err, prefab) {
                if (!err) {
                    BaseUtil.Instance.prefabs[resName] = prefab
                    callback && callback(prefab), callback = null
                } else {
                    Logger.log(resName)
                    cc.log('加载预设失败：', err)
                }
            })
        } else {
            callback && callback(BaseUtil.Instance.prefabs[resName]), callback = null
        }
    }
}