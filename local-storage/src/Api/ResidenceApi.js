import { get, post } from '../Interceptor/Interceptor';

export const getUserList = (halfurl) => {
  let token = localStorage.getItem('token');
  let url = `user/${halfurl}`;
  return (get(url, token));
};

export const getUnitList = (halfurl) => {
  let token = localStorage.getItem('token');
  let url = `unit/${halfurl}`;
  return (get(url, token));
};

export const updateUser = (halfurl, data) => {
  let url = `user/${halfurl}`;
  let token = localStorage.getItem('token');
  return (post(url, data, token));
}

export const getOwnerList = (halfurl) => {
  let token = localStorage.getItem('token');
  let url = `owner/${halfurl}`;
  return (get(url, token));
};

export const getVehicleList = (halfurl) => {
  let token = localStorage.getItem('token');
  let url = `vehicle/${halfurl}`;
  return (get(url, token));
};

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

export const getFamily=(halfurl)=>{
  let url=`family/${halfurl}`;
  let token = localStorage.getItem('token');
  return(get(url,token))
}

export const getPurchase=(halfurl)=>{
  let url=`purchases/${halfurl}`;
  let token = localStorage.getItem('token');
  return(get(url,token))
}