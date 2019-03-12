import React, { Component } from 'react';
import '../App.css';
import Sidenav from './Sidenav';
import { Collapse, NavbarToggler, Navbar, Row, Col ,Button} from 'reactstrap';
import User from '../container/User';
import Dashboard from '../container/Dashboard'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Notfound from '../container/Notfound';
import Faellips from 'react-icons/lib/fa/ellipsis-v';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true, opendrop: false ,className:'open'}
  }

  componentWillMount() {
    if (localStorage.getItem('token') === null || undefined) {
      this.props.history.push('/')
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
                  <Navbar color="faded" light >
                    <NavbarToggler 
                    onClick={() => this.setState({open: !this.state.open },
                      ()=>{this.setState({className:this.state.open?'open':'notopen'})}
                      )} 
                    />
                    <Link className='logout' to='/' onClick={() => { localStorage.removeItem('token') }}>Logout</Link>
                  </Navbar></Col>
                </div></div>
              <div className={`tabcomp ${this.state.className}`}>
                <div className='tablemain'>
                  <div>
                    <Row>
                      <Col md={12}>
                        <h3 className='header'>user</h3>
                        <hr></hr>
                        <Faellips  onClick={()=>{console.log('hi')}}/>
                        <Row>
                          <Col md={12}>
                            <div className='dash'>
                              <Switch>
                                <Route exact path='/admin' component={Dashboard} />
                                <Route exact path='/admin/dashboard' component={Dashboard} />
                                <Route exact path='/admin/user' component={User} />
                                <Redirect to={{
                                  pathname: `${this.props.location.pathname}`,
                                  state: { error: true }
                                }
                                } />
                              </Switch>
                            </div>
                          </Col>
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