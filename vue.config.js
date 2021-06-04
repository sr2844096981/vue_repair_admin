const path = require('path');
module.exports = {
    devServer: {
        open: false,
        host: 'localhost',
        port: 8084,
        https: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        proxy: { //配置跨域
            '/magicCampus': {
                target: 'http://39.101.165.25:8080/',
                ws: true,
                changOrigin: true, //允许跨域
                /* pathRewrite: {
                    '^/myWeb': '' //请求的时候使用这个api就可以
                } */
            }
        }
    },
    /* 路径配置 */
    configureWebpack: (config) => {
        config.resolve = { // 配置解析别名
            extensions: ['.js', '.json', '.vue'], // 自动添加文件名后缀
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@c': path.resolve(__dirname, './src/components')
            }
        }
    },
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // assetsPublicPath: './'
}