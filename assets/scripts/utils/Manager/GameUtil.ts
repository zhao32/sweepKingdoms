import Game from "../../Scene";
import ResManager from "./ResManager";

export default class GameUtil {

    //单例唯一实例
    private static _instance: GameUtil = null;
    public static get instance(): GameUtil {
        if (!this._instance) {
            this._instance = new GameUtil();
        }
        return this._instance;
    }
    static Game: Game

    public bIsOpenMusic: boolean = true
    public bIsOpenSound: boolean = true

    public static isPause: boolean = false

    public static _isPlaying: boolean = false

  
    static addPfbNode(path: string, parent, posX, container) {
        let name = ResManager.Instance.getResourcesName(path);
        let viewNode: cc.Node = null// this.UIRoot.getChildByName(name);
        ResManager.Instance.loadPrefab(path,
            (err, resource) => {
                if (ResManager.Instance.hasNode(name)) {
                    viewNode = ResManager.Instance.getNode(name);
                } else {
                    viewNode = cc.instantiate(resource);
                }
                viewNode.parent = parent
                viewNode.x = posX
                viewNode.y = 0
                viewNode.zIndex = -1
                container.push(viewNode)
            });
    }

    static numberToTime(num: number) {
        let fen = Math.floor(num / 60).toString()
        if (fen.length == 1) fen = '0' + fen
        let miao = (num % 60).toString()
        if (miao.length == 1) miao = '0' + miao
        return `${fen}:${miao}`
    }

    static group(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while(index < array.length) {
            newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
    }

}

