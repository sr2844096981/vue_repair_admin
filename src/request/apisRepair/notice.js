import request from "@/request/request"

/**
 * 公告相关api
 */

// 获取公告列表
export const GetNoticeList = data => {
    return request({
        method: "POST",
        url: "/magicCampus/viewAnnouncementAdmin.do",
        data
    })
}

// 删除公告
export const DeleteNotice = data => {
    return request({
        method: "POST",
        url: "/magicCampus/deleteAnnouncement.do",
        data
    })
}

// 发布公告
export const ReleaseNotice = data => {
    return request({
        method: "POST",
        url: "/magicCampus/getAnnouncement.do",
        data
    })
}

// 上传图片到服务器
export const AddAnnImageToServer = data => {
    return request({
        method: "POST",
        url: "/magicCampus/addAnnImageServer.do",
        data
    })
}