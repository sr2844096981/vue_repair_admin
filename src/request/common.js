import request from "./request"

/**
 * 公共api
 */

// 获取列表数据
export const GetTableData = params => {
    // console.log(params);
    return request({
        method: "GET",
        url: params.url,
    })
}