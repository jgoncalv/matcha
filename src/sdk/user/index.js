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

