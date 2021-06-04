import request from "@/request/request"

/**
 * 维修人员管理相关api
 */

//  获取全部维修人员列表
export const GetAllStaff = () => {
    return request({
        method: "GET",
        url: "/magicCampus/queryAllRepairWorker.do",
    })
}

// 添加维修人员
export const AddStaff = data => {
    return request({
        method: "POST",
        url: "/magicCampus/insertWorker.do",
        data
    })
}

// 更改维修人员信息
export const UpdateStaffInfo = data => {
    return request({
        method: "POST",
        url: "/magicCampus/updateWorker.do",
        data
    })
}

// 删除维修人员
export const DeleteStaff = data => {
    return request({
        method: "GET",
        url: "/magicCampus/deleteWorker.do?id=" + data,
    })
}

// 根据部门查询维修人员
export const QueryStaff = data => {
    return request({
        method: "GET",
        url: "/magicCampus/queryTypeWorker.do?type=" + data,
    })
}