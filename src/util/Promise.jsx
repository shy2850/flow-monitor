const emptyFunction = () => {}

module.exports = class {
    constructor (fn) {
        let resolveList = []
        let rejectList = []
        
        setTimeout(function () {
            fn(res => {
                resolveList.map(resolve => {
                    res = resolve(res)
                })
            }, err => {
                resolveList.map(resolve => {
                    err = resolve(err) || err
                })
            })
        }, 0)

        this.yes = (fn1, fn2) => {
            resolveList.push(fn)
            fn2 && rejectList.push(fn)
        }
        this.no = fn => rejectList.push(fn)
        this.always = fn => {
            resolveList.push(fn)
            rejectList.push(fn)
        }
    }
}
