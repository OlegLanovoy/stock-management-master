import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials:true,
    baseURL:'/api'
})

export const authInstance = axios.create({
    withCredentials: true,
    baseURL:'/api'
})

axiosInstance.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    if(error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         try {
            await axios.post('/api/auth/refresh',{}, {withCredentials: true})
            return axiosInstance(originalRequest);
         } catch (error) {
            console.error('Token refresh failed:', error);
            if (window.location.pathname !== '/auth') {
              window.location.href = '/auth';
         }

            return Promise.reject(error);
         }
    }
    return Promise.reject(error);
})



