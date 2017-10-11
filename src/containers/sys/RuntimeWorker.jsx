import { connect } from 'react-redux'
import RuntimeWorker from '../../components/sys/RuntimeWorker'

const mapStateToProps = (state) => state.getIn(['sys.runtime']) || {}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RuntimeWorker)
