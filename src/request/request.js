import axios from "axios"

const request = axios.create({
    baseURL: "http://localhost:8084",
    timeout: 5000
})
export default request

// instance 拦截器
/* const instance = axios.create({
    baseURL: "http://localhost:8084",
    timeout: 5000
}) */

// 发请求之前执行
/* instance.interceptors.request.use(
    config => {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
                
        // let token = localStorage.getItem('token')
        //     if (!config.headers.hasOwnProperty('token') && token) {
        //     config.headers.Authorization = token;
        //     } 
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }); */

/* instance.interceptors.response.use(
    res => {
        console.log(res);
        return res;
    },
    error => {
        return Promise.reject(error);
    }); */

// export default instance