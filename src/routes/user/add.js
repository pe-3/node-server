const fs = require('fs');
const path = require('path');
const { addUser } = require('../../mysql/sql/user');
module.exports = {
    async get(req, res) {
        fs.readFile(path.join(__dirname, './add.html'), 'utf-8', (err, data) => {
            if (err) res.send(err.message);
            else {
                res.setHeader('Content-Type', 'text/html');
                res.send(data);
            }
        })
    },
    async post(req, res) {
        const {
            username,
            password,
            mail,
            code
        } = req.body;

        const data = {
            username,
            password,
            mail,
            code
        };

        addUser(data, (err, data) => {
            if (err) return res.send({
                status: -1,
                msg: err.message
            });
            res.send({
                status: 0,
                msg: 'success'
            });
        })

        res.send('ok')
    }
}