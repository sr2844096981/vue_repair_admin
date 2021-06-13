// 上传文件方法 (参数名，文件，文件名)
export function UploadFile(paramName, file, fileName) {
    const fd = new FormData();
    fd.append(paramName, file, fileName);
    return fd;
}