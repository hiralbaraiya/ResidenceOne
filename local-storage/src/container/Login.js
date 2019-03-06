import React, { Component } from 'react';
import { Input, Button, Label } from 'reactstrap';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' }
  }

  onChange(e, key) {
    let obj = {}
    obj[key] = e.target.value;
    this.setState(obj);
  }

  onClick() {
    axios.post('http://localhost:3000/api/user/login',
      {
        email: this.state.email,
        password: this.state.password,
        validemail:true,
        validpassword:true
      })
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.data.token)
        this.props.history.push('/admin/dashboard')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  validate(e){
   /* let exp;
    let obj;
     (e.target.placeholder==='email')?
     exp=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
     :exp=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let result=exp.test(e.target.value);
    (result)?
    obj=true
    :
    obj=false*/
    console.log('abc')
    
  }

  render() {
    return (
      <div className='login-main'>
        <h1>La Cadenelle</h1>
        <div className='login-box'>
          <p className='login-text'>login</p>
          <hr></hr>
          <div className='box'>
            <Label><b>Email</b></Label>
            <Input
              type='text'
              placeholder='email'
              onChange={(e) => this.onChange(e, 'email')}
              onBlur={(e)=>this.validate(e)}
            />
            {
              (this.state.validemail)?
              <Label>email is required</Label>
              :
              <></>
            }
            <br></br>
            <Label className='required'>
              <b>Password</b>
            </Label>
            <Input
              type='text'
              placeholder='password'
              onChange={(e) => this.onChange(e, 'password')}
              onBlur={(e)=>this.validate(e)}
            />
            {
              (this.state.validpassword)?
              <Label className='required'>password is required</Label>
              :
              <></>
            }
            <hr></hr>
            <Button
              onClick={(e) => this.onClick()}
              className='button'
              color='success'>LogIn
        </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;