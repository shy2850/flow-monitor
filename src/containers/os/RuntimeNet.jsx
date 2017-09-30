import { connect } from 'react-redux'
import RuntimeNet from '../../components/os/RuntimeNet'

const mapStateToProps = (state) => {
    const runtime = state.getIn(['os.runtime'])
    return runtime ? {
        net: runtime.net
    } : {}
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RuntimeNet)
