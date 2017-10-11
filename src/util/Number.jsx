const set = {
    ' ': 1,
    'K': 1024,
    'M': 1024 * 1024,
    'G': 1024 * 1024 * 1024,
    'T': 1024 * 1024 * 1024 * 1024
}

// 判断使用哪个单位合适
const getUnit = n => {
    let i = 0
    let _n = n
    while (_n > 1024) {
        _n /= 1024
        i++
    }
    return [' ', 'K', 'M', 'G', 'T'][i] || 'T'
}

export const toStorage = (n, fixed_len = 2, unit) => {
    if (!unit || !set[unit]) {
        unit = getUnit(n)
    }
    return (n / set[unit]).toFixed(fixed_len) + unit
}
export const toTime = (t) => {
    const M = [
        {v: 1000, u: '秒'},
        {v: 60, u: '分'},
        {v: 60, u: '时'},
        {v: 24, u: '天'}
    ]
    let result = ''
    let i = 0
    while (M[i] && t >= M[i].v) {
        t = parseInt(t / M[i].v)
        result = (M[i + 1] ? (t % M[i + 1].v) : t) + M[i].u + result
        i++
    }
    return result
}
export const toHex = (n) => `${n}`.replace(/(\.\d{3})\d+$/, '$1').replace(/(\d)(?=(?:\d{3})+(\.|$))/g, '$1,')
