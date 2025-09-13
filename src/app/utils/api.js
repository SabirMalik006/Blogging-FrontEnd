import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // apna backend URL
});

// Token auto attach
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token uthao localStorage se
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
