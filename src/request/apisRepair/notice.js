import request from "@/request/request"

/**
 * 公告相关api
 */

// 获取公告列表
export const GetNoticeList = data => {
    return request({
        method: "POST",
        url: "/magiccampus/viewAnnouncementAdmin",
        data
    })
}

// 删除公告
export const DeleteNotice = data => {
    return request({
        method: "POST",
        url: "/magiccampus/deleteAnnouncement",
        data
    })
}

// 发布公告
export const ReleaseNotice = data => {
    return request({
        method: "POST",
        url: "/magiccampus/getAnnouncement",
        data
    })
}