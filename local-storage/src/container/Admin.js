import React, { Component } from 'react';
import '../App.css';
import './Admin.css';
import Sidenav from '../components/Sidenav';
import { Collapse, NavbarToggler, Navbar, Row, Col } from 'reactstrap';
import User from './User';
import Dashboard from './Dashboard'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Notfound from './Notfound';
import Profile from './Profile';
import Reception from './Reception';
import Vehicle from './Vehicle';
import Units from './Units';
import Family from './Family';
import Owner from './Owner';
import FamilyProfile from "./FamilyProfile";
import {Dropdown} from '../components/Dropdown'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, opendrop: false ,className:'open'}
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null || undefined) {
      this.props.history.push('/login')
    }
    else {
      if (this.props.location.pathname === '/admin/' || this.props.location.pathname === '/admin') {
        this.props.history.push('/admin/dashboard')
      }
    }
  }

  render() {
    return (
      <div >
        {this.props.location.state ? <div><Notfound /></div> :
          <div>
            <div className='main'>
              <div>
                  <Collapse isOpen={this.state.open} navbar >
                  <div className='sidenav'>
                    <Sidenav /></div>
                  </Collapse>
                <div className={`topbar ${this.state.className}`}>
                <Col md={12}>
                  <Navbar id='navbar' color="faded" light >
                    <NavbarToggler 
                    onClick={() => this.setState({open: !this.state.open },
                      ()=>{this.setState({className:this.state.open?'open':'notopen'})}
                      )} 
                    />
                    <Dropdown icon={<img className='image' src={`http://localhost:8080/images/lacadenelle13008fr/users/hi.png`} alt="user"></img>}
                    list={[ <Link  to='/' onClick={() => { localStorage.removeItem('token') }}>Logout</Link>]}
                    ></Dropdown>
                  </Navbar></Col>
                </div></div>
              <div className={`tabcomp ${this.state.className}`}>
                <div className='tablemain'>
                  <div>
                    <Row>
                      <Col md={12}>
                       
                          <Row>
                          <Col md={12}>
                            <div className='dash'>
                              <Switch>
                                <Route exact path='/admin' component={Dashboard} />
                                <Route exact path='/admin/dashboard' component={Dashboard} />
                                <Route exact path='/admin/users' component={User} />
                                <Route exact path='/admin/users/:id' component={Profile}/>
                                <Route exact path='/admin/Families' component={Family}/>
                                <Route exact path='/admin/Family/:id' component={FamilyProfile}/>
                                <Route exact path='/admin/Units' component={Units}/>
                                <Route exact path='/admin/Owners' component={Owner}/>
                                <Route exact path='/admin/Vehicles' component={Vehicle}/>
                               <Route exact path='/apps/Reception' component={Reception}/>
                                <Redirect to={{
                                  pathname: `${this.props.location.pathname}`,
                                  state: { error: true }
                                }
                                } />
                              </Switch>
                            </div>
                          </Col>
                        </Row>
                        <Row style={{textAlign:'center',fontSize:'12px'}}>
                        <div style={{width:'100%',margin:'auto',fontWeight:700,verticalAlign:'center'}}>
                          <img src='http://localhost:8080/images/lacadenelle13008fr/users/residenceone_official_logo.png' alt='residence one' 
                          style={{maxWidth:'100px'}}></img>
                          <strong>&copy; 2019</strong></div>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Admin;