
let cpuruntimeSent
exports.os = {
    cpuinfo: () => fetch('/cpu.info').then(res => res.json()),
    cpuruntime: () => cpuruntimeSent || (cpuruntimeSent = new EventSource('/cpu.runtime'))
}
