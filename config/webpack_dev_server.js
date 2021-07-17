const path = require('path');
const bodyParser = require('body-parser');
const mock = require('./mock_data_middleware.js');

const isLocal = process.env.SERVE_MODE === 'local';
const port = isLocal ? 8081 : 8082;

const target = 'http://172.16.113.123:8080';

module.exports = {
  open: true,
  contentBase: [path.resolve(__dirname, '../dist')],
  historyApiFallback: true,
  hot: true,
  host: '0.0.0.0',
  port,
  useLocalIp: true,
  disableHostCheck: true,
  publicPath: '/assets/',
  noInfo: false,
  overlay: true,
  writeToDisk(p) {
    console.info('dev sever writeToDisk:', p);
    return p.indexOf('.html') > -1;
  },

  proxy: isLocal
    ? undefined
    : [
        {
          context: ['/api/**'],
          target,
          changeOrigin: true,
          onProxyReq(proxyReq, req) {
            console.info(`测试请求地址：${target}${req.originalUrl}`);
          },
        },
      ],

  before(app) {
    app.all(
      '/srGasoline/*',
      bodyParser.json(),
      mock({
        enable: isLocal,
        rootPath: path.resolve(__dirname, '../mockData/'),
      })
    );
  },
};
