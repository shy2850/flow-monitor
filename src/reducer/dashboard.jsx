import { createAction } from '../redux-actions'
import { os } from './api'

const SET_OS_INFO = 'SET_OS_INFO'
const SET_OS_RUNTIME = 'SET_OS_RUNTIME'

export default (state, action) => {
    const {
        payload, type
    } = action
    switch (type) {
    case SET_OS_INFO:
        return state.setIn(['os.info'], payload)
    case SET_OS_RUNTIME:
        return state.setIn(['os.runtime'], payload)
    }
}

export const setOsInfo = () => dispatch => {
    os.info().then(info => dispatch(createAction(SET_OS_INFO)(info)))
}

// beginCpuRuntime 全局执行一次
let cpu_runtime_worker
const setOsRuntime = createAction(SET_OS_RUNTIME)
export const beginOsRuntime = () => dispatch => {
    if (!cpu_runtime_worker) {
        cpu_runtime_worker = os.runtime()
        cpu_runtime_worker.onmessage = function (e) {
            dispatch(setOsRuntime(e.data))
        }
    }
}
