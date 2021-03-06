import React, { Component } from 'react';
import Axios from 'axios';
import { Label, TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap'
import classnames from 'classnames';
import Faellips from 'react-icons/lib/fa/ellipsis-v';
import { Dropdown } from '../components/Dropdown';
import Edit from '../components/Edit';
import {getUserList} from '../Api/ResidenceApi';
import { updateUser } from '../Api/ResidenceApi';

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
      opensecure: false, manualPoolAccess: false, openlinked: false, openpool: false
    }
    this.updatestate = this.updatestate.bind(this)
    this.Toggle = this.Toggle.bind(this)
  }

edituser=()=>{
  let token=localStorage.getItem('token')
  Axios.post(`http://localhost:8080/api/user/editProfile`,
      {   
        'firstName':this.state['First Name'],
        'lastName':this.state['Last Name'],
        'email':this.state['Email address'],
        'companyName':this.state['Company name'],
       'residenceId':this.state.residenceId,
        'familyId':this.state.familyId,
        'telephone':this.state['Mobile number'],
        'status':this.state.status,
        dateOfBirth:'',
        'oldPassword':'',
        'newPassword':'',
        activeFrom:'',
        activeTo:'',
        'confirmPassword':'',
        'manualPoolAccess':this.state.manualPoolAccess
      }, {headers:{'token':token}})
      .then((response) => {
        console.log(response,'adduser')
       
      })
      .catch((e) => {
        console.log(e)
      })
}

  componentWillMount() {
   
      getUserList(`detail/${this.props.match.params.id}`)
      .then((result) => {
        console.log('props:',this.props.match,'result',result)
        if (result.response.data.status) {
          let obj={...result.response.data.data}
          this.setState({
            data:obj,
            'First Name':obj.firstName,
        'Last Name':obj.lastName,
        'picture':obj.picture,
        'Email adress':obj.email,
        'Company name':obj.companyName,
        residenceId:obj.residenceId,
        familyId:obj.familyId,
        'Mobile number':obj.telephone,
        status:obj.status,
        dateOfBirth:obj.dateOfBirth,
        personstatus:obj.personStatus,
        activeFrom:obj.activeFrom,
        activeTo:obj.activeTo,
        manualPoolAccess:obj.manualPoolAccess
        })
        }
        else {
          this.props.history.push('/admin/users')
        }
      })
  }

  edit(id, status) {
    console.log(status)
    if (window.confirm("Are you sure you want to change user status from active to inactive?")) {
      getUserList(`updateStatus/${id}/${status === '1' ? 0 : 1}`)
        .then((result) => {
          (!result.error) ?
            this.getdata() :
            this.setState({ apierror: true })
        })
    }
  }


  markhandicap(id, status) {
    if (window.confirm("Are you sure you want to change handicapped status forMARTIN ?")) {
      updateUser(`updateisHandicapped/${status === 1 ? 0 : 1}`, { 'userId': id })
        .then((response) => {
          let obj={...this.state.data};
          obj.isHandicapped=status === 1 ? 0 : 1
          this.setState( obj )
        })
    }
  }

  Toggle(data) {
    let result = {}
    result[data] = !this.state[data]
    this.setState(result)
  }

  updatestate(key, value) {
    console.log('updatestate', value)
    let obj = {}
    obj[value] = key
    this.setState(obj, () => { console.log(this.state) });
  }

  toggle = (tab) => {

    this.setState({ activeTab: tab })

  }
  render() {
    let { positions, family ,isHandicapped,status} = this.state.data?this.state.data:{positions:undefined,family:undefined,isHandicapped:undefined,status:undefined}
    let name=positions?positions.name:null
    let fname=family?family.name:''
    let id=family?family.families_units[0].unit.officialId:''
    return (
      <div>
       {fname?<Label>Family Name:{fname}</Label>:<Label></Label>}
        <br></br>
        {this.state.status==='1'?<span className={`dot`}></span>:<span className={`dotred`}></span>}
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
              <Button color='link' onClick={() => this.markhandicap(this.state.data.id, isHandicapped)}>{isHandicapped === 1 ? <p>Mark as Not Handicapped</p> : <p>mark as Handicapped</p>}</Button>,
              <Button color='link' onClick={() => this.edit(this.state.data.id, status)}>{status === '1' ? <p>Mark as Inactive</p> : <p>mark as Active</p>}</Button>
               ,
              ]} />
          <TabPane tabId="1">
            {this.state.edit ?
              <>  <Edit
                setdata={this.updatestate}
                state={this.state}
                toggle={this.Toggle}
                updatestate={this.updatestate}
              />
                <Button style={{ 'backgroundColor': '#65cea7', 'border': '1px solid #3ec291', 'float': 'right' }}
                  onClick={() => this.edituser()}>Submit</Button>
                <Button style={{ 'backgroundColor': '#fc8675', 'border': '1px solid #fb5a43', 'float': 'right' }}
                  onClick={() => { this.setState({ edit: false }) }}>Cancel</Button>
              </> :
              <img src={this.state.picture} alt="user" height='316' width='260'></img>
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