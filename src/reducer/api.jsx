
exports.os = {
    info: () => fetch('/os.info').then(res => res.json()),
    runtime: () => new Promise(resolve => {
        new Worker('../workers/os.js').addEventListener('message', resolve)
    })
}
