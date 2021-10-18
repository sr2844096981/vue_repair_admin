import request from "@/request/request"

/**
 * 数据展示相关api
 */

// 获取今日报修数量
export const GetOrderNumByToday = () => {
        return request({
            method: "GET",
            url: '/Campus/getTodayNewRepair.do',
        })
    }
    // 获取全部报修数量
export const GetOrderNumByAll = () => {
    return request({
        method: "GET",
        url: '/Campus/allNewRepair.do',
    })
}

// 根据区域获取报修记录
export const GetOrderByRegion = (id, name, area) => {
    return request({
        method: "POST",
        url: `/Campus/getRepairListByArea.do?id=${id}&name=${name}&area=${area}`,
    })
}

//  获取全部区域的订单统计信息
export const GetOrderNumByRegion = () => {
    return request({
        method: "GET",
        url: '/Campus/getRepairNumListByArea.do',
    })
}

// 获取近七天的订单数量
export const GetOrderNumByWeek = () => {
    return request({
        method: "GET",
        url: '/Campus/getWeekNum.do',
    })
}

// 获取当天新增的订单记录
export const GetRepairListByToday = () => {
    return request({
        method: "GET",
        url: '/Campus/getRepairListByToday.do',
    })
}