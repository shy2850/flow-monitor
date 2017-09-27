const { usage } = require('./disk-stat.js')
let disks = []

const renderDisks = function renderDisks () {
    usage(line => /^\/dev\//.test(line)).then(data => {
        disks = data
        // console.log(disks)
    })
    setTimeout(renderDisks, 1000)
}
renderDisks()

module.exports = () => disks
