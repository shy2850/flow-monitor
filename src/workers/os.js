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


new EventSource('/os.runtime').onmessage = function (e) {
    const { cpu } = JSON.parse(e.data)
    postMessage({
        cpu: renderCPU(cpu)
    })
}
