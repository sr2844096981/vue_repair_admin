import request from "@/request/request"

/**
 * 维修订单记录相关api
 */
// 获取报修列表
export const GetAllOrders = () => {
    return request({
        method: "GET",
        url: "/magicCampus/repairList.do",
    })
}

// 根据进度获取报修列表
export const QueryOrder = (id, name, schedule) => {
    return request({
        method: "POST",
        url: `/magicCampus/queryAdministratorScheduleList.do?id=${id}&name=${name}&schedule=${schedule}`,
    })
}

// 管理员受理维修订单
export const AcceptancenOrder = (repairId, name) => {
    return request({
        method: "POST",
        url: `/magicCampus/updateAccept.do?repairId=${repairId}&name=${name}`,
    })
}

// 派遣等待中的维修工
export const AssignmentOrder = (phone, repairId, name) => {
    return request({
        method: "POST",
        url: `/magicCampus/updateDispatch.do?phone=${phone}&repairId=${repairId}&name=${name}`,
    })
}

// 维修工签到
export const WorkSign = (repairId) => {
    return request({
        method: "POST",
        url: `/magicCampus/workSign.do?repairId=${repairId}`,
    })
}

// 维修工完工
export const Complete = (repairId) => {
    return request({
        method: "POST",
        url: `/magicCampus/updateFinished.do?repairId=${repairId}`,
    })
}