import axios from "axios"
import router from "../router";
import { Message } from "element-ui";

const TimeOut = 5400 //超时时间 秒

const request = axios.create({
    // 开发
    //baseURL: "http://localhost:8080",
    // 上线
     baseURL: "http://47.100.119.125:8080",
    timeout: 5000
})

// instance 拦截器
/* const instance = axios.create({
    baseURL: "http://localhost:8084",
    timeout: 5000
}) */


request.interceptors.request.use(config => {
    if (window.sessionStorage.getItem('timeStamp')) {
        if (isCheckTimeOut()) {
            // 登出操作
            window.localStorage.clear();
            window.sessionStorage.clear();
            Message.error("长时间未操作，请重新登陆！");
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        }
    } else {
        window.sessionStorage.setItem('timeStamp', Date.now())
    }
    return config
})

// 操作超时
function isCheckTimeOut() {
    let currentTime = Date.now() // 当前时间戳
    let timeStamp = window.sessionStorage.getItem('timeStamp') // 缓存时间戳
    return (currentTime - timeStamp) / 1000 > TimeOut
}
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
/* request.interceptors.response.use(
    res => {
        // console.log(res);
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
 */
export default request