import React from 'react';
import AsyncSelect from 'react-select/lib/Async';
import { Label,FormFeedback } from 'reactstrap';
import axios from 'axios';
import { debounce } from 'lodash';
export const Select = (props) => {


  
  function getTypeOptions(e, callback) {
    let token = localStorage.getItem('token');
    axios.get('http://localhost:8080/api/position/list', { headers: { 'token': token } })
      .then(res => {
        let response = [];
        res.data.data.map((key) => {
          let obj = {
            value: key.name,
            label: key.shortName
          }
          response.push(obj);
          return response;
        });
        callback(optionfilter(e, response));
      }
      );
  }

  function optionfilter(e, response) {
    const result = response.filter(i =>
      i.label.toLowerCase().includes(e.toLowerCase())
    );
    return result;
  }

  var Debounce = debounce((e, callback) => getTypeOptions(e, callback), 800);

  return (
    <div className='row form-group'>
      <Label>Position</Label>
        <AsyncSelect
          isClearable
          loadOptions={Debounce}
        />
    </div>
  );
};