import axios from 'axios';
import * as auth from './auth';
import * as user from './user';

/**
 * Set the axios token
 * @param token
 */
function setToken(token) {
  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
}

const def = {
  auth,
  setToken,
  user,
}

export default def;
