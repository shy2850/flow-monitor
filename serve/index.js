const Route = require('./Route')
const route = new Route()

// BrowserRouter
route.on(/^[\w\/]*$/, () => 'index.html')

module.exports = function (pathname, req, resp, memory) {
    return route.execute(pathname, req, resp, memory)
}
