import axios from 'axios';

export const retrieveWording = async () => {
  return axios.get('/api/categories');
}