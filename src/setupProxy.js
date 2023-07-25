const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-ozyiu/endpoint/data/v1/action/find',
      changeOrigin: true,
    })
  );
};
