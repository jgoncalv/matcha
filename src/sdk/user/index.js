import axios from 'axios';

/**
 * Get the user profil
 * @param {string} username
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getProfil({ username }) {
  return axios.get(`/user/${username}`);
};

/**
 * Get a suggestion of users around
 * @param {string} username
 * @returns {Promise<AxiosResponse<any>>}
 */
export function suggestedUsers({ username }) {
  return axios.get(`/user/${username}/suggestions`);
};

/**
 * Update the user
 * @param {string} username
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.first_name
 * @param {string} data.name
 * @returns {Promise<AxiosResponse<any>>}
 */
export function update(username, data) {
  return axios.put(`/user/${username}`, data);
};
