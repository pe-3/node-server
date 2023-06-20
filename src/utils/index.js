const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

exports.getModules = function (dirPath) {
    function Loop(dirPath) {
        const files = fs.readdirSync(dirPath);
        const modules = [];
        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                modules.push(...Loop(filePath, ''))
            } else if (path.extname(file) === '.js') {
                modules.push({
                    path: filePath,
                    module: require(filePath)
                });
            }
        });
        return modules;
    }
    return Loop(dirPath).map(m => ({
        path: m.path.replace(dirPath, '').replace('.js', '').replace('index', ''),
        module: m.module
    }));
}

exports.pw = function (func) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            func(...args, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        })
    }
};

const salt = crypto.randomBytes(16).toString('hex');
exports.hashPassword = function (password) {
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hashedPassword;
}

exports.verifyPassword = function (passwordAttempt, storedHashedPassword) {
    const hashedAttemptedPassword = crypto.pbkdf2Sync(passwordAttempt, salt ,1000 ,64 ,'sha512').toString('hex');
    return (hashedAttemptedPassword === storedHashedPassword);
}

/**
 * 用来生产随机验证码
 * @param {number} codeLen 随机验证码位数 
 * @returns {string} 默认返回六位数验证码
 */
exports.generateCode = function (codeLen = 6) {
    const chars = '0123456789';
    let code = '';
    for (let i = 0; i < codeLen; i++) {
        const index = Math.floor(Math.random() * 10);
        code += chars[index];
    }
    return code;
}

/**
 * 
 * @param {string} mail 输入邮箱地址
 * @returns {boolean} 输入邮箱格式是否合法
 */
exports.validateEmail = function (mail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
};