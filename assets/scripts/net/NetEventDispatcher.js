/**
* Created by kenkozheng on 2014/8/20.
*/
var NetEventDispatcher = {
    _listenerMap: {},
    addListener: function (event, callback,self) {
        if (!callback || !event)
            return;
        var listenerList = this._listenerMap[event];
        if (!listenerList)
            listenerList = this._listenerMap[event] = new Array();

        for (var i = 0; i < listenerList.length; i++) {
            if (listenerList[i] == callback)
                return;
        }
        listenerList.push([callback,self]);
        //cc.log("add event,size=%d",listenerList.length);
    },

    removeListener: function (event, callback) {
        if (!callback || !event)
            return;
        var listenerList = this._listenerMap[event];
        if (listenerList) {
            for (var i = 0; i < listenerList.length; i++) {
                // debugger
                console.log('listenerList' + listenerList[i].prototype)
                console.log('callback:' + callback.prototype)

                console.log(callback == listenerList[i][0])


                if (listenerList[i][0] == callback) {
                    listenerList.splice(i, 1);
                    break;
                }
            }
            //cc.log("remove event,size=%d",listenerList.length);
        }
    },

    removeEvent: function (event) {
        var listenerList = this._listenerMap[event];
        if (listenerList) {
            delete this._listenerMap[event];
            listenerList = [];
        }
    },

    dispatchEvent: function (event, param) {
        if (this._listenerMap[event]) {
            var listeners = this._listenerMap[event];
            for (var i = 0; i < listeners.length; i++) {
                var arr = listeners[i];
                let fun = arr[0];
                let fun1 = fun.bind(arr[1])
                fun1(param)
            }
        }
    }

};

// var p = MyEventDispatcher.prototype;

// p._listenerMap = {};
// /**
// *
// * @param event String
// * @param callback function
// */
// p.addListener = function(event, callback){
//     if(!callback || !event)
//         return;
//     var listenerList = this._listenerMap[event];
//     if(!listenerList)
//         listenerList = this._listenerMap[event] = new Array();

//     for (var i = 0; i < listenerList.length; i++) {
//         if(listenerList[i] == callback)
//             return;
//     }
//     listenerList.push(callback);
// };

// p.removeListener = function(event, callback){
//     if(!callback || !event)
//         return;
//     var listenerList = this._listenerMap[event];
//     if(listenerList)
//     {
//         for (var i = 0; i < listenerList.length; i++) {
//             if(listenerList[i] == callback)
//             {
//                 listenerList.splice(i, 1);
//                 return;
//             }
//         }
//     }
// };

// /**
// *
// * @param event String
// */
// p.dispatchEvent = function(event){
//     if(this._listenerMap[event])
//     {
//         var listeners = this._listenerMap[event].slice();
//         for (var i = 0; i < listeners.length; i++) {
//             listeners[i](event);
//         }
//     }
// }

module.exports = NetEventDispatcher;