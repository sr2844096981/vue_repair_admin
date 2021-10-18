import request from "@/request/request"

/**
 * 维修订单记录相关api
 */
// 获取报修列表
export const GetAllOrders = () => {
    return request({
        method: "GET",
        url: "/Campus/repairList.do",
    })
}