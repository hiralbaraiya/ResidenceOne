import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { debounce } from 'lodash';

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = { default: [] }
    this.Debounce = debounce((e, callback) => optionfilter(e, callback), 800);
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    axios.get(`http://localhost:8080/api/position/list`,
      { headers: { 'token': token } })
      .then((res) => {
       let response=[]
       res.data.data.map((key)=>{
         let obj={
          value: key.name,
          label: key.shortName
         }
         response.push(obj);
       })
       this.setState({default:response})
      })
      .catch((e) => {
        console.log(e)
      })
  }

  optionfilter(e) {
    const result = this.state.default.filter(i =>
      i.label.toLowerCase().includes(e.toLowerCase())
    );
    return result;
  }

 

render(){
  return(
    <div className='row form-group'>
    <Label>Position</Label>
    <AsyncSelect className='col-sm-8'
      isClearable
      loadOptions={Debounce}
      defaultOptions={this.state.default}
    />
  </div>
  )
}
    
}

  export default Select;