import DataManager from "./DataManager";
import EnumManager from "./EnumManager";
import { Logger } from "./Logger";
import ResManager from "./ResManager";

export default class AudioManager {

    //单例唯一实例
    private static _instance: AudioManager = null;
    public static get instance(): AudioManager {
        if (!this._instance) {
            this._instance = new AudioManager();
        }
        return this._instance;
    }

    //默认bgm
    private bgm: string = "";

    /**
     * 播放或者切换背景音乐
     * @param bgm 背景音乐的路径名称，使用EnumManager.instance.AudioPath
     * @returns 
     */
    public playBGM(bgm: string) {
        if (bgm === "" || this.bgm === bgm || !DataManager.instance.bIsOpenMusic) {
            return;
        }
        this.bgm = bgm;
        cc.audioEngine.stopMusic();
        let path = bgm;
        ResManager.Instance.loadResource(path, cc.AudioClip, (err, res: cc.AudioClip) => {
            if (err) {
                Logger.err(err);
                return;
            }
            if (res) {
                cc.audioEngine.playMusic(res, true);
            }
            Logger.log('播放背景音乐')
        });
    }

    /**
     * 背景音乐是否正在播放
     * @returns 返回true/false
     */
    public isPlayingBGM(): boolean {
        return cc.audioEngine.isMusicPlaying();
    }

    /**
     * 恢复背景音乐
     */
    public resumeBGM() {
        if (!DataManager.instance.bIsOpenMusic) {
            return;
        }
        cc.audioEngine.stopMusic();
        if (this.bgm === "") {
            this.bgm = EnumManager.AudioPath.bgm;
        }
        let path = this.bgm;
        ResManager.Instance.loadResource(path, cc.AudioClip, (err, res: cc.AudioClip) => {
            if (err) {
                Logger.err(err);
                return;
            }
            cc.audioEngine.playMusic(res, true);
        });
    }

    //停止播放背景音乐
    public stopMusic() {
        cc.audioEngine.stopMusic();
    }

    /**
    * 播放音效
    * @param soundName 音效路径名称，使用EnumManager.instance.AudioPath
    * @param loop 是否循环播放
    * @param vulome 音效声音大小
    */
    public playSound(soundName: string, loop?: boolean, vulome: number = 1) {
        if (soundName === "" || !DataManager.instance.bIsOpenSound) {
            return;
        }
        let path = soundName;
        ResManager.Instance.loadResource(path, cc.AudioClip, (err, res: cc.AudioClip) => {
            if (err) {
                Logger.err(err);
                return;
            }
            if (res) {
                cc.audioEngine.playEffect(res, loop ? loop : false);
                cc.audioEngine.setEffectsVolume(vulome);
                Logger.log(`播放 ${soundName}`)
            }

        });
    }

    /**
     * 停止播放所有音效
     */
    public stopSound() {
        cc.audioEngine.stopAllEffects();
    }

    /**
     * 恢复播放所有音效
     */
    public resumeSound() {
        cc.audioEngine.resumeAllEffects();
    }

    /**
     * 停止播放背景音乐和音效
     */
    public stopAllMusicAndSound() {
        cc.audioEngine.stopAll();
    }

    /**
     * 恢复播放背景音乐和音效
     */
    public resumeAllMusicAndSound() {
        cc.audioEngine.resumeAll();
    }

    /**
     * 设置背景音乐的音量大小(0-1)
     */
    public setMusicVolume(volume: number) {
        cc.audioEngine.setMusicVolume(volume);
    }

    /**
     * 设置音效的音量大小(0-1)
     */
    public setSoundVolume(volume: number) {
        cc.audioEngine.setEffectsVolume(volume);
    }

    /**
     * 音效按钮有效点击时间
     */
    private clickTime: number = 0;
    public isCanClick(): boolean {
        let time = new Date().getTime();
        if ((time - this.clickTime) < 300) {
            return;
        }
        else {
            this.clickTime = time;
        }
        this.playSound(EnumManager.AudioPath.click);
    }

    public wxShake() {
        console.log(`DataManager.instance.bIsOpenShake:` + DataManager.instance.bIsOpenShake)
        if (DataManager.instance.BrowserInfo.isWeixin) {
            if (DataManager.instance.bIsOpenShake) {
                wx.vibrateShort({
                    // type:"medium",
                })
            } else {
                return;
            }
        }
    }

}
