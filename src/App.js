import React, { Component } from 'react';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Login from './component/login'
import { Provider } from 'react-redux'
import appStore from './store/store'
import landingPage from './component/landingPage'

class App extends Component {
  render() {
    return (
      <Provider store={appStore()}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/landingPage" component={landingPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
