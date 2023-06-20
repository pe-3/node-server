/**
 * 邮件路由
 */
const { generateCode, validateEmail } = require('../../utils');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const mailHtml = fs.readFileSync(path.join(__dirname, '../../template/mail.html'), 'utf-8');
const mailUser = require('../../../mail.json');

module.exports = {
    async post(req, res) {
        try {
            // const { mail } = req.body;
            // // 0. 验证邮箱是否合法
            // if (!mail || !validateEmail(mail)) {
            //     return res.fail('邮箱为空或不合法');
            // }

            // // 1. 生成验证码
            // const code = generateCode();

            // // 2. 发送验证码
            // const transporter = nodemailer.createTransport({
            //     host: "external.newimg.ltd",
            //     port: 465,
            //     secure: true, // true for 465, false for other ports
            //     auth: mailUser,
            //     tls:{
            //         ciphers:'TLSv1'
            //     }
            // });

            // // send mail with defined transport object
            // let info = await transporter.sendMail({
            //     from: '"techat" <techat@qoop.top>', // sender address
            //     to: mail, // list of receivers
            //     subject: "Hello ✔", // Subject line
            //     html: ejs.compile(mailHtml)({code}), // html body
            // });

            // console.log("Message sent: %s", info.messageId);
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            // 4. 响应成功
            res.success('验证码发送成功，请注意查收');
        } catch (error) {
            console.log(error);
            res.fail(error.message);
        }
    }
}