import axios from 'axios';

export const AxiosServer = axios.create({
  baseURL: 'http://localhost:5000/',
});
