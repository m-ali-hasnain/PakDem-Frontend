import axios from "axios";

const Axios = axios.create({
  baseURL: 'http://localhost:4000/',
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor to attach the authorization header
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

// Add a response interceptor to handle the token returned after login
Axios.interceptors.response.use(
  (response) => {
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
      // Now the token will be included in the headers of subsequent requests automatically
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;

