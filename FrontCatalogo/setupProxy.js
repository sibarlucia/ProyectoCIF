const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/libros',
    createProxyMiddleware({
      target: 'http://localhost:3000/libros',
      changeOrigin: true,
    })
  );
};