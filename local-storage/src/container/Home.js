import React, { Component } from 'react';
import { Navbar, Button, NavbarBrand, Badge, Nav } from 'reactstrap';

class Home extends Component {

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <h1><Badge color="secondary">Home</Badge></h1>
          </NavbarBrand>
          <Nav className="ml-auto">{(localStorage.getItem('token') === 'undefined' || !(localStorage.getItem('token'))) ?
            <Button className='button' color='link' onClick={() => { this.props.history.push('/login') }}>Login</Button>
            : <Button className='button' color='link' onClick={() => { localStorage.removeItem('token'); }}>Logout</Button>
          }
          </Nav>
        </Navbar>
        
      </div>
    )
  }
}

export default Home