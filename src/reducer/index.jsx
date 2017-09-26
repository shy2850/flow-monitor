import { fromJS } from '../immutable'
import { os } from './api'

let initState = fromJS({

})
export default (state = initState, action) => (
    state
)

os.cpuinfo().then(data => {
    // console.log(data)
})
os.cpuruntime().onmessage = function ({data}) {
    // console.log(data)
}
