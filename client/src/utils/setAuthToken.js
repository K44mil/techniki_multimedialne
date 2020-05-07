import axios from 'axios';

export const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.token}`
  }
});

const setAuthToken = token => {
  if (token) {
    client.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.Authorization;
  }
};

export default setAuthToken;
