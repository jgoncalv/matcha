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

export function uploadImage(username, file) {
  const formData = new FormData();
  formData.append('img', file);

  return axios.post(`/user/${username}/images`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
};

export function getUserImages(username) {
  return axios.get(`/user/${username}/images`);
};

export function removeUserImage(username, id) {
  return axios.delete(`/user/${username}/images/${id}`);
};

export function changeAvatar({username, id}) {
  return axios.put(`/user/${username}/images/${id}/avatar`);
}

export function searchUsers({ username }) {
  return axios.get(`/user/${username}/search`);
}

export function getLikes({ username, number }) {
  return axios.get(`/user/${username}/likes?page=${number}`);
}

export function getVisits({ username, number }) {
  return axios.get(`/user/${username}/visits?page=${number}`);
}

export function like(username, data) {
  return axios.post(`/user/${username}/likes`, data);
}

export function report(username, data) {
  return axios.post(`/user/${username}/reports`, data);
}

export function block(username, data) {
  return axios.post(`/user/${username}/blocks`, data);
}
