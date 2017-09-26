const os = require('os')
const { execSync } = require('child_process')
const platform = os.platform()
const { model } = os.cpus()[0]

let cpu = {platform, model}

const render = (log) => {
    log.split('\n').map(line => {
        let [k, v] = line.split(':')
        v = (v || '').trim()
        switch (k.trim()) {
        case 'Architecture': cpu.archi = v
            break
        case 'CPU(s)': cpu.cpus = v | 0
            break
        case 'Socket(s)': cpu.sockets = v | 0
            break
        case 'CPU MHz': cpu.mhz = Number(v)
            break
        case 'L1d cache': cpu.l1d = parseInt(v)
            break
        case 'L1i cache': cpu.l1i = parseInt(v)
            break
        case 'L2 cache': cpu.l2 = parseInt(v)
            break
        case 'L3 cache': cpu.l3 = parseInt(v)
            break
        default:
            break
        }
    })
}
switch (platform) {
case 'linux':
    render(execSync('lscpu').toString())
    break
default:
    render(require('./lscpu.js'))
    break
}
module.exports = cpu
