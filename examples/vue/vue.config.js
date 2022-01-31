module.exports = {
    configureWebpack: {
        devtool: 'source-map',
    },
    devServer: {
        port: 8001,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    publicPath: "//localhost:8001/",
}