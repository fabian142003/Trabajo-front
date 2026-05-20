import api from "./axios";

import { tokenManager } from "../auth/tokenManager";

api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      tokenManager.removeToken();

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);