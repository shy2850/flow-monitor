import React from 'react'
import ReactEcharts from 'echarts-for-react'

export default class extends React.Component {
    getOption = () => {
        let {
            title = '',
            data = [],
            legend
        } = this.props

        legend = legend || data.map(({name}) => name)
        return {
            title: title ? {
                x: 'left',
                text: title,
                textStyle: {
                    fontSize: 12
                }
            } : undefined,
            legend: legend.length ? {
                orient: 'vertical',
                left: 'right',
                data: legend
            } : undefined,
            series: {
                type: 'pie',
                data
            }
        }
    }
    render () {
        const { height = 300 } = this.props
        return <ReactEcharts option={this.getOption()} style={{height}} />
    }
}
