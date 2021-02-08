
const path = require('path');

module.exports = {
    publicPath:'./',    // 公共路径
    outputDir: 'dist', // 不同的环境打不同包名
    lintOnSave:false,  // 关闭eslint
    productionSourceMap:true,  // 生产环境下css 分离文件
    devServer:{   // 配置服务器
        port:8080,
        open:true,
        https:false,
        overlay: {
            warnings: true,
            errors: true
        }
    },

   
}
