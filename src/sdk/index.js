import axios from 'axios';
import * as auth from './auth';
import * as user from './user';

axios.defaults.baseURL = 'http://localhost:3000/api';

export function setToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

const def = {
  auth,
  setToken,
  user,
}

export default def;
