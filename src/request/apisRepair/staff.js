import request from "@/request/request"

/**
 * 维修人员管理相关api
 */

//  获取全部维修人员列表
export const GetAllStaff = () => {
    return request({
        method: "GET",
        url: "/magiccampus/queryAllRepairWorker",
    })
}

// 添加维修人员
export const AddStaff = data => {
    return request({
        method: "POST",
        url: "/magiccampus/insertWorker",
        data
    })
}

// 更改维修人员信息
export const UpdateStaffInfo = data => {
    return request({
        method: "POST",
        url: "/magiccampus/updateWorker",
        data
    })
}

// 删除维修人员
export const DeleteStaff = data => {
    return request({
        method: "GET",
        url: "/magiccampus/deleteWorker?id=" + data,
    })
}

// 根据部门查询维修人员
export const QueryStaff = data => {
    return request({
        method: "GET",
        url: "/magiccampus/queryTypeWorker?type=" + data,
    })
}