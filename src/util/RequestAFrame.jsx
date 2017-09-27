
var _timeoutQueue = {}
var countdowns = []
/**
 * 按照指定key添加轮训事件 【首次添加一般不会立即执行】
 * k    : 轮询事件的key
 * fn   : 要轮训的事件    return false; 
 * timer: 轮训间隔,单位ms, 默认是200, 只支持 1000/60 的倍数
 * times: 轮询事件执行次数, 达到指定次数后清除
**/
export const addTimeout = function (k, fn, timer, times) {
    fn.timer = Math.floor((timer || 200) * 60 / 1000)
    fn.times = times || Infinity
    _timeoutQueue[k] = fn
}
/**
 * 按照指定key清除轮训事件 
**/
export const deleteTimeout = function (k) {
    delete _timeoutQueue[k]
}

function queueTimeout (index) {
    for (var i in _timeoutQueue) {
        var fn = _timeoutQueue[i]
        if (index % fn.timer === 0) { // 如果按照时间轮训到了，执行代码
            if (!fn.times--) { // 如果可执行次数为0, 移除方法
                delete _timeoutQueue[i]
            } else {
                var _r = fn()
                if (_r === false) {
                    delete _timeoutQueue[i]
                }
            }
        }
    }
}

let index = 0
const loop = function loop () {
    index++
    setTimeout(function () {
        queueTimeout(index)
    }, 0)
    window.requestAnimationFrame ? window.requestAnimationFrame(loop)
        : setTimeout(loop, 1000 / 60)
}
loop()
