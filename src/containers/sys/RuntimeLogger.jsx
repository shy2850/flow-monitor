import { connect } from 'react-redux'
import RuntimeLogger from '../../components/sys/RuntimeLogger'

const mapStateToProps = (state) => state.getIn(['sys.runtime']) || {}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RuntimeLogger)
