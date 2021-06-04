import request from "./request"

/**
 * 登录
 */
export const Login = data => {
    /* 
        简写：
        request.post("/magicCampus/getAdministratorLogin", data)
        完整写法：
        request({
            method:"POST",
            url:"/magicCampus/getAdministratorLogin",
            data:data
        })
    */
    return request({
        method: "POST",
        url: "/magicCampus/postAdministratorLogin.do",
        data
    })
}