import authService from '@/services/AuthService';
import { KEY_LOCALSTORAGE } from '@/utils/constants';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${
        localStorage.getItem(KEY_LOCALSTORAGE.ACCESS_TOKEN) || ' '
      }`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await authService.refresh();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
