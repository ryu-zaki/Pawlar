/* import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'; */

import axios, { type AxiosInstance } from 'axios';


const api: AxiosInstance = axios.create({
    baseURL: `http://192.168.1.4:3000`,
    withCredentials: true,
});

export let accessToken: null | string;

export const setAccessToken = (token: string) => {
    accessToken = token
}

// Automatic attachment of access token on every request
/* api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (accessToken && config.headers) {
           config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config;
    },
    (err: AxiosError) => Promise.reject(err)
); */

// Handling expired or invalid accessToken
/* api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError) => {
       const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

       if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // get a new access token using refresh token cookie
            const res = await api.post<{ accessToken: string }>("/refresh");

            accessToken = res.data.accessToken;

            if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${accessToken}`
            }

            return api(originalRequest);
          }
           catch(err) {
            console.error("Refresh token invalid or expired:", err);
          }
       }

       return Promise.reject(error);
    }

) */

export default api;


