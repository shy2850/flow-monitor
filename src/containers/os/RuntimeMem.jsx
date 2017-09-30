import { connect } from 'react-redux'
import Line from '../../components/charts/Line'

const mapStateToProps = (state) => {
    const runtime = state.getIn(['os.runtime'])
    return runtime ? {
        title: '内存使用率',
        max: 100,
        unit: '%',
        series: [{
            data: runtime.mem
        }]
    } : {}
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Line)
