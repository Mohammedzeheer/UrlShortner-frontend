import axios from 'axios';

export const AxiosServer = axios.create({
  // baseURL: 'http://localhost:5000/',
   baseURL:'https://urlshortnerserver-evdp.onrender.com'
});
