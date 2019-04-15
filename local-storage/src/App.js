import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import history from './History'
import Login from './container/Login';
import Home from './container/Home';
import Admin from './container/Admin';
import Notfound from './container/Notfound';
import { ToastContainer } from 'react-toastify';

class App extends Component {

  render() {
    return (
      <div>
        <ToastContainer autoClose={2000} closeButton={false} hideProgressBar={true} />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route path="/(admin|apps)" component={Admin} />
            <Route component={Notfound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
