import React, { Component } from 'react';
import { Nav, UncontrolledDropdown, Dropdown } from 'reactstrap';
import Toggler from './Toggler';
import FaArrowDown from 'react-icons/lib/io/android-arrow-dropdown-circle';
import FaArrowUp from 'react-icons/lib/io/android-arrow-dropup-circle';

class Sidenav extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, opencomp: '' }
    this.list = [
      {name:'Administration',path:'admin',items:['Structure','Units', 'Users', 'Groups','Families','Owners','Vehicles','Documents','Events','News feed','Pool','Issue tracking','Contact','Settings']}
    , {name:'Application',path:'apps',items:['Pool','Reception','Notifications','Vehicles','Issue tracking','Contact']},
     {name:'Union Council',path:'council',items:['Members','Documents','Contacts','Discussions','News feed','Issue tracking']},
     {name:'Residence',path:'residents',items:['Dashboard','Events','Issue tracking','Bus','Documents','News feed','Contacts','Restaurant','Reservations','Services','Groups','Ideas']},
     {name:'Owners',path:'owners',items:['Dashboard','Documents','News feed','Issue tracking','Contacts']},
     {name: 'Public',path:'public',items:['Website','Blog','Documents']}]
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
              {this.list.map((key) => {
                return (
                  <div>
                    <Dropdown nav caret onClick={() => this.toggle(key.name)}>
                      {key.name} {this.state.open && this.state.opencomp === key.name ?
                         <FaArrowUp className='icon' /> :
                          <FaArrowDown className='icon' />}
                    </Dropdown >
                    <Toggler open={this.state.open && this.state.opencomp === key.name} path={key.path} items={key.items}/>
                  </div>)
              })}
            </UncontrolledDropdown>
          </Nav></div>
      </div>
    )
  }
}

export default Sidenav;