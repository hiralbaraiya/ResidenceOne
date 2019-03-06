import React, { Component } from 'react';
import '../App.css';
import Sidenav from './Sidenav';
import { Collapse, NavbarToggler, Navbar ,Dropdown,DropdownItem,DropdownToggle,DropdownMenu} from 'reactstrap';
import User from '../container/User';
import Toggler from '../components/Toggler'
import Dashboard from '../container/Dashboard'
import { Redirect,  Route } from 'react-router-dom'
import {Link} from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true ,opendrop:false}
  }



  render() {
    return (
      <div >
      {(localStorage.getItem('token')===null||undefined)?<Redirect to='/'/>:
      <div className='admin'>
        {this.props.location.pathname === '/admin' ? <Redirect to='/admin/dashboard' /> : <></>}
        <div className='side'>
          <Collapse isOpen={this.state.open} navbar >
            <Sidenav />
          </Collapse>
        </div>
        <div className='content'>
         <div className="dash">
         <div className='top'>
            <Navbar color="faded" light >
              <NavbarToggler onClick={() => this.setState({ open: !this.state.open })} className="mr-2" />
              <Link to='/' onClick={()=>{localStorage.removeItem('token')}}>Logout</Link>
            </Navbar></div>
          </div>
          <div className='component'>
            <Route exact path='/admin/dashboard' component={Dashboard} />
            <Route exact path='/admin/user' component={User} />
          </div>
        </div>
        </div>
        }
      </div>
    )
  }
}

export default Admin;