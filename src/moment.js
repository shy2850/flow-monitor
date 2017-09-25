define(['module'], function (module) {
    'use strict'
    // 两位整数格式化，小于10高位补零
    var fmt_num = function (n) {
        return n < 10 ? '0' + n : n
    }
    var reg = /([yMdHhms\$]{1,2})/g
    var days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var map = {
        yy: function (d) { return d.getFullYear() },
        M: function (d) { return 1 + d.getMonth() },
        MM: function (d) { return fmt_num(1 + d.getMonth()) },
        d: function (d) { return d.getDate() },
        dd: function (d) { return fmt_num(d.getDate()) },
        h: function (d) { return d.getHours() % 12 },
        H: function (d) { return d.getHours() },
        hh: function (d) { return fmt_num(d.getHours() % 12) },
        HH: function (d) { return fmt_num(d.getHours()) },
        m: function (d) { return d.getMinutes() },
        mm: function (d) { return fmt_num(d.getMinutes()) },
        s: function (d) { return d.getSeconds() },
        ss: function (d) { return fmt_num(d.getSeconds()) },
        $: function (d) { return days[d.getDay()] },
        $$: function (d) { return days[d.getDay()] }
    }

    function DateUtil (t) {
        var date = new Date()
        t && date.setTime(parseInt(t, 10))
        this.date = date
        this.format = function (format) {
            return format.replace(reg, function (match, key) {
                return map[key](date)
            })
        }
        this.parse = function (str, format) {
            // 没有定义格式的话, 使用默认的格式
            format = format || 'yy/MM/dd hh:mm:ss'
            var map = {}
            var nums = str.match(/\d{1,4}/g)
            var fmts = format.match(reg)
            for (var i = 0; i < fmts.length; i++) {
                map[ fmts[i] ] = nums[i]
            };
            // for循环完成格式和数据的对应关系。

            // 完成替换并且返回创建的Date结果。
            return new Date('yy/MM/dd hh:mm:ss'.replace(reg, function (match, key) {
                return map[key] || 0
            }))
        }
    }

    module.exports = function (t) {
        return new DateUtil(t)
    }
})
