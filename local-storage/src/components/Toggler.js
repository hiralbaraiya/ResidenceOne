import React, { Component } from 'react';
import { Collapse ,Nav,NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

class Toggler extends Component{
    render(){
        return(
            <Collapse isOpen={this.props.open} navbar>
            <Nav navbar>
              {
                this.props.items.map((name)=>{
                  return(
                    <NavItem>
              <Link to={`/admin/${name}`} className='link'>{name}</Link>
              </NavItem>
                  )
                })
              }
            </Nav>
          </Collapse>
        )
    }
}

export default Toggler;