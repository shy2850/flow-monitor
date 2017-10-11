import { connect } from 'react-redux'
import Line from '../../components/charts/Line'

const mapStateToProps = (state) => {
    const runtime = state.getIn(['os.runtime'])
    return runtime ? {
        title: 'CPU使用率',
        unit: '%',
        max: 100,
        series: runtime.cpu.map((data, index) => ({
            name: `cpu${(101 + index).toString().slice(-2)}`,
            data
        }))
    } : {}
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Line)
