const { exec } = require('child_process')

exports.usage = (filter = (e => true)) => new Promise((resolve, reject) => {
    exec('df -k', (err, data) => {
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
