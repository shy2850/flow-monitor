const fs = require('fs')
const path = require('path')
const fileName = path.join(__dirname, './runtime.log')

module.exports = () => fs.readFileSync(fileName).toString().split(/[\r\n]+/)
