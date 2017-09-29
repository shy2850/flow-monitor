import { connect } from 'react-redux'
import OSInfo from '../../components/OSInfo'

const mapStateToProps = (state) => {
    return state.getIn(['os.info']) || {}
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OSInfo)