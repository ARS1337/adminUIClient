const axios = require("axios");

const customAxios = axios.create();
customAxios.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.withCredentials = true;
  return config;
});

customAxios.interceptors.response.use((res)=>{
  return res
},(err)=>{
  return Promise.reject(err);
})

export default customAxios;
