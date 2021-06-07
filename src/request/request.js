import axios from "axios"
import router from "../router";

const request = axios.create({
    // 开发
    baseURL: "http://localhost:8080",
    // 上线
    // baseURL: "http://39.101.165.25:8080",
    timeout: 5000
})

// instance 拦截器
/* const instance = axios.create({
    baseURL: "http://localhost:8084",
    timeout: 5000
}) */

// 请求拦截器
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

// 响应拦截器
request.interceptors.response.use(
    res => {
        console.log(res);
        return res;
    },
    error => {
        console.log(error);
        const { status } = error.response
        setTimeout(() => {
            if (status === 404) {
                router.push('/error404')
            } else if (status >= 500) {
                router.push('/error')
            }
        }, 3000);
        return Promise.reject(error);
    });

export default request