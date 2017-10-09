const os = require('os')
module.exports = () => ({
    usedPercent: 100 * (1 - os.freemem() / os.totalmem())
})
