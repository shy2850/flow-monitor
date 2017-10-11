import { connect } from 'react-redux'
import RuntimeNet from '../../components/sys/RuntimeNet'

const mapStateToProps = (state) => state.getIn(['sys.runtime']) || {}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RuntimeNet)
