import axios from 'axios';
import * as auth from './auth';

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
}

export default def;
