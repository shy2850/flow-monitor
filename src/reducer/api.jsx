
exports.os = {
    info: () => fetch('/os.info').then(res => res.json()),
    runtime: () => new Worker('/src/workers/os.js')
}
exports.sys = {
    runtime: () => new Worker('/src/workers/sys.js')
}
