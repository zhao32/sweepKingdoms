import { Logger } from "./Logger";

interface Resources {
    //节点类型
    Node: { [propName: string]: cc.Node },
    Prefab: { [PropName: string]: cc.Prefab },
    NodePool: { [propName: string]: cc.NodePool },
    //资源动画
    AnimationClip: { [propName: string]: cc.AnimationClip },
    ParticleAsset: { [propName: string]: cc.ParticleAsset },
    TiledMapAsset: { [propName: string]: cc.TiledMapAsset },
    Mesh: { [propName: string]: cc.Mesh },
    AudioClip: { [propName: string]: cc.AudioClip },
    Font: { [propName: string]: cc.Font },
    JsonAsset: { [propName: string]: cc.JsonAsset },
    SceneAsset: { [propName: string]: cc.SceneAsset },
    SpriteAtlas: { [propName: string]: cc.SpriteAtlas },
    SpriteFrame: { [propName: string]: cc.SpriteFrame },
    TextAsset: { [propName: string]: cc.TextAsset },
    Texture2D: { [propName: string]: cc.Texture2D },
    Material: { [propName: string]: cc.Material },
    //龙骨
    DragonBonesAsset: { [propName: string]: dragonBones.DragonBonesAsset },
    DragonBonesAtlasAsset: { [propName: string]: dragonBones.DragonBonesAtlasAsset },
    CCClass: {},
    Unrecognized:{},//类型无法识别
}

export default class ResManager {

    //资源管理者唯一实例
    private static _instance: ResManager = null;
    //类中对资源接口的声明，必须声明接口中的全部属性或者方法
    private _allResources: Resources = {
        Node: {},
        Prefab: {},
        NodePool: {},
        AnimationClip: {},
        ParticleAsset: {},
        TiledMapAsset: {},
        Mesh: {},
        AudioClip: {},
        Font: {},
        JsonAsset: {},
        SceneAsset: {},
        SpriteAtlas: {},
        SpriteFrame: {},
        TextAsset: {},
        Texture2D: {},
        Material: {},
        DragonBonesAsset: {},
        DragonBonesAtlasAsset: {},
        CCClass: {},
        Unrecognized:{},
    };

    //资源管理者类的构造函数
    private constructor() { }

    /**将资源管理者设置为单例模式 
     * @returns {ResManager} 返回资源管理唯一实例
    */
    public static get Instance(): ResManager {
        if (!this._instance) {
            this._instance = new ResManager();
        }
        return this._instance
    }

    /**
     * 通过路径获取节点资源名称
     * @param {string} path 要获取的节点资源的路径
     * @returns {string} 返回节点名称的字符串
     */
    public getResourcesName(path: string): string {
        let index = path.lastIndexOf("/");
        if (index === -1) {
            return path;
        }
        else {
            return path.slice(index + 1);
        }
    }

    /**
     * 判断是否已经有了这个节点资源
     * @param {string} resName 判断是否已经存在节点资源的名字
     * @param {string} path 可选配置，节点资源的路径
     * @returns {boolean} 有返回true，没有返回false
     */
    public hasNode(resName: string, path?: string): boolean {
        let name: string;
        if (path) {
            name = this.getResourcesName(path);
        } else {
            name = resName;
        }
        if (this._allResources.Node[name]) {
            return true;
        }
        if (this._allResources.NodePool[name]) {
            return true;
        }
        if (this._allResources.Prefab[name]) {
            return true;
        }
        return false;
    }

    /** 
     * 获取节点，如果handle的Map中有就直接获取到，没有的话就实例化出来
     * @param {string} resName 要获取的节点名称
     * @param {string} path 可选参数，资源路径
     * @returns {cc.Node} 返回节点或者undefined
    */
    public getNode(resName: string, path?: string): cc.Node | undefined {
        let name;
        if (path) {
            name = this.getResourcesName(path);
        } else {
            name = resName;
        }
        //如果名称为name的节点池不存在，就新建一个；如果存在，判断大小，有就取出来用
        let nodePool = this._allResources.NodePool[name];
        if (!nodePool) {
            nodePool = this._allResources.NodePool[name] = new cc.NodePool();
        }
        if (nodePool.size() > 0) {
            return nodePool.get();
        }
        //如果存在名称为name的节点，就实例化出来
        if (this._allResources.Node[name]) {
            let node: cc.Node = cc.instantiate(this._allResources.Node[name]);
            //CocosCreator的节点上面本来不存在， 添加一个表示节点所在的NodePool的名字
            // node.CProperty = { nodePoolName: name };
            return node;
        }
        //如果存在名称为name的预制体，就实例化出来
        if (this._allResources.Prefab[name]) {
            let node: cc.Node = cc.instantiate(this._allResources.Prefab[name]);
            // node.CProperty = { nodePoolName: name };
            return node;
        }
    }

    // public Recovery(name,node){
    //     this._allResources.NodePool[name].put(node)
    // }

    /**
    * 加载预制体资源
    * @param path 预制体资源的路径
    * @param completeCallback 完成之后的回调
    */
    public loadPrefab(path: string, completeCallback: (error: Error, resource: cc.Prefab) => void) {
        let prefabName = this.getResourcesName(path);
        if (this._allResources.Prefab[prefabName]) {
            completeCallback(undefined, this._allResources.Prefab[prefabName]);
        } else {
            let callFunc = (error: Error, resource: cc.Prefab) => {
                if (!error) {
                    this._allResources.Prefab[prefabName] = resource;
                }
                completeCallback(error, resource);
            }
            cc.loader.loadRes(path, cc.Prefab, callFunc);
        }
    }

    /**
     * 加载其他资源
     * @param path 加载的资源的路径
     * @param type 加载的资源的类型
     * @param completeCallback 加载完成之后的回调
     */
    public loadResource(path: string, type: typeof cc.Asset, completeCallback: (error: Error, resource: cc.Asset) => void) {
        let assetName = this.getResourcesName(path);
        // console.log('assetName:'+assetName)
        // console.log('type:' + type)
        let typeName = type.name;
        // console.log('typeName:' + typeName)
        typeName = typeName.split("cc_").join("")
        if(!typeName)typeName = "Unrecognized"
        // Logger.log(JSON.stringify(this._allResources))
        if (this._allResources[typeName][assetName]) {
            completeCallback(undefined, this._allResources[typeName][assetName]);
        }
        else {
            let callFunc = (err: Error, resource: cc.Asset) => {
                if (!err) {
                    this._allResources[typeName][assetName] = resource;
                }
                completeCallback(err, resource);
            }
            cc.loader.loadRes(path, type, callFunc);
        }
    }


    /**
     * 加载节点图片资源
     * @param path 
     * @param node 
     */
    static loadItemIcon(path: string, node: cc.Node) {
        Logger.log("path:" + path)
        node.getComponent(cc.Sprite).spriteFrame = null;
        ResManager.Instance.loadResource(path, cc.SpriteFrame, function (error, spriteFrame: cc.SpriteFrame) {
            if (!error) {
                if (node && cc.isValid(node)) {
                    Logger.log('spriteFrame:'+spriteFrame)
                    node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }
            } else {
                cc.error("icon load error:" + path);
            }
        })
    }
}
