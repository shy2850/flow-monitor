import { createAction } from '../redux-actions'
import { os } from './api'

const SET_CPU_INFO = 'SET_CPU_INFO'
const SET_CPU_RUNTIME = 'SET_CPU_RUNTIME'

export default (state, action) => {
    const {
        payload, type
    } = action
    switch (type) {
    case SET_CPU_INFO:
        return state.setIn(['cpuinfo'], payload)
    case SET_CPU_RUNTIME:
        return state.setIn(['cpuruntime'], payload)
    }
}

export const setCpuInfo = () => dispatch => {
    os.cpuinfo().then(info => createAction(SET_CPU_INFO)())
}

// beginCpuRuntime 全局执行一次
let cpu_runtime_running = false
export const beginCpuRuntime = () => dispatch => {
    cpu_runtime_running || os.cpuruntime().then(e => {
        createAction(SET_CPU_RUNTIME)(e.data)
    })
    cpu_runtime_running = true
}
