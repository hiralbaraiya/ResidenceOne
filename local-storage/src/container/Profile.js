import React,{Component} from 'react';
import Axios from 'axios';
import {Label,TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import classnames from 'classnames';
import Faellips from 'react-icons/lib/fa/ellipsis-v';
import { Dropdown } from '../components/Dropdown';

class Profile extends Component{
    constructor(props){
        super(props)
        this.state={activeTab:'1'}
    }

    componentWillMount(){
        let token = localStorage.getItem('token');
        Axios.get(`http://localhost:8080/api/user/detail/${this.props.match.params.id}`,
          { headers: { 'token': token } })
          .then((response) => {
            console.log(response.data)
            if(response.data.status){
            this.setState({ data: response.data.data})}
            else{
                this.props.history.push('/admin/users')  
            }
          })
          .catch((e) => {
            this.props.history.push('/admin/users')
          })
      
    }

    toggle = (tab) => {
        
          this.setState({ activeTab: tab})
      
      }
    render(){
        return(
            <div>
                <Label>Family Name:{this.state.data?this.state.data.family.name:'loading...'}{console.log('user',(this.state.data?this.state.data:null))}</Label>
               <br></br>
               <span className={`dot`}></span>
                <Label style={{'float':'right'}}>{this.state.data?this.state.data.positions.name:''}</Label>
                
                <br></br>
                <Label> Main unit id:{this.state.data?this.state.data.family.families_units[0].unit.officialId:'loading...'}</Label>
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
            list={['Edit profile details',
              'Mark as handicaped',
              'Mark as inactive',
              'Help']} />
          <TabPane tabId="1">
          <img src={`http://localhost:8080/images/lacadenelle13008fr/users/hi.png`} alt="user" height='316' width='260'></img>
          </TabPane>
          <TabPane tabId="2">
           
             
          </TabPane>
        </TabContent>
            </div>
        )
    }
}

export default Profile;