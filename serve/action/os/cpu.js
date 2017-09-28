const cpuStat = require('cpu-stat')
const os = require('os')
let cpus = os.cpus().map(() => 0)

const renderCpu = function renderCpu () {
    cpus.map((n, coreIndex) => {
        cpuStat.usagePercent({
            coreIndex,
            sampleMs: 1000
        }, function (err, percent) {
            if (err) {
                return err
            } else {
                cpus[coreIndex] = Number(percent.toFixed(1))
            }
        })
    })
    setTimeout(renderCpu, 1000)
}
renderCpu()

module.exports = () => cpus
