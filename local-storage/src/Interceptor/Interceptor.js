import axios from 'axios';

const base = 'http://localhost:8080/api/';
export const get = (url) => {
  return (
    axios.get(`${base}${url}`)
      .then((response) => {
        return (
          Promise.resolve(
            response
          )
        );
      })
      .catch((error) => {
        return (
          Promise.reject(
            error
          ));
      })
  );
};

export const post = (url, data) => {
  return (
    axios.post(`${base}${url}`, data)
      .then(response => {
        return (
          Promise.resolve(
            response
          )
        );
      })
      .catch(function (error) {
        return (
          Promise.reject(
            error
          ));
      })
  );
};

export const put = (url, data) => {
  return (
    axios.put(`${base}${url}`, data)
      .then(response => {
        return (
          Promise.resolve(
            response
          )
        );
      })
      .catch(function (error) {
        return (
          Promise.reject(
            error
          ));
      })
  );
};

export const delet = (url) => {
  return (
    axios.delete(`${base}${url}`)
      .then(response => {
        return (
          Promise.resolve(
            response
          )
        );
      })
      .catch(function (error) {
        return (
          Promise.reject(
            error
          ));
      })
  );
};