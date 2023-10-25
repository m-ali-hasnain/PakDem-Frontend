import axios from "axios";

const Axios = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: { 'Content-Type': 'application/json' }
});


Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && !config.url.includes('/User/login')) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;

