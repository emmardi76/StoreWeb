import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.baseURL = "https://localhost:5001/api/";
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    localStorage.clear();
    window.location.href = "/";
  }
  return error.response;
});

export default axios;
