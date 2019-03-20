import React,{Component} from 'react';
import {Input,Label } from 'reactstrap';
import { stringify } from 'querystring';

class Inputfield extends Component{
    constructor(props){
        super(props)
        this.state={valid:true}
    }

validate(e){
if(this.props.exp){
let exp=this.props.exp;
let result=exp.test(e.target.value)
result?
this.setState({valid:true})
:
this.setState({valid:false})
}
}

    render(){
        let {type,placeholder}=this.props;
        return(
            <>
            <Label><b>{placeholder}</b></Label>
            <Input type={type} 
            placeholder={placeholder}
            onChange={(e)=>{this.props.onChange(e.target.value,placeholder)}}
            onBlur={(e)=>{this.validate(e)}}/>
            {
              (!this.state.valid&&!this.props.error)?
              <Label className='danger'>{placeholder} is invalid</Label>:
              <></>
            }
            </>
        )
    }
}

export default Inputfield;