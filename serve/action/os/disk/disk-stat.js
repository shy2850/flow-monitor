const { exec } = require('child_process')
const os = require('os')
const isWin = os.platform() === 'win32'

exports.usage = (filter = (e => true)) => new Promise((resolve, reject) => {
    isWin ? exec('wmic volume', (err, data) => {
        if (err) {
            reject(err)
        } else {
            let disks = []
            data.toString().match(/.+/g).map((line, index) => {
                if (index) {
                    let m = line.match(/\S+/g)
                    let [name, total, used] = [m[4], m[3] / 1024 / 1024, m[10] / 1024 / 1024]
                    disks.push({name, total, used})
                }
            })
            resolve(disks)
        }
    }) : exec('df -k', (err, data) => {
        if (err) {
            reject(err)
        } else {
            let disks = []
            data.split('\n').map((line, index) => {
                if (index && filter(line)) {
                    let [name, total, used] = line.split(/[\s\t]+/)
                    disks.push({name, total, used})
                }
            })
            resolve(disks)
        }
    })
})
