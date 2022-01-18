module.exports = {
  webpack: config => {
    config.output.library = '__React_App__';
    config.output.libraryTarget = 'window';
    config.output.globalObject = 'window';
    config.output.publicPath = "//localhost:8002/";

    return config;
  },

  devServer: _ => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;

    config.hot = false;
    config.watchContentBase = false;
    config.liveReload = false;

    return config;
  },
};
