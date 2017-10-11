import { createAction } from '../redux-actions'
import { os, sys } from './api'

const SET_OS_INFO = 'SET_OS_INFO'
const SET_OS_RUNTIME = 'SET_OS_RUNTIME'
const SET_SYS_RUNTIME = 'SET_SYS_RUNTIME'

export default (state, action) => {
    const {
        payload, type
    } = action
    switch (type) {
    case SET_OS_INFO:
        return state.setIn(['os.info'], payload)
    case SET_OS_RUNTIME:
        return state.setIn(['os.runtime'], payload)
    case SET_SYS_RUNTIME:
        return state.setIn(['sys.runtime'], payload)
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

// beginCpuRuntime 全局执行一次
let sys_runtime_worker
const setSysRuntime = createAction(SET_SYS_RUNTIME)
export const beginSysRuntime = () => dispatch => {
    if (!sys_runtime_worker) {
        sys_runtime_worker = sys.runtime()
        sys_runtime_worker.onmessage = function (e) {
            dispatch(setSysRuntime(e.data))
        }
    }
}
