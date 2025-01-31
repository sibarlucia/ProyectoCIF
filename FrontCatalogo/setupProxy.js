const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://181.85.164.67',
      changeOrigin: true,
      secure: false
    })
  );
};