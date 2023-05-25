
// export default class EventNetManager {
//     private _listenerMap = {};

//     protected static instance: EventNetManager;

//     public static getInstance(): EventNetManager {
//         if (!this.instance) {
//             this.instance = new EventNetManager();
//         }
//         return this.instance;
//     }

//     addListener(event, callback) {
//         if (!callback || !event)
//             return;
//         var listenerList = this._listenerMap[event];
//         console.log('listenerList:' + JSON.stringify(listenerList))
//         if (!listenerList){
//             listenerList = new Array();
//             this._listenerMap[event] = new Array();
//         }
      
//         for (var i = 0; i < listenerList.length; i++) {
//             if (listenerList[i] == callback)
//                 return;
//         }
//         listenerList.push(callback);
//         console.log('listenerList:' + JSON.stringify(listenerList))
//         cc.log("add event,size=%d", listenerList.length);
//     }

//     removeListener(event, callback) {
//         if (!callback || !event)
//             return;
//         var listenerList = this._listenerMap[event];
//         if (listenerList) {
//             for (var i = 0; i < listenerList.length; i++) {
//                 if (listenerList[i] == callback) {
//                     listenerList.splice(i, 1);
//                     break;
//                 }
//             }
//             //cc.log("remove event,size=%d",listenerList.length);
//         }
//     }

//     removeEvent(event) {
//         var listenerList = this._listenerMap[event];
//         if (listenerList) {
//             delete this._listenerMap[event];
//             listenerList = [];
//         }
//     }

//     dispatchEvent(event, param) {
//         if (!this._listenerMap) this._listenerMap = {}
//         if (this._listenerMap[event]) {
//             var listeners = this._listenerMap[event];
//             for (var i = 0; i < listeners.length; i++) {
//                 listeners[i](param);
//             }
//         }
//     }

// };
