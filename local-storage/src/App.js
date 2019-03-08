import React, { Component } from 'react';
// './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './container/Login';
import Home from './container/Home';
import Admin from './components/Admin';
import Notfound from './container/Notfound';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route static path="/admin" component={Admin} />
          <Route component={Notfound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
