const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const port = 8080;




app.use('/api',
  createProxyMiddleware({
    target: 'https://api.publicapis.org/',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    },
  })
);

app.use(express.static(path.join(__dirname, '../public'), { maxAge: 0 }))

app.use((req, res, next) => res.status(200).sendFile(path.resolve(__dirname, '../public', 'index.html')))

app.listen(port, () => console.info(`Server start port ${port}`))