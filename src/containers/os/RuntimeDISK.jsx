import { connect } from 'react-redux'
import Line from '../../components/charts/Line'

const mapStateToProps = (state) => {
    const runtime = state.getIn(['os.runtime'])
    return runtime ? {
        title: '硬盘使用率',
        unit: '%',
        series: runtime.disk
    } : {}
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Line)