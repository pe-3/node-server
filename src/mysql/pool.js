const mysql = require('mysql');
const config = require('../../mysql.json');

const pool = mysql.createPool(config);

module.exports = pool;