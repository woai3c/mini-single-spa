module.exports = {
    configureWebpack: {
        devtool: 'source-map',
    },
    devServer: {
        port: 8003,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    publicPath: '//localhost:8003/',
}