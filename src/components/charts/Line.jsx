import React from 'react'
import ReactEcharts from 'echarts-for-react'
import moment from '../../moment'

const TIMES = 60
export default class extends React.Component {
    getOption = () => {
        const {
            title = '',
            series = [],
            max = 100,
            unit = ''
        } = this.props
        const now = Date.now()
        const temp = '1'.repeat(TIMES).split('')
        const dateList = temp.map((n, i) => moment(now - i * 1000).format('HH:mm:ss')).reverse()
        const legend = series.map(({name}) => name)
        return {
            title: {
                text: title
            },
            tooltip: {
                trigger: 'axis'
            },
            // toolbox: {
            //     show: true,
            //     feature: {
            //         magicType: {show: true, type: ['stack', 'tiled']},
            //         saveAsImage: {show: true}
            //     }
            // },
            legend: {
                data: legend
            },
            xAxis: {
                data: dateList
            },
            yAxis: {
                max,
                splitLine: {show: false},
                axisLabel: {formatter: `{value}${unit}`}
            },
            series: series.map(line => {
                return {
                    name: line.name,
                    type: 'line',
                    showSymbol: false,
                    data: temp.map((n, i) => line.data[i]).reverse()
                }
            })
        }
    }
    render () {
        return <ReactEcharts option={this.getOption()} />
    }
} 