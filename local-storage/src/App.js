import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Router,Route,Switch} from 'react-router-dom'
import history from './History'
import Login from './container/Login';
import Home from './container/Home';
import Admin from './container/Admin';
import Notfound from './container/Notfound';

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route  path="/(admin|apps)" component={Admin} />
          <Route component={Notfound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
