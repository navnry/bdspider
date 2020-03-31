const webpack = require('webpack')
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'https://ditu.so.com/',
                // target: 'https://map.baidu.com/',
                // target: 'http://www.hnzxzy.cn/',
                changeOrigin: true,
                pathRewrite: {},
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
