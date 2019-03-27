import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input, Dropdown, Collapse, Label } from 'reactstrap';
import Inputfield from './Inputfield';
import Select from './Select';
import ToggleButton from 'react-toggle-button';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import moment from 'moment';


class Model extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirm:true,
      DOB:null,
      RLD:null,
      opendata: false,
      opennote: false,
      opensecure: false, value: false, openlinked: false, openpool: false
    }
  }
  adduser(){
    console.log('adduser')
    let token = localStorage.getItem('token');
    Axios.post(`http://localhost:8080/api/user//updateisHandicapped/${1}`,
      {'userId':'c9316676-1f70-419c-b43e-50500429edb6'}, {headers:{'token':token}})
     
      .then((response) => {
        console.log(response)
       
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

  render() {
    return (

      <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true} size='lg' >

        <ModalHeader toggle={this.props.toggle}>Add User</ModalHeader>
        <ModalBody>

          <Inputfield type='text' placeholder='First Name' exp={/^(?=.*[\w\d]).+$/}
            onChange={(e, id) => { this.props.setdata(e, id) }}
          />
          <br></br>
          <Inputfield type='text' placeholder='Last Name' exp={/^(?=.*[\w\d]).+$/}
            onChange={(e, id) => { this.props.setdata(e, id) }}
          />
          <Dropdown caret onClick={() => this.toggle('opendata')}>
            Personal data
                    </Dropdown >
          <Collapse isOpen={this.state.opendata}>
            <Inputfield type='number' placeholder='Mobile number'
              exp={/^$|^[6-9]\d{9}$/}
              onChange={(e, id) => { this.props.setdata(e, id) }}
            />
            <br></br>
            <Inputfield type='email' placeholder='Email address'
              onChange={(e, id) => { this.props.setdata(e, id) }}
              exp={/^$|^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/}
            />
            <br></br>
            <Inputfield type='text' placeholder='Company name'
              onChange={(e, id) => { this.props.setdata(e, id) }}
            
            />
            <br></br>
            <Label><b>Select date of birth</b></Label>
            <br></br>
            <DateRangePicker
            singleDatePicker
            drops='up'
            selectedDate={this.state.DOB}
            onApply={(e,p)=>{this.setState({DOB:moment(p.startDate).format('L')})}}
            >
<Input value={this.state.DOB} name='DOB'/>
</DateRangePicker>
          </Collapse>
          <Dropdown caret onClick={() => this.toggle('opensecure')}>
            Security
                    </Dropdown >
          <Collapse isOpen={this.state.opensecure}>
            <Inputfield type='password' placeholder='Password'
              onChange={(e, id) => { this.setState({Password:e},()=>this.props.setdata(e, id) )}}
              exp={/^$|^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/}
            /><br></br>
            <Label><b>Confirm password</b></Label>
            <Input type='password'
            placeholder='Confirm password'
            onChange={(e)=>
              {console.log(e.target.value)
                if(e.target.value===this.state.Password){this.setState({confirm:true})}
               else{this.setState({confirm:false})}
              }}/>
              {
              (!this.state.confirm)?
              <Label className='danger'>Confirmpassword does not match</Label>:
              <></>
            }
            <br></br>
          </Collapse>
          <Dropdown caret onClick={() => this.toggle('openlinked')}>
            Residence linked data
                    </Dropdown >
                    
          <Collapse isOpen={this.state.openlinked}>
            {/* <Inputfield type='date' placeholder='Active date range'
              onChange={(e, id) => { this.props.setdata(e, id) }}
            /> */}
            <Label><b>Interval of activity dates</b></Label><br></br>
            <DateRangePicker
            drops='up'
            selectedDate={this.state.RLD}
            onApply={(e,p)=>{this.setState({RLD:`${moment(p.startDate).format('L')}-${moment(p.endDate).format('L')}`})}}
            >
<Input value={this.state.DOB} name='DOB'/>
</DateRangePicker>
            <br></br>
            <Select />
            <br></br>
          </Collapse>
          <Dropdown caret onClick={() => this.toggle('openpool')}>
            Pool
                    </Dropdown >
          <Collapse isOpen={this.state.openpool}>
            <Label><b>Manual pool access</b></Label>
            <ToggleButton

              inactiveLabel={'X '}
              activeLabel={'C'}

              value={this.state.value}
              onToggle={(value) => {
                this.setState({
                  value: !value,
                })
              }}

            />

          </Collapse>
          <Dropdown caret onClick={() => this.toggle('opennote')}>
            Note
                    </Dropdown >
          <Collapse isOpen={this.state.opennote}>
            <Inputfield type='text'
              placeholder='Note'
              onChange={(e, id) => { this.props.setdata(e, id) }}
            ></Inputfield>
          </Collapse>

        </ModalBody>
        <ModalFooter>
          <Button style={{ 'backgroundColor': '#65cea7', 'border': '1px solid #3ec291' }}
            onClick={()=>this.adduser()}>Submit</Button>{' '}
          <Button style={{ 'backgroundColor': '#fc8675', 'border': '1px solid #fb5a43' }} onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default Model;