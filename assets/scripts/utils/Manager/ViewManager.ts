import BaseView from "./BaseView";
import DataManager from "./DataManager";
import { Logger } from "./Logger";
import ResManager from "./ResManager";

export default class ViewManager {
    //场景管理者唯一实例
    private static _instance: ViewManager = null;
    private static toastPool = []
    scoreNode: cc.Node

    private constructor() {
        this.UIRoot = cc.find("Canvas").getChildByName("otherPanel");
        this.WNDRoot = cc.find("Canvas").getChildByName("wndPanel");

        this.GameRoot = cc.find("Canvas").getChildByName("GameUI");

        this.noteRoot = cc.find("Canvas").getChildByName("notePanel");


        Logger.log('构造 ViewManager')
    }

    /**
     * 将场景管理者制作为单例模式
     */
    public static get instance(): ViewManager {
        if (!this._instance) {
            this._instance = new ViewManager();
        }
        return this._instance;
    }

    //场景中UI的根节点
    private UIRoot: cc.Node;

    //场景中UI的根节点
    private WNDRoot: cc.Node;

    private GameRoot: cc.Node;

    private noteRoot: cc.Node;


    //当前场景
    private _curView: BaseView = null;
    private _curViewList: Map<string, cc.Node> = new Map<string, cc.Node>();

    //当前场景
    private _curWnd: BaseView = null;
    private _curWndList: Map<string, cc.Node> = new Map<string, cc.Node>();

    private _curNote: BaseView = null;
    private _curNoteList: Map<string, cc.Node> = new Map<string, cc.Node>();

    private _curWndPath: string = null;

    /**
     * 初始化
     */
    init() {
        // this.UIRoot = cc.find("Canvas").getChildByName("otherPanel");
    }

    showToast(msg, showTime = undefined, pos: cc.Vec2 = undefined) {
        var resName = "prefabs/common/toastLayer"
        let name = ResManager.Instance.getResourcesName(resName);
        let viewNode: cc.Node = this.WNDRoot.getChildByName(name);

        ResManager.Instance.loadPrefab(resName,
            (err, resource) => {
                if (ResManager.Instance.hasNode(name)) {
                    viewNode = ResManager.Instance.getNode(name);
                } else {
                    viewNode = cc.instantiate(resource);
                }

                ViewManager.toastPool.forEach(toastNode => {
                    if (cc.isValid(toastNode)) {
                        toastNode.runAction(cc.moveBy(0.1, 0, 70))
                    }
                })
                if (pos == undefined) {
                    viewNode.setPosition(cc.v2(0, 100));
                } else {
                    viewNode.setPosition(pos);
                }
                if (showTime == undefined) {
                    showTime = 2;
                }
                var callfunc = ((destroyNode) => {
                    ViewManager.toastPool.splice(ViewManager.toastPool.indexOf(destroyNode), 1);
                });
                var toastLayer = viewNode.getComponent("ToastLayer")
                toastLayer.showToast(msg, showTime, callfunc);
                this.WNDRoot.addChild(viewNode);
                viewNode.zIndex = 100
                ViewManager.toastPool.push(viewNode);
            });
    }

    showScoreTip(msg, showTime = undefined, pos: cc.Vec2 = undefined) {
        var resName = "prefabs/scoreTip"
        let name = ResManager.Instance.getResourcesName(resName);
        this.scoreNode && this.scoreNode.destroy()
        this.scoreNode = this.GameRoot.getChildByName(name);

        ResManager.Instance.loadPrefab(resName,
            (err, resource) => {
                if (ResManager.Instance.hasNode(name)) {
                    this.scoreNode = ResManager.Instance.getNode(name);
                } else {
                    this.scoreNode = cc.instantiate(resource);
                }
                this.scoreNode.runAction(cc.moveBy(0.5, 0, 150))
                // ViewManager.scorePool.forEach(toastNode => {
                //     if (cc.isValid(toastNode)) {
                //         toastNode.runAction(cc.moveBy(0.5, 0, 150))
                //     }
                // })
                if (pos == undefined) {
                    this.scoreNode.setPosition(cc.v2(0, 300));
                } else {
                    this.scoreNode.setPosition(pos);
                }
                if (showTime == undefined) {
                    showTime = 2;
                }
                var callfunc = ((destroyNode) => {
                    this.scoreNode.removeFromParent()
                    // ViewManager.scorePool.splice(ViewManager.scorePool.indexOf(destroyNode), 1);
                });
                var scoreTip = this.scoreNode.getComponent("scoreTip")
                scoreTip.showToast(msg, showTime, callfunc);
                this.GameRoot.addChild(this.scoreNode);
                this.scoreNode.zIndex = 100
                // ViewManager.scorePool.push(viewNode);
            });
    }


    /**
     * 展示视图
     * @param path 要展示视图的路径
     * @param params 展示视图时传的参数
     */
    public showView(path: string, ...params) {
        let name = ResManager.Instance.getResourcesName(path);
        let viewNode: cc.Node = this.UIRoot.getChildByName(name);
        if (!viewNode) {
            cc.Canvas.instance.node.getChildByName('loadTip').active = true
            ResManager.Instance.loadPrefab(path, (err, resource) => {
                if (ResManager.Instance.hasNode(name)) {
                    viewNode = ResManager.Instance.getNode(name);
                }
                else {
                    viewNode = cc.instantiate(resource);
                }
                viewNode.setPosition(cc.Vec2.ZERO);
                viewNode.parent = this.UIRoot;
                let panel = viewNode.getComponent(BaseView);
                viewNode.getComponent(viewNode.name).init(...params)
                if (panel) {
                    this._curView = panel;
                    this._curView.init(...params);
                    this._curView.showPanel();
                    this._curViewList.set(viewNode.name, viewNode);
                }
                cc.Canvas.instance.node.getChildByName('loadTip').active = false
            });
        }
        else {
            let panel = viewNode.getComponent(BaseView);
            viewNode.getComponent(viewNode.name).init(...params)
            if (panel) {
                this._curView = panel;
                this._curView.init(...params);
                this._curView.showPanel();
                this._curViewList.set(viewNode.name, viewNode);
            }
        }
        // Logger.log(JSON.stringify(this._curViewList))
        Logger.log('当前页:' + name)
    }

    /**
     * 隐藏视图
     * @param {string} path 要隐藏的视图路径
     * @param {boolean} isDestroy 是否销毁，有些只展示一次，展示结束之后销毁节省资源
     */
    public hideView(path: string, isDestroy: boolean = false) {
        let name = ResManager.Instance.getResourcesName(path);
        // if (!this._curViewList.get(name)) return
        console.log('name:' + name)
        let viewNode: cc.Node = this._curViewList.get(name);
        if (viewNode) {
            this._curViewList.delete(name);
            let panel = viewNode.getComponent(BaseView);
            if (panel) {
                panel.hidePanel();
            }
            if (isDestroy) {
                // ResManager.Instance.Recovery(name,viewNode)
                viewNode.destroy();
                Logger.log('关闭页面：' + name)
            }
        }
    }


    /**
   * 展示视图
   * @param path 要展示视图的路径
   * @param params 展示视图时传的参数
   */
    public showWnd(path: string, ...params) {
        Logger.log('params:' + params)
        if (DataManager.curWndPath) return
        DataManager.curWndPath = path
        let name = ResManager.Instance.getResourcesName(path);
        let wndNode: cc.Node = this.WNDRoot.getChildByName(name);
        Logger.log('name:' + name)
        if (!wndNode) {
            cc.Canvas.instance.node.getChildByName('loadTip').active = true
            ResManager.Instance.loadPrefab(path, (err, resource) => {
                if (ResManager.Instance.hasNode(name)) {
                    wndNode = ResManager.Instance.getNode(name);
                }
                else {
                    wndNode = cc.instantiate(resource);
                }
                wndNode.setPosition(cc.Vec2.ZERO);
                wndNode.parent = this.WNDRoot;
                let panel = wndNode.getComponent(BaseView);
                Logger.log('wndNode.name:' + wndNode.name)
                wndNode.getComponent(wndNode.name).init(...params)
                if (panel) {
                    this._curWnd = panel;
                    this._curWnd.init(...params);
                    this._curWnd.showPanel();
                    this._curWndList.set(wndNode.name, wndNode);
                }
                cc.Canvas.instance.node.getChildByName('loadTip').active = false
            });
        } else {
            Logger.log('wndNode.name:' + wndNode.name)
            let panel = wndNode.getComponent(BaseView);
            wndNode.getComponent(wndNode.name).init(...params)
            if (panel) {
                this._curWnd = panel;
                this._curWnd.init(...params);
                this._curWnd.showPanel();
                this._curWndList.set(wndNode.name, wndNode);
            }
        }
        // Logger.log(JSON.stringify(this._curViewList))
        Logger.log('当前窗口:' + name)
    }

    /**
     * 隐藏窗口
     * @param {string} path 要隐藏的窗口路径
     * @param {boolean} isDestroy 是否销毁，有些只展示一次，展示结束之后销毁节省资源
     */
    public hideWnd(path: string, isDestroy: boolean = false) {
        let name = ResManager.Instance.getResourcesName(path);
        // if (!this._curViewList.get(name)) return
        let wndNode: cc.Node = this._curWndList.get(name);
        if (wndNode) {
            DataManager.curWndPath = null

            this._curWndList.delete(name);
            let panel = wndNode.getComponent(BaseView);
            if (panel) {
                panel.hidePanel();
            }
            if (isDestroy) {
                // ResManager.Instance.Recovery(name,viewNode)
                wndNode.destroy();
                Logger.log('关闭页面：' + name)
            }
        }
    }




     /**
     * 展示视图
     * @param path 要展示视图的路径
     * @param params 展示视图时传的参数
     */
     public showNote(path: string, ...params) {
        let name = ResManager.Instance.getResourcesName(path);
        let viewNode: cc.Node = this.noteRoot.getChildByName(name);
        if (!viewNode) {
            // cc.Canvas.instance.node.getChildByName('loadTip').active = true
            ResManager.Instance.loadPrefab(path, (err, resource) => {
                if (ResManager.Instance.hasNode(name)) {
                    viewNode = ResManager.Instance.getNode(name);
                }
                else {
                    viewNode = cc.instantiate(resource);
                }
                viewNode.setPosition(cc.Vec2.ZERO);
                viewNode.parent = this.noteRoot;
                let panel = viewNode.getComponent(BaseView);
                viewNode.getComponent(viewNode.name).init(...params)
                if (panel) {
                    this._curNote = panel;
                    this._curNote.init(...params);
                    this._curNote.showPanel();
                    this._curNoteList.set(viewNode.name, viewNode);
                }
                // cc.Canvas.instance.node.getChildByName('loadTip').active = false
            });
        }
        else {
            let panel = viewNode.getComponent(BaseView);
            viewNode.getComponent(viewNode.name).init(...params)
            if (panel) {
                this._curNote = panel;
                this._curNote.init(...params);
                this._curNote.showPanel();
                this._curNoteList.set(viewNode.name, viewNode);
            }
        }
        // Logger.log(JSON.stringify(this._curViewList))
        Logger.log('当前页:' + name)
    }

    /**
     * 隐藏视图
     * @param {string} path 要隐藏的视图路径
     * @param {boolean} isDestroy 是否销毁，有些只展示一次，展示结束之后销毁节省资源
     */
    public hideNote(path: string, isDestroy: boolean = false) {
        let name = ResManager.Instance.getResourcesName(path);
        // if (!this._curViewList.get(name)) return
        console.log('name:' + name)
        let viewNode: cc.Node = this._curNoteList.get(name);
        if (viewNode) {
            this._curNoteList.delete(name);
            let panel = viewNode.getComponent(BaseView);
            if (panel) {
                panel.hidePanel();
            }
            if (isDestroy) {
                // ResManager.Instance.Recovery(name,viewNode)
                viewNode.destroy();
                Logger.log('关闭页面：' + name)
            }
        }
    }


}
