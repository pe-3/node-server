const pool = require('../pool');
const {pw} = require('../../utils');

function addUser(user, callback) {
    pool.query(
        'INSERT INTO users SET ?',
        user,
        callback
    );
}

function getUserByUsername(username, callback) {
    pool.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        callback
    );
}

module.exports = {
    addUser: pw(addUser),
    getUserByUsername: pw(getUserByUsername)
}