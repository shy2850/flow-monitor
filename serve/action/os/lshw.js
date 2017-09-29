const { execSync } = require('child_process')
const { readFileSync, existsSync } = require('fs')
const os = require('os')
const base = (function () {
    try {
        return JSON.parse(execSync('lshw -json').toString()).children[0]
    } catch (e) {
        return require('./lshw.json').children[0]
    }
})()

const resolve = function resolve ({children}) {
    let eles = []
    children.map(c => {
        eles.push(c)
        if (c.children) {
            eles = eles.concat(resolve(c))
        }
    })
    return eles
}
const elements = resolve(base)

// CPU 插槽
let processors = elements.filter(c => c['class'] === 'processor').map(({
    version,
    children = [],
    configuration = {}
}) => {
    return {
        // CPU 品牌型号
        version,
        // 三级缓存
        caches: children.map(({size}) => size),
        // 内核数量
        cores: configuration.cores | 0
    }
})

// 内存条插槽
let memories = elements.find(c => c['id'] === 'memory').children.map(({
    size,
    description
}) => {
    return size ? {
        size,
        description
    } : {}
})

// 硬盘信息
let disks = elements.filter(c => c['id'] === 'disk').map(({
    description,
    product,
    size
}) => {
    return size ? {
        size,
        product,
        description
    } : {}
})

// net
let networks = os.networkInterfaces()
let nets = Object.keys(networks).reduce((base, key) => base.concat(networks[key].map(n => {
    n.id = key
    let info = elements.find(item => {
        if (item.serial === n.mac && item.product) {
            n.product = item.product
            return true
        }
    })
    return n
})), [])

// GFX
let gfxes = elements.filter(e => e.id === 'display').map(({product, description}) => ({product, description}))

module.exports = () => ({
    processors,
    memories,
    disks,
    nets,
    gfxes,
    id: existsSync('/etc/machine-id') && readFileSync('/etc/machine-id') + '[not allowed]'
})
