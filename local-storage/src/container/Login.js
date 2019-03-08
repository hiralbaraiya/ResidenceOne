import React, { Component } from 'react';
import { Input, Button, Label } from 'reactstrap';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '',error:false,validemail:true,validpass:true}
  }

  onChange(e, key) {
    let obj = {}
    obj[key] = e.target.value;
    this.setState(obj);
  }

  onClick() {
    axios.post('http://localhost:8080/api/user/login',
      {
        email: this.state.email,
        password: this.state.password,
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

  validate(e,statobj){
    this.setState({error:false});
   let exp;
    let obj;
     (e.target.placeholder==='email')?
     exp=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
     :exp=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    let result=exp.test(e.target.value);
    (result)?
    obj=true
    :
    obj=false
    let valid={};
    valid[statobj]=obj;
    this.setState(valid);
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
            <Label><b>Email</b></Label>
            <Input
              type='email'
              placeholder='email'
              onChange={(e) => this.onChange(e, 'email')}
              onBlur={(e)=>this.validate(e,'validemail')}
            />
            {
              (!this.state.validemail||this.state.error)?
              (this.state.email==='')?
              <Label className='danger'>email is required</Label>:
              <Label className='danger'>email is incorrect</Label>
              :
              <></>
            }
            <br></br>
            <Label className='required'>
              <b>Password</b>
            </Label>
            <Input
              type='password'
              placeholder='password'
              onChange={(e) => this.onChange(e, 'password')}
              onBlur={(e)=>this.validate(e,'validpass')}
            />
            {
              (!this.state.validpass||this.state.error)?
              (this.state.password==='')?
              <Label className='danger'>password is required</Label>:
              <Label className='danger'>password is incorrect</Label>
              :
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