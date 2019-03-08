import React, { Component } from 'react';
import '../App.css';
import Sidenav from './Sidenav';
import { Collapse, NavbarToggler, Navbar, Row, Col, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import User from '../container/User';
import Toggler from '../components/Toggler'
import Dashboard from '../container/Dashboard'
import { Switch, Route,Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Notfound from '../container/Notfound';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, opendrop: false }
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null || undefined) {
      this.props.history.push('/')
    }
    else { 
      if (this.props.location.pathname ==='/admin/'||this.props.location.pathname ==='/admin') {
      this.props.history.push('/admin/dashboard')
      }
    }
  }

  render() {
    return (
      <div >
       {this.props.location.state?<div><Notfound/></div>:
        <div className='admin'>
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
                  <Link className='logout' to='/' onClick={() => { localStorage.removeItem('token') }}>Logout</Link>
                </Navbar></div>
            </div>
            <div className='component'>
            <Switch>
              <Route exact path='/admin' component={Dashboard}/>
              <Route exact path='/admin/dashboard' component={Dashboard} />
              <Route exact path='/admin/user' component={User} />
              <Redirect to={{
                pathname:`${this.props.location.pathname}` ,
                state:{error:true}}
             
            }/>
              </Switch>
            </div>
          </div>
        </div>
       }
      </div>
    )
  }
}

export default Admin;