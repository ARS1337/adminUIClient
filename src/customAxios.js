const axios = require('axios');

const customAxios = axios.create()
customAxios.interceptors.request.use((config)=>{
    let token =localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

export default customAxios