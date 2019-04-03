import axios from 'axios';
import history from '../History'

const base = 'http://localhost:8080/api/';
export const get = (url,token) => {
  return (
    axios.get(`${base}${url}`,{ headers: { 'token': token } })
      .then((response) => {
        if(response.data.message==='Invalid token'){
          localStorage.removeItem('token')
         history.push('/login')
         return(obj={'response':response,'error':true})
        }
        let obj={'response':response,'error':false}
        return (
         obj
        );
      })
      .catch((error) => {
        console.log(error,'erro')
        
        let obj={'response':error,'error':true}
        return (
         obj
        );
      })
  );
};

export const post = (url, data,token) => {
  return (
    axios.post(`${base}${url}`, (data),{ headers: { 'token': token } })
      .then(response => {
        let obj={'response':response,'error':false}
        return (
         obj
        );
      })
      .catch((error)=> { 
          let obj={'response':error,'error':true}
          return (
           obj
          );
        })
  );
};

export const put = (url, data,token) => {
  return (
    axios.put(`${base}${url}`, data,{ headers: { 'token': token } })
      .then(response => {
        let obj={'response':response,'error':false}
        return (
         obj
        );
      })
      .catch( (error) =>{
        let obj={'response':error,'error':true}
        return (
         obj
        );
      })
  );
};

export const delet = (url,token) => {
  return (
    axios.delete(`${base}${url}`,{ headers: { 'token': token } })
      .then(response => {
        let obj={'response':response,'error':false}
        return (
         obj
        );
      })
      .catch(function (error) {
        let obj={'response':error,'error':true}
        return (
         obj
        );
      })
  );
};