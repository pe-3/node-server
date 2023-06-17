const express = require('express');
const join = require('path').join;
const {getModules} = require('./utils');

const app = express();


// 获取所有暴露的路由
const dirPath = join(__dirname, './routes');
const routes = getModules(dirPath);

// 注册所有路由
routes.forEach(route => {
    const { path, module } = route;
    const router = express.Router();

    // 依次获取定义的请求响应函数
    ['get', 'post'].forEach((method) => {
        if(!module[method]) return;
        router[method](path, [], module[method]);
    });

    app.use(router);
})

module.exports = app;