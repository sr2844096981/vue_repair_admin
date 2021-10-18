import request from "./request"

/**
 * 登录
 */
export const Login = data => {
    /* 
        简写：
        request.post("/Campus/getAdministratorLogin", data)
        完整写法：
        request({
            method:"POST",
            url:"/Campus/getAdministratorLogin",
            data:data
        })
    */
    return request({
        method: "POST",
        url: "/Campus/postAdministratorLogin.do",
        data
    })
}