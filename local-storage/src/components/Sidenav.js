import React, { Component } from 'react';
import { Nav, NavItem,UncontrolledDropdown,DropdownToggle} from 'reactstrap';
import Toggler from './Toggler'

class Sidenav extends Component{
    constructor(props){
        super(props);
        this.state={open:false}
        this.items=['structure','user','groups']
    }
    render(){
        return(
<div className='inner'>
<div className='logo'>
<b className='b'>LA CADENELLE </b></div>
<div className='navigation'>
<Nav vertical >
          <NavItem>
          <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret onClick={()=>{this.setState({open:!this.state.open})}}>
                  Administration
                </DropdownToggle>
                <Toggler open={this.state.open} items={this.items}></Toggler>
                <DropdownToggle nav caret>
                  Application
                </DropdownToggle>
                <Toggler open={this.state.open} items={this.items}></Toggler>
                <DropdownToggle nav caret>
                  Union Council
                </DropdownToggle>
                <DropdownToggle nav caret>
                  Residence
                </DropdownToggle>
                <DropdownToggle nav caret>
                  owners
                </DropdownToggle>
                <DropdownToggle nav caret>
                  Public
                </DropdownToggle>
              </UncontrolledDropdown>
             
          </NavItem>
        </Nav></div>
</div>
        )
    }
}

export default Sidenav;