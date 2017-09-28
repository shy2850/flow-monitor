import echarts from 'echarts'
import React, { Component } from 'react'
import elementResizeEvent from 'element-resize-event'

export default class ReactEcharts extends Component {
    // first add
    componentDidMount () {
        const props = this.props
        let echartObj = this.renderEchartDom()
        let onEvents = {}
        Object.keys(props).map(key => {
            let mat = key.match(/^on([A-Z]\w+)$/)
            if (mat) {
                onEvents[mat[1].toLowerCase()] = props[key]
            }
        })

        this.bindEvents(echartObj, onEvents)
        // on chart ready
        if (typeof this.props.onChartReady === 'function') this.props.onChartReady(echartObj)

        // on resize
        elementResizeEvent(this.refs.echartsDom, function () {
            echartObj.resize()
        })
    }
    // update
    componentDidUpdate () {
        this.renderEchartDom()
        this.bindEvents(this.getEchartsInstance(), this.props.onEvents || [])
    }
    // remove
    componentWillUnmount () {
        echarts.dispose(this.refs.echartsDom)
    }

    // bind the events
    bindEvents (instance, events) {
        var _loop = function _loop (eventName) {
            // ignore the event config which not satisfy
            if (typeof eventName === 'string' && typeof events[eventName] === 'function') {
                // binding event
                instance.off(eventName)
                instance.on(eventName, function (param) {
                    events[eventName](param, instance)
                })
            }
        }

        for (var eventName in events) {
            _loop(eventName)
        }
    }
    // render the dom
    renderEchartDom () {
        // init the echart object
        let echartObj = this.getEchartsInstance()
        // set the echart option
        echartObj.setOption(this.props.option, this.props.notMerge || false, this.props.lazyUpdate || false)
        // set loading mask
        if (this.props.showLoading) echartObj.showLoading()
        else echartObj.hideLoading()

        return echartObj
    }
    getEchartsInstance () {
        const { echartsDom } = this.refs
        const { theme } = this.props
        return echarts.getInstanceByDom(echartsDom) || echarts.init(echartsDom, theme || 'dark')
    }
    render () {
        let {
            style = {
                height: 300
            },
            onClick
        } = this.props
        // for render
        return (
            <div ref='echartsDom'
                className={this.props.className}
                onClick={onClick}
                style={style} />
        )
    }
}

