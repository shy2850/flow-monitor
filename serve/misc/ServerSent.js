module.exports = (fn) => (req, resp) => {
    resp.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    let interval = setInterval(() => {
        resp.write(`data:${JSON.stringify(fn(req, resp))}\n\n`)
    }, 1000)
    req.connection.addListener('close', () => {
        resp.end()
        clearInterval(interval)
    }, false)
    return false
}
