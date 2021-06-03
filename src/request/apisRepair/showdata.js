import request from "@/request/request"

/**
 * 数据展示相关api
 */

// 获取报修数量
export const GetOrderNum = (id, name, day) => {
    return request({
        method: "POST",
        url: `/magiccampus/getTodayNewRepair?id=${id}&name=${name}&day=${day}`,
    })
}

// 根据区域获取报修记录
export const GetOrderByRegion = (id, name, area) => {
    return request({
        method: "POST",
        url: `/magiccampus/getRepairListByArea?id=${id}&name=${name}&area=${area}`,
    })
}

//  获取全部区域的订单统计信息
export const GetOrderNumByRegion = () => {
    return request({
        method: "GET",
        url: '/magiccampus/getRepairNumListByArea',
    })
}

// 获取近七天的订单数量
export const GetOrderNumByWeek = (id, name) => {
    return request({
        method: "POST",
        url: `/magiccampus/getWeekNum?id=${id}&name=${name}`,
    })
}

// 获取当天新增的订单记录
export const GetRepairListByToday = (id, name) => {
    return request({
        method: "POST",
        url: `/magiccampus/getRepairListByToday?id=${id}&name=${name}`,
    })
}