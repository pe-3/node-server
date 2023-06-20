/**
 * 用户注册
 */

// 引入操作数据库的函数
const {
    getUserByUsername,
    addUser,
} = require('../../mysql/sql/user');
const { hashPassword } = require('../../utils');

module.exports = {
    async post(req, res) {
        try {
            const {
                username,
                password,
                mail,
                code
            } = req.body;

            // 查看邮箱验证码是否正确
            // if (!code || req.signal.get(mail) !== code) {
            //     return res.fail('邮箱验证码错误');
            // }
            // else {
            //     req.signal.delete(mail);
            // }

            // 检查用户名是否已被注册
            const user = await getUserByUsername(username);
            if (
                Array.isArray(user)
                && user.length
            ) {
                return res.fail('该用户已经注册过了');
            }

            // 加密密码
            const hashedPass = hashPassword(password);

            // 创建新用户
            const newUser = {
                username,
                password: hashedPass,
                mail
            };

            // 写入数据库
            const { affectedRows } = await addUser(newUser);
            if (affectedRows === 1) {
                return res.success('注册成功');
            }
            return res.fail('服务器出现问题，请稍后再试');
        }
        catch (e) {
            console.log(e);
        }
    }
}