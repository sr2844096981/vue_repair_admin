import request from "@/request/request"

/**
 * 数据展示相关api
 */

// 获取报修数量
export const GetOrderNum = (id, name, day) => {
    return request({
        method: "POST",
        url: `/magicCampus/getTodayNewRepair.do?id=${id}&name=${name}&day=${day}`,
    })
}

// 根据区域获取报修记录
export const GetOrderByRegion = (id, name, area) => {
    return request({
        method: "POST",
        url: `/magicCampus/getRepairListByArea.do?id=${id}&name=${name}&area=${area}`,
    })
}

//  获取全部区域的订单统计信息
export const GetOrderNumByRegion = () => {
    return request({
        method: "GET",
        url: '/magicCampus/getRepairNumListByArea',
    })
}

// 获取近七天的订单数量
export const GetOrderNumByWeek = () => {
    return request({
        method: "GET",
        url: '/magicCampus/getWeekNum.do',
    })
}

// 获取当天新增的订单记录
export const GetRepairListByToday = () => {
    return request({
        method: "GET",
        url: '/magicCampus/getRepairListByToday.do',
    })
}