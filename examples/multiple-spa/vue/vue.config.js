module.exports = {
    configureWebpack: {
        devtool: 'source-map',
        output: {
            library: '__Vue_App__', // 导出名称
            libraryTarget: 'window', //挂载目标
        },
    },
    devServer: {
        port: 8001,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    publicPath: "//localhost:8001/",
}