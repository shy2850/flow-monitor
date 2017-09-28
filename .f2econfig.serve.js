module.exports = {
    port: 80,
    livereload: false,
    gzip: true,
    onRoute: require('./serve/index')
}