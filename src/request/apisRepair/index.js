import request from "@/request/request"

/**
 * 首页api
 */
//  上传管理员头像到服务器
export const ChangeAvatar = data => {
    return request({
        method: "POST",
        url: "/magicCampus/uploadAdminHeaderDatabase.do",
        data
    })
}