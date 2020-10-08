import axios from 'axios';

/**
 * Log the user
 * @param {Object} data
 * @param {string} data.username
 * @param {string} data.password -
 * @returns {Promise<AxiosResponse<any>>}
 */
export function login(data) {
  return axios.post('/auth/login', data);
};

/**
 * Sign up the user
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.username
 * @param {string} data.first_name
 * @param {string} data.name
 * @returns {Promise<AxiosResponse<any>>}
 */
export function register(data) {
  return axios.post('/auth/register', data);
};
