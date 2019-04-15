import axios from 'axios';
import history from '../History';
import { toast } from 'react-toastify';

const base = 'http://localhost:8080/api/';
export const get = (url,token) => {
  return (
    axios.get(`${base}${url}`,{ headers: { 'token': token } })
      .then((response) => {
        let obj;
        if(response.data.message==='Invalid token'){
          toast.error("Token expired !", {
            position: toast.POSITION.TOP_RIGHT
          });
          localStorage.removeItem('token')
         history.push('/login')
         return(obj={'response':response,'error':true})
        }
         obj={'response':response,'error':false}
        return (
         obj
        );
      })
      .catch((error) => {
        console.log(error,'erro')
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT
        });
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
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT
        });
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
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT
        });
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
        toast.error("Something went wrong !", {
          position: toast.POSITION.TOP_RIGHT
        });
        let obj={'response':error,'error':true}
        return (
         obj
        );
      })
  );
};