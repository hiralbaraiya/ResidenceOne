import React, { Component } from 'react';
import { Collapse ,Nav,NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import User from 'react-icons/lib/fa/user'

class Toggler extends Component{

    render(){
        return(
            <Collapse isOpen={this.props.open} navbar>
            <Nav navbar>
              {
                this.props.items.map((name,i)=>{
                  return(
                    <NavItem key={i}>
                   
              <Link to={`/admin/${name}`} className='link'>{name}<User/></Link>
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