import request from "@/request/request"

/**
 * 二维码管理相关api
 */

//  获取全部二维码设备列表
export const GetAllDevice = () => {
    return request({
        method: "GET",
        url: "/magicCampus/queryAllDevice.do",
    })
}

// 添加
export const AddDevice = data => {
    return request({
        method: "POST",
        url: "/magicCampus/addDevice.do",
        data
    })
}

// 更改信息
export const UpdateDeviceInfo = data => {
    return request({
        method: "POST",
        url: "/magicCampus/updateDevice.do",
        data
    })
}

// 删除
export const DeleteStaff = (id) => {
    return request({
        method: "POST",
        url: "/magicCampus/removeDevice.do?id=" + id,
    })
}