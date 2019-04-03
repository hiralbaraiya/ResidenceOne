import { get, post, delet, put } from '../Interceptor/Interceptor';

export const getUserList = (halfurl) => {
  let token = localStorage.getItem('token');
  let url = `user/${halfurl}`;
  return (get(url, token));
};

export const updateUser = (halfurl, data) => {
  let url = `user/${halfurl}`;
  let token = localStorage.getItem('token');
  return (post(url, data, token));
}

export const getResidentList=(halfurl)=>{
  let url=`reception/${halfurl}`;
  let token = localStorage.getItem('token');
  return(get(url,token))
}

export const updateReception=(halfurl,data)=>{
  let url=`reception/${halfurl}`;
  let token = localStorage.getItem('token');
  return (post(url, data, token));
}