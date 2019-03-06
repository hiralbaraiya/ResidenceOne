import React, { Component } from 'react';
import '../App.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true}
  }
  render() {
    return (
      <div>
        dashboard
      </div>
    )
  }
}

export default Dashboard;