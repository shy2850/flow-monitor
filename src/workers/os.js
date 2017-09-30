const MAX_RUNTIME = 60

let cpuruntime = []
const renderCPU = cpu => {
    cpu.map((c, i) => {
        let cr = cpuruntime[i]
        if (cr) {
            cpuruntime[i] = [c].concat(cr).slice(0, MAX_RUNTIME)
        } else {
            cpuruntime[i] = [c]
        }
    })
    return cpuruntime
}

let memruntime = []
const renderMEM = mem => {
    memruntime = [mem.usedPercent || 0].concat(memruntime).slice(0, MAX_RUNTIME)
    return memruntime
}

let diskruntime = []
const renderDISK = disk => {
    disk.map((d, i) => {
        let dr = diskruntime[i]
        const {name, total, used} = d
        const percent = (used * 100 / total).toFixed(2)
        if (dr) {
            dr.data = [percent].concat(dr.data).slice(0, MAX_RUNTIME)
        } else {
            diskruntime[i] = {
                name,
                data: [percent]
            }
        }
    })
    return diskruntime
}

let netruntime = {}
const renderNET = net => {
    Object.keys(net).map((k, i) => {
        let base = net[k]
        let item = netruntime[k]
        const [rb, tb, rp, tp] = [base.bytes.receive, base.bytes.transmit, base.packets.receive, base.packets.transmit]
        if (!item) {
            item = netruntime[k] = {
               rb, tb, rp, tp,
               rbps: [], tbps: [], rpps: [], tpps: []
            }
        } else {
            item = netruntime[k] = {
                rb, tb, rp, tp,
                rbps: [(rb - item.rb | 0) / 1024 / 1024].concat(item.rbps).slice(0, MAX_RUNTIME),
                tbps: [(tb - item.tb | 0) / 1024 / 1024].concat(item.tbps).slice(0, MAX_RUNTIME),
                rpps: [rp - item.rp | 0].concat(item.rpps).slice(0, MAX_RUNTIME),
                tpps: [tp - item.tp | 0].concat(item.tpps).slice(0, MAX_RUNTIME)
            }
        }
        base['_runtime'] = item
    })
    return net
}

new EventSource('/os.runtime').onmessage = function (e) {
    const { cpu, mem, disk, net } = JSON.parse(e.data)
    postMessage({
        cpu: renderCPU(cpu),
        mem: renderMEM(mem),
        disk: renderDISK(disk),
        net: renderNET(net)
    })
}
