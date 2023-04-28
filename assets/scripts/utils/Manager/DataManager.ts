import pageGame from "../../pageGame"


export interface cusInfo {
    cusid: string,
    /**昵称 */
    nickname: string,
    /**头像 */
    head: string,

    openid: string

}

export interface playInfo {
    userid: string,
    nickname: string,
    score: number,
    head: string
}

export default class DataManager {

    //单例唯一实例
    private static _instance: DataManager = null;
    public static get instance(): DataManager {
        if (!this._instance) {
            this._instance = new DataManager();
        }
        return this._instance;
    }

    public bIsOpenMusic: boolean = true
    public bIsOpenSound: boolean = true
    public bIsOpenShake: boolean = true


    public static curWndPath: string = null
    /**0 使用 1 出售 2 合成 */
    public static type: number = 0 // 

    public static compCount: number = 0

    // "head":"","nickname":"","score":0,"userid":119186}

    public static cusInfo: cusInfo = {
        cusid: '',
        nickname: '',
        head: '',
        openid: ''
    }

    public static pageGame: pageGame

    static group(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while (index < array.length) {
            newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
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

    static _getBoundingBoxToWorld(node) {
        var p = cc.isValid(node) ? node.convertToWorldSpaceAR(cc.v2(0, 0)) : cc.v2();
        return cc.rect(p.x, p.y, node.width, node.height);
    }
    /**
     * 两个坐标距离
     * @param p1 
     * @param p2 
     * @returns 
     */
    static pDistance(p1, p2) {
        return p1.sub(p2).mag();
    }

    static authorize: boolean

    static goInfo = [
        {
            id: 0,
            name: '三叶子',
            point: 'aa',
            info: 'aaaaaaaaaaaaaaaaa',
            skin: '',
            isGet: true
        },
        {
            id: 1,
            name: '南瓜幽灵',
            point: 'bb',
            info: 'bbbbbbbbbbbbbbbbb',
            skin: '',
            isGet: true

        },
        {
            id: 2,
            name: '呆甲兽',
            point: 'cc',
            info: 'ccccccccccccccccc',
            skin: '',
            isGet: false

        },
        {
            id: 3,
            name: '呆苞苞',
            point: 'dd',
            info: 'ddddddddddddddddd',
            skin: '',
            isGet: false

        },
        {
            id: 4,
            name: '咕咕',
            point: 'ee',
            info: 'eeeeeeeeeeeeeeeee',
            skin: '',
            isGet: true

        },
        {
            id: 5,
            name: '哭哭蛋',
            point: 'ff',
            info: 'fffffffffffffffff',
            skin: '',
            isGet: true

        }]

    static getSkins: string = ''

    static bollNum: number = 0

    static coloTime: number = 0

    static reflsahType: number = 0

    static shareStart: number = 0

    getDateDis(sTime: any, eTime: any) {
        //将日期字符串转换为时间戳
        //作为除数的数字
        var divNumSecond = 1000;
        const second = (eTime - sTime) / (divNumSecond)
        return second
    }

    BrowserInfo = {
        userAgent: navigator.userAgent.toLowerCase(),
        isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
        isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
        isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
        isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
    }

}
