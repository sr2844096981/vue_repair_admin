import request from "@/request/request"

/**
 * 公告相关api
 */

// 获取公告列表
export const GetNoticeList = data => {
    return request({
        method: "POST",
        url: "/Campus/viewAnnouncementAdmin.do",
        data
    })
}

// 删除公告
export const DeleteNotice = data => {
    return request({
        method: "POST",
        url: "/Campus/deleteAnnouncement.do",
        data
    })
}

// 发布公告
export const ReleaseNotice = data => {
    return request({
        method: "POST",
        url: "/Campus/getAnnouncement.do",
        data
    })
}

// 上传图片到服务器
export const AddAnnImageToServer = data => {
    return request({
        method: "POST",
        url: "/Campus/addAnnImageServer.do",
        data
    })
}