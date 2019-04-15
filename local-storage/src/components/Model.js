import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Axios from 'axios';
import Edit from './Edit';

class Model extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirm:true,
      DOB:null,
      text:'',
      RLD:null,
      opendata: false,
      opennote: false,
      opensecure: false, value: false, openlinked: false, openpool: false
    }
    this.toggle=this.toggle.bind(this)
  }
  adduser(){
    console.log('adduser')
    let token = localStorage.getItem('token');
    Axios.post(`http://localhost:8080/api/user/signup`,
      {   
        'firstName':'hiral',
                    'lastName':'baraiya',
                    'email':'',
                    'companyName':'',
                    'residenceId':'',
                    'familyId':'',
                    'telephone':'',
                    'status':true,
                    'dateOfBirth':'',
                    'activeFrom':'',
                    'activeTo':'',
                    'password':'',
                    'manualPoolAccess':false
      }, {headers:{'token':token}})
     
      .then((response) => {
        console.log(response,'adduser')
       
      })
      .catch((e) => {
        console.log(e)
      })
  }

  toggle(data) {
    let result = {}
    result[data] = !this.state[data]
    this.setState(result)
  }

updatestate(key,value){
  console.log('updatestate',value)
let obj={}
obj[key]=value
this.setState(obj,()=>{console.log(this.state)});
}

  render() {
    return (

      <Modal style={{'minHeight':'500px'}} className='model' isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true} >

       <ModalHeader style={{'minHeight':'60px'}}toggle={this.props.toggle}>Add User</ModalHeader>
       <ModalBody>

        <Edit setdata={this.props.setdata}
        state={this.state}
        toggle={this.toggle}
        updatestate={(key,value)=>this.updatestate(key,value)}
        />
        </ModalBody>
        <ModalFooter>
          <Button style={{ 'backgroundColor': '#65cea7', 'border': '1px solid #3ec291' }}
            onClick={()=>this.adduser()}>Submit</Button>
          <Button style={{ 'backgroundColor': '#fc8675', 'border': '1px solid #fb5a43' }} onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
       
        
      </Modal>
    )
  }
}

export default Model;