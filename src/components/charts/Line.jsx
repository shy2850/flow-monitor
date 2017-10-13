import React from 'react'
import ReactEcharts from 'echarts-for-react'
import moment from '../../moment'
import { alert } from '../../util/Dialog'

const TIMES = 60
export default class extends React.Component {
    getOption = () => {
        let {
            title = '',
            series = [],
            legend,
            max,
            unit = ''
        } = this.props
        const now = Date.now()
        const temp = '1'.repeat(TIMES).split('')
        const dateList = temp.map((n, i) => moment(now - i * 1000).format('HH:mm:ss')).reverse()
        legend = legend || series.map(({name}) => name)
        return {
            title: title ? {
                text: title,
                textStyle: {
                    fontSize: 12
                }
            } : undefined,
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
            legend: legend.length ? {
                right: 20,
                width: '90%',
                data: legend
            } : undefined,
            xAxis: {
                axisLine: {onZero: true},
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
    onClick = () => {
        alert('hhe').always((e) => console.log(e))
    } 
    render () {
        const { height = 300 } = this.props
        return <ReactEcharts option={this.getOption()} style={{height}} onClick={this.onClick}/>
    }
}
