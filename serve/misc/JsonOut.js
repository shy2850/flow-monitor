const zlib = require('zlib')
module.exports = (fn) => (req, resp) => {
    resp.writeHead(200, {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json; charset=utf-8'
    })
    resp.end(zlib.gzipSync(JSON.stringify(fn(req, resp))))
    return false
}
