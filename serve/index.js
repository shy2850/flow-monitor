const JsonOut = require('./misc/JsonOut.js')
const ServerSent = require('./misc/ServerSent.js')
const Route = require('./Route')
const route = new Route()

route.on('cpu.info', JsonOut(require('./action/cpu/info.js')))
route.on('cpu.runtime', ServerSent(require('./action/cpu/runtime.js')))
// BrowserRouter
route.on(/^[\w\/]*$/, () => 'index.html')

module.exports = function (pathname, req, resp, memory) {
    return route.execute(pathname, req, resp, memory)
}
