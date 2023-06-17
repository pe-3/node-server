const express = require('express');
const join = require('path').join;
const {getModules} = require('./utils');
const fs = require('fs');

const app = express();

app.use(express.json()); // 解析 JSON 数据

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
    app.use('/api/', router);
})

app.use('/', express.static(join(__dirname, '../dist'))); // 暴露页面
app.get('*', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(
        join(__dirname, '../dist/index.html'), 
        (err, data) => {
            if(err) res.send('err' + err.message);
            else res.send(data);
        }
    );
});

module.exports = app;