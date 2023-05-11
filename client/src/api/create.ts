import axios from "axios";

// 1단계
export const request = axios.create({
   baseURL: import.meta.env.VITE_API,
});

// 2단계
request.interceptors.response.use(
   (response) => response,
   (error) => Promise.reject(error)
);

export const a = 1;
