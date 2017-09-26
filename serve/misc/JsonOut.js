module.exports = (fn) => (req, resp) => {
    resp.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    })
    resp.end(JSON.stringify(fn(req, resp)))
    return false
}
