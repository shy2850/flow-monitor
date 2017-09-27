const { allStats } = require('mem-stat')
const isLinux = require('os').platform() === 'linux'
module.exports = () => isLinux && allStats()
