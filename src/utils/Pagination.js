// 分页方法 (数组数据，页码，每页数量)
export function pageData(arr, pageIndex, pageSize) {
    let start = (pageIndex - 1) * pageSize;
    let end = start + pageSize;
    return arr.slice(start, end);
}