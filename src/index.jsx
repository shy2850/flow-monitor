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
import Top from './components/Top'
import Dashboard from './components/Dashboard'
import Admin from './components/Admin'

const store = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducer)

const App_404 = () => <h1 className="text-center">404</h1>
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Top />
                <div className="container">
                    <Switch>
                        <Route path="/admin" component={Admin}/>
                        <Route path="/" component={Dashboard}/>
                        <Route component={App_404}/>
                    </Switch>
                </div>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
)
