const MAX_RUNTIME = 60
let cpuruntime = []

new EventSource('/os.runtime').onmessage = function (e) {
    const line = e.data.match(/[\d\.]+/g).map(Number)
    cpuruntime.unshift(e.data)
    if (cpuruntime.length > MAX_RUNTIME) {
        cpuruntime.length = MAX_RUNTIME
    }
    postMessage(cpuruntime)
}
