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
export const toHex = (n) => `${n}`.replace(/(\d)(?=(?:\d{3})+(\.|$))/g, '$1,')
