import React, { Component } from 'react';
import { Nav, UncontrolledDropdown, DropdownToggle, Dropdown } from 'reactstrap';
import Toggler from './Toggler';
import FaArrowDown from 'react-icons/lib/io/android-arrow-dropdown-circle';
import FaArrowUp from 'react-icons/lib/io/android-arrow-dropup-circle';
class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, opencomp: '' }
    this.items = ['structure', 'user', 'groups']
    this.list = ['Administration', 'Application', 'Union Council', 'Residence', 'Owners', 'Public']
  }

  toggle(name) {
    (this.state.opencomp !== name) ? (this.state.opencomp === '') ?
      this.setState({ open: !this.state.open, opencomp: name }) :
      this.setState({ opencomp: name }) :
      this.setState({ open: !this.state.open })
  }

  render() {
    return (
      <div className='inner'>
        <div className='logo'>
          <b className='b'>LA CADENELLE </b></div>
        <div className='navigation'>
          <Nav vertical >
            <UncontrolledDropdown nav inNavbar>
              {this.list.map((name) => {
                return (
                  <div>
                    <Dropdown nav caret onClick={() => this.toggle(name)}>
                      {name} {this.state.open && this.state.opencomp === name ?
                         <FaArrowUp className='icon' /> :
                          <FaArrowDown className='icon' />}
                    </Dropdown >
                    <Toggler open={this.state.open && this.state.opencomp === name} items={this.items}/>
                  </div>)
              })}
            </UncontrolledDropdown>
          </Nav></div>
      </div>
    )
  }
}

export default Sidenav;