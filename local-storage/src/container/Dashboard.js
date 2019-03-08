import React, { Component } from 'react';
import './Dashboard.css';
import { Nav, NavItem, UncontrolledDropdown, DropdownToggle } from 'reactstrap';
import Toggler from '../components/Toggler'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true }
  }
  render() {
    return (
      <div >
        <div>
          <div className='main'>
            <div>
              <div className='sidebar'>
                <div className='inner'>
                </div>
              </div>
            </div>
            <div>
              <div className='topbar'>
              </div>
              <button className='buttonl'>logo</button>
              <button className='buttonr'>logo</button>
            </div>
           
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;