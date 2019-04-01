import {  Input, Dropdown, Collapse, Label } from 'reactstrap';
import React, { Component } from 'react';
import Inputfield from './Inputfield';
import Select from './Select';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import moment from 'moment';
import ToggleButton from 'react-toggle-button';

class Edit extends Component{

    constructor(props) {
        super(props)
        this.state = {
          confirm:true,
          DOB:null,
          RLD:null,
          value: false
        }
      }


   render(){
       return(
           <div style={{'overflow':'scroll','height':'350px'}}>
               <Inputfield type='text' placeholder='First Name' exp={/^(?=.*[\w\d]).+$/}
            onChange={(e, id) => { this.props.setdata(e, id) }}
          />
          <br></br>
          <Inputfield type='text' placeholder='Last Name' exp={/^(?=.*[\w\d]).+$/}
            onChange={(e, id) => { this.props.setdata(e, id) }}
          />
          <Dropdown caret onClick={() => this.props.toggle('opendata')}>
            Personal data
                    </Dropdown >
          <Collapse isOpen={this.props.state.opendata}>
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
              selectedDate={this.props.state.DOB}
              onApply={(e, p) => { this.props.updateState( 'DOB', moment(p.startDate).format('L') ) }}
            >
              <Input value={this.props.state.DOB} name='DOB' />
            </DateRangePicker>
          </Collapse>
          <Dropdown caret onClick={() => this.props.toggle('opensecure')}>
            Security
                    </Dropdown >
          <Collapse isOpen={this.props.state.opensecure}>
            <Inputfield type='password' placeholder='Password'
              onChange={(e, id) => { this.props.updatestate( 'Password', e , () => this.props.setdata(e, id)) }}
              exp={/^$|^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/}
            /><br></br>
            <Label><b>Confirm password</b></Label>
            <Input type='password'
              placeholder='Confirm password'
              onChange={(e) => {
                console.log(e.target.value)
                if (e.target.value === this.props.state.Password) { this.props.updatestate('confirm', true ) }
                else { this.props.updatestate('confirm', false ) }
              }} />
            {
              (!this.props.state.confirm) ?
                <Label className='danger'>Confirmpassword does not match</Label> :
                <></>
            }
            <br></br>
          </Collapse>
          <Dropdown caret onClick={() => this.props.toggle('openlinked')}>
            Residence linked data
                    </Dropdown >

          <Collapse isOpen={this.props.state.openlinked}>
            <Label><b>Interval of activity dates</b></Label><br></br>
            <DateRangePicker
              drops='up'
              selectedDate={this.props.state.RLD}
              onApply={(e, p) => { this.props.updatestate( 'RLD',`${moment(p.startDate).format('L')}-${moment(p.endDate).format('L')}` ) }}
            >
              <Input value={this.props.state.RLD} name='DOB' />
            </DateRangePicker>
            <br></br>
            <Select />
            <br></br>
          </Collapse>
          <Dropdown caret onClick={() => this.props.toggle('openpool')}>
            Pool
                    </Dropdown >
          <Collapse isOpen={this.props.state.openpool}>
            <Label><b>Manual pool access</b></Label>
            <ToggleButton

              inactiveLabel={'X '}
              activeLabel={'C'}

              value={this.props.state.value}
              onToggle={(value) => {
                this.props.updatestate(
                  'value', !value
                )
              }}
            />

          </Collapse>
          <Dropdown caret onClick={() => this.props.toggle('opennote')}>
            Note
                    </Dropdown >
          <Collapse isOpen={this.props.state.opennote}>
            <Inputfield type='text'
              placeholder='Note'
              onChange={(e, id) => { this.props.setdata(e, id) }}
            ></Inputfield>
          </Collapse>
           </div>
       )
   }
}

export default Edit;
