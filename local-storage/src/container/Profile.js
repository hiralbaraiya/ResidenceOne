import React,{Component} from 'react';
import Axios from 'axios';
import {Label} from 'reactstrap'

class Profile extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentWillMount(){
        let token = localStorage.getItem('token');
        Axios.get(`http://localhost:8080/api/user/detail/${this.props.match.params.id}`,
          { headers: { 'token': token } })
          .then((response) => {
            console.log(response.data)
            if(response.data.status){
            this.setState({ data: response.data.data})}
            else{
                this.props.history.push('/admin/users')  
            }
          })
          .catch((e) => {
            this.props.history.push('/admin/users')
          })
      
    }

    render(){
        return(
            <div>
                <Label>Family Name:{}{console.log('user')}</Label>
                <Label>Main unit id{}</Label>
            </div>
        )
    }
}

export default Profile;