module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {     //axios跨域处理
            '/api': {       //此处并非和url一致
                target:'http://49.234.18.247:8080/',
                changeOrigin:true, //允许跨域
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    }
}
