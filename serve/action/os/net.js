const os = require('os')
const netStat = require('net-stat')
module.exports = () => os.platform() === 'linux' && netStat.raw()
