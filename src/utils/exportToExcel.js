/* 导出为EXCEL */
/* 
    headers   表头对应关系 如
        const headers = {
            '工号': 'id',
            '姓名': 'name',
            '部门': 'unit',
            '电话': 'phone',
            '邮箱': 'email',
        }
    data    数据  先传入[{}] 再转成[[]]
    filename 文件名  '' 
*/
export function exportData(headers, data, filename) {
    const newData = formatJson(headers, data)
    import ("@/vendor/Export2Excel").then((excel) => {
        excel.export_json_to_excel({
            header: Object.keys(headers), //表头 必填 []
            data: newData, //具体数据 必填 [[]]
            filename, //非必填
            autoWidth: true, //宽度自适应（非必填）
            bookType: "xlsx", //文件类型（非必填）
        });
    });
}
// 该方法负责将数组转化成对应二维数组
// [] => [[]]
function formatJson(headers, rows) {
    // 首先遍历数组
    // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
    return rows.map(item => {
        // item是对象  => 转化成只有值的数组 => 数组值的顺序依赖headers  {username: '张三'  }
        // Object.keys(headers)  => ["姓名", "手机号",...]
        return Object.keys(headers).map(key => {
                return item[headers[key]]
            }) // /  得到 ['张三'，’129‘，’dd‘,'dd']
    })
}