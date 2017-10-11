const JsonOut = require('./misc/JsonOut.js')
const ServerSent = require('./misc/ServerSent.js')
const Route = require('./Route')
const route = new Route()

route.on('os.info', JsonOut(require('./action/os/lshw.js')))
route.on('os.runtime', ServerSent({
    cpu: require('./action/os/cpu.js'),
    mem: require('./action/os/mem.js'),
    disk: require('./action/os/disk/runtime.js'),
    net: require('./action/os/net.js')
}))
route.on('sys.runtime', ServerSent(require('./action/sys/runtime.js')))
// BrowserRouter
route.on(/^[\w\/]*$/, () => 'index.html')

module.exports = function (pathname, req, resp, memory) {
    return route.execute(pathname, req, resp, memory)
}
