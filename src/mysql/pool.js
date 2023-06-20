const mysql = require('mysql2');
const config = require('../../mysql.json');

const pool = mysql.createPool(config);

module.exports = pool;