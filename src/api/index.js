import axios from 'axios';

export default {
  getProjects(lang) {
    return new Promise((resolve, reject) => {
      axios.get(`/data/projects/${lang}.json`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  }
};
