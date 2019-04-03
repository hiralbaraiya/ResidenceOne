import React, { Component } from 'react';
import Axios from 'axios';
import { Label, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap'
import classnames from 'classnames';
import Faellips from 'react-icons/lib/fa/ellipsis-v';
import { Dropdown } from '../components/Dropdown';
import Edit from '../components/Edit';
import {getUserList} from '../Api/ResidenceApi'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1', edit: false,
      confirm: true,
      DOB: null,
      RLD: null,
      opendata: false,
      opennote: false,
      opensecure: false, value: false, openlinked: false, openpool: false
    }
    this.updatestate = this.updatestate.bind(this)
    this.Toggle = this.Toggle.bind(this)
  }

  componentWillMount() {
   
      getUserList(`detail/${this.props.match.params.id}`)
      .then((result) => {
        if (result.response.data.status) {
          this.setState({ data: result.response.data.data })
        }
        else {
          this.props.history.push('/admin/users')
        }
      })
  }

  Toggle(data) {
    let result = {}
    result[data] = !this.state[data]
    this.setState(result)
  }

  updatestate(key, value) {
    console.log('updatestate', value)
    let obj = {}
    obj[key] = value
    this.setState(obj, () => { console.log(this.state) });
  }

  toggle = (tab) => {

    this.setState({ activeTab: tab })

  }
  render() {
    let { positions, family } = this.state.data?this.state.data:{positions:undefined,family:undefined}
    let name=positions?positions.name:null
    let fname=family?family.name:''
    let id=family?family.families_units[0].unit.officialId:''
    return (
      <div>
       {fname?<Label>Family Name:{fname}</Label>:<Label></Label>}
        <br></br>
        <span className={`dot`}></span>
        <Label style={{ 'float': 'right' }}>{name}</Label>

        <br></br>
       {id?<Label> Main unit id:{id}</Label>:<Label/>} 
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Profile
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Notifications
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>

          <Dropdown className='drop'
            style={{ margin: 0 }}
            icon={<Faellips />}
            list={[<Button color='link' onClick={() => { this.setState({ edit: !this.state.edit }) }}>
              {this.state.edit ? <>view profile</> : <>edit profile</>}
            </Button>,
              'Mark as handicaped',
              'Mark as inactive',
              'Help']} />
          <TabPane tabId="1">
            {this.state.edit ?
              <>  <Edit
                setdata={this.updatestate}
                state={this.state}
                toggle={this.Toggle}
                updatestate={this.updatestate}
              />
                <Button style={{ 'backgroundColor': '#65cea7', 'border': '1px solid #3ec291', 'float': 'right' }}
                  onClick={() => this.adduser()}>Submit</Button>
                <Button style={{ 'backgroundColor': '#fc8675', 'border': '1px solid #fb5a43', 'float': 'right' }}
                  onClick={() => { this.setState({ edit: false }) }}>Cancel</Button>
              </> :
              <img src={`http://localhost:8080/images/lacadenelle13008fr/users/hi.png`} alt="user" height='316' width='260'></img>
            }
          </TabPane>
          <TabPane tabId="2">


          </TabPane>
        </TabContent>
      </div>
    )
  }
}

export default Profile;