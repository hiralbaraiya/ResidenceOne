import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { Label, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { debounce } from 'lodash';

class Select extends Component {
  constructor(props) {
    super(props)
    this.state = { default: [] }
    this.getOptions = debounce(this.getTypeOptions.bind(this), 800);
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

       this.setState({default:response},()=>{console.log(this.state)})

      })
      .catch((e) => {
        console.log(e)
      })
  }


   getTypeOptions(e, callback) {
        let response = [];
        this.state.default.map(() => {
          return response;
        });
        callback(this.optionfilter(e));
      
  }

 optionfilter(e) {
    const result = this.state.default.filter(i =>
      i.label.toLowerCase().includes(e.toLowerCase())
    );
    return result;
  }


 

render(){
  return(
    <div>
    <Label><b>Position</b></Label>
    <AsyncSelect
      isClearable
      loadOptions={this.getOptions}
      defaultOptions={this.state.default}
    />
  </div>
  )
}
    
}

  export default Select;