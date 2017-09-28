const { argv } = process
const build = argv[argv.length - 1] === 'build'
const onRoute = !build && require('./serve/index') 
module.exports = {
    port: 33533,
    livereload: !build,
    build,
    gzip: true,
    useLess: true,
    useBabel: {
        only: '*.jsx',
        plugins: [
            "babel-plugin-transform-es2015-modules-amd",
            "babel-plugin-transform-class-properties",
            "babel-plugin-transform-object-rest-spread"
        ],
        presets: ["react", "es2015"],
        moduleIds: true,
        getModuleId: pathname => pathname.replace(/^[\\/]?src\//, '')
    },
    buildFilter: pathname => /^(css|src|index|favicon)\b/.test(pathname),
    onRoute,
    include: /\$require\(["'\s]*([^"'\s]+)["'\s]*\)/g,
    // app: 'static',
    middlewares: [
        {
            test: /(\.html|require\.js)$/,
            middleware: 'template'
        }
    ],
    bundles: [
        {
            test: /^src\/(?!(require|index|workers)).*$/,
            dist: 'src/index.js'
        }
    ],
    output: require('path').join(__dirname, './dist')
}
