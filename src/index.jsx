import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider, connect} from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import reducer from './reducer/index'
import { Top, Left } from './components/Nav'
import Dashboard from './components/Dashboard'
import OSInfo from './containers/os/OSInfo'
import SysRuntimeNet from './containers/sys/RuntimeNet'
import RuntimeWorker from './containers/sys/RuntimeWorker'
import RuntimeLogger from './containers/sys/RuntimeLogger'
import Admin from './components/Admin'
import { setOsInfo, beginOsRuntime, beginSysRuntime } from './reducer/dashboard'

const store = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducer)

store.dispatch(setOsInfo())
store.dispatch(beginOsRuntime())
store.dispatch(beginSysRuntime())

const App_404 = () => <h1 className="text-center">404 Not Found</h1>
const TopInfo = connect(state => ({runtime: state.getIn(['os.runtime'])}))(Top)
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="root-container">
                <TopInfo />
                <div className="body-container">
                    <Left />
                    <div className="container">
                        <Switch>
                            <Route path="/sys/run/logger" exact component={RuntimeLogger}/>
                            <Route path="/sys/run/worker" exact component={RuntimeWorker}/>
                            <Route path="/sys/run" exact component={SysRuntimeNet}/>
                            <Route path="/os/info" exact component={OSInfo}/>
                            <Route path="/os/run" exact component={Dashboard}/>
                            <Route path="/" exact component={Dashboard}/>
                            <Route component={App_404}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
)
