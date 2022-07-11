import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_URLAPI,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

export default api;
