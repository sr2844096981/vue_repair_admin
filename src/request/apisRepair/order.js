import request from "@/request/request"

/**
 * 维修订单记录相关api
 */
// 获取报修列表
export const GetAllOrders = () => {
    return request({
        method: "GET",
        url: "/magiccampus/repairList",
    })
}

// 根据进度获取报修列表
export const QueryOrder = (id, name, schedule) => {
    return request({
        method: "POST",
        url: `/magiccampus/queryAdministratorScheduleList?id=${id}&name=${name}&schedule=${schedule}`,
    })
}

// 管理员受理维修订单
export const AcceptancenOrder = (id, repairId, name) => {
    return request({
        method: "POST",
        url: `/magiccampus/updateAccept?id=${id}&repairId=${repairId}&name=${name}`,
    })
}

// 派遣等待中的维修工
export const AssignmentOrder = (phone, repairId, name) => {
    return request({
        method: "POST",
        url: `/magiccampus/updateDispatch?phone=${phone}&repairId=${repairId}&name=${name}`,
    })
}

// 维修工签到
export const WorkSign = (repairId) => {
    return request({
        method: "POST",
        url: `/magiccampus/workSign?repairId=${repairId}`,
    })
}

// 维修工完工
export const Complete = (repairId) => {
    return request({
        method: "POST",
        url: `/magiccampus/updateFinished?repairId=${repairId}`,
    })
}