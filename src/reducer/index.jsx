import { fromJS } from '../immutable'
import DashboardReducer from './dashboard'

let initState = fromJS({
})
export default (state = initState, action) => (
    DashboardReducer(state, action) ||
    state
)
