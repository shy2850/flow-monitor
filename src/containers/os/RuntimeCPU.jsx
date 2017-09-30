import { connect } from 'react-redux'
import Line from '../../components/charts/Line'

const mapStateToProps = (state) => {
    const runtime = state.getIn(['os.runtime'])
    return runtime ? {
        title: 'CPU使用率',
        unit: '%',
        max: 100,
        series: runtime.cpu.map((data, index) => ({
            name: `cpu${index + 1}`,
            data
        }))
    } : {}
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Line)
