import React, { Component } from 'react';
import Sidenav from './Sidenav';
import { Collapse, NavbarToggler, Navbar ,Row,Col,Container,Dropdown,DropdownItem,DropdownToggle,DropdownMenu} from 'reactstrap';
import User from '../container/User';
import Toggler from '../components/Toggler'
import Dashboard from '../container/Dashboard'
import { Redirect,  Route } from 'react-router-dom'
import {Link} from 'react-router-dom';
import './Admin.css';

class Admi extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true ,opendrop:false}
  }



  render() {
    let styleobj={paddingLeft:0}
    let styleo={paddingRight:0,paddingLeft:15}
    return (
      <div >
        {(localStorage.getItem('token')===null||undefined)?<Redirect to='/'/>:
      
            <Row>
              <div className='sider'>
              <Row style={styleo}>
            <Collapse isOpen={this.state.open} navbar >
            <Col sm={2} style={styleo}>
            <Sidenav />
            </Col>
            </Collapse></Row></div>
            <Col style={styleobj}>
            <Row>
              <Col >
              <Navbar color="faded" light >
              <NavbarToggler onClick={() => this.setState({ open: !this.state.open })} className="mr-2" />
              <Link to='/' onClick={()=>{localStorage.removeItem('token')}}>Logout</Link>
            </Navbar></Col>
            </Row>
            <Row>
              <Col>
              <Route exact path='/admin/dashboard' component={Dashboard} />
            <Route exact path='/admin/user' component={User} /></Col>
            </Row>
            </Col>
          </Row>
        }
      </div>
    )
  }
}

export default Admi;