import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
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
import Admin from './components/Admin'
import { setOsInfo, beginOsRuntime } from './reducer/dashboard'

const store = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducer)

store.dispatch(setOsInfo())
store.dispatch(beginOsRuntime())

const App_404 = () => <h1 className="text-center">404 Not Found</h1>
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="root-container">
                <Top />
                <div className="body-container">
                    <Left />
                    <div className="container">
                        <Switch>
                            <Route path="/os/info" component={OSInfo}/>
                            <Route path="/os/run" exact component={Dashboard}/>
                            <Route component={App_404}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
)
