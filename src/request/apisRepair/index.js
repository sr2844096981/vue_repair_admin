import request from "@/request/request"

/**
 * 首页api
 */
//  上传管理员头像到数据库
export const ChangeAvatar = data => {
    return request({
        method: "POST",
        url: "/Campus/uploadAdminHeaderDatabase.do",
        data
    })
}

// 上传管理员头像到服务器
export const UpdateAvatarToServer = data => {
    return request({
        method: "POST",
        url: "/Campus/updateAdminHeaderServer.do",
        data
    })
}