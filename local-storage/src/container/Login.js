import React, { Component } from 'react';
import { Input, Button, Label } from 'reactstrap';
import axios from 'axios';
import './Login.css';
import Inputfield from '../components/Inputfield';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { Email: '', Password: '',error:false}
  }

  onChange(e, key) {
    let obj = {}
    obj[key] = e;
    this.setState(obj);
  }

  onClick() {
    axios.post('http://localhost:8080/api/user/login',
      {
        email: this.state.Email,
        password: this.state.Password,
        validemail:this.state.validemail,
        validpassword:this.state.validpass
      })
      .then((response) => {
        console.log(response)
        if(response.data.status===false){
          this.setState({error:true})
        }
        else{
        localStorage.setItem('token', response.data.token)
        this.props.history.push('/admin/dashboard')
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  componentWillMount(){
    if(localStorage.getItem('token')){
    this.props.history.push('/admin/dashboard')
    }
  }

  render() {
    return (
      <div className='login-main'>
        <h1>La Cadenelle</h1>
        <div className='login-box'>
          <p className='login-text'>login</p>
          <hr></hr>
          <div className='box'>
          <Inputfield
          type='email'
          placeholder='Email'
          exp={/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/}
          onChange={(e,id)=>{this.onChange(e,id)}}
          error={(this.state.error&&this.state.Email==='')?true:false}
          />
            {
              (this.state.error&&this.state.Email==='')?
              <Label className='danger'>email is required</Label>:
              <></>
            }
            <br></br>
            <Inputfield
          type='password'
          placeholder='Password'
          exp={/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/}
          onChange={(e,id)=>{this.onChange(e,id)}}
          error={(this.state.error&&this.state.Password==='')?true:false}
          />
            {
              (this.state.error&&this.state.Password==='')?
              <Label className='danger'>password is required</Label>:
             <></>
            }
            <br></br>
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