// 创建v 二维码(二维码dom,内容,尺寸)
import QRCode from "qrcodejs2";
export function CreateQrcode(element, content, codeSize) {
    let createQrcode = new QRCode(element, {
        width: codeSize, //图像宽度
        height: codeSize, //图像高度
        colorDark: "#000000", //前景色
        colorLight: "#ffffff", //背景色
        typeNumber: 4,
        /* 
            QR容错级别是指QR码被遮挡或残破时依然能被识别的几率，
            容错级别越高抗残破或遮挡的能力就越强，同时注意，提高容错级别会增大点阵密度，识别速度随之降低。
            L（低）：容错率为 7%（最多有7%残破或遮挡以后仍可识别，但超过7%就无法识别了）
            M（中）：容错率为 15%
            Q（较高）：容错率为 25%
            H（高）：容错率为 30%
        */
        correctLevel: QRCode.CorrectLevel.M,
    });
    let createQrcodeImg = createQrcode.makeCode(content); //生成二维码
    return createQrcodeImg;
}