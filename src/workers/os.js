const MAX_RUNTIME = 60

let cpuruntime = []
const renderCPU = cpu => {
    cpu.map((c, i) => {
        let cr = cpuruntime[i]
        if (cr) {
            cr.unshift(c)
            if (cr.length > MAX_RUNTIME) {
                cr.length = MAX_RUNTIME
            }
        } else {
            cpuruntime[i] = [c]
        }
    })
    return cpuruntime
}

let memruntime = []
const renderMEM = mem => {
    memruntime.unshift(mem.usedPercent || 0)
    if (memruntime.length > MAX_RUNTIME) {
        memruntime.length = MAX_RUNTIME
    }
    return memruntime
}

let diskruntime = []
const renderDISK = disk => {
    disk.map((d, i) => {
        let dr = diskruntime[i]
        const {name, total, used} = d
        const percent = (used / total).toFixed(2)
        if (dr) {
            dr.data.unshift(percent)
            if (dr.data.length > MAX_RUNTIME) {
                dr.data.length = MAX_RUNTIME
            }
        } else {
            diskruntime[i] = {
                name,
                data: [percent]
            }
        }
    })
    return diskruntime
}

new EventSource('/os.runtime').onmessage = function (e) {
    const { cpu, mem, disk, net } = JSON.parse(e.data)
    postMessage({
        cpu: renderCPU(cpu),
        mem: renderMEM(mem),
        disk: renderDISK(disk)
    })
}
