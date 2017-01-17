import axios from 'axios';
import config from '../config';

const { api: apiConfig } = config;

export default {
  getTranslations(lang) {
    return new Promise((resolve, reject) => {
      axios.get(`${apiConfig.path.translations}/${lang}.json`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  },
  getProjects(lang) {
    return new Promise((resolve, reject) => {
      axios.get(`${apiConfig.path.projects}/${lang}.json`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
    });
  }
};
