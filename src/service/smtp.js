const config = require('../../config');
const smtpConfig = config.smtp;

const nodemailer = require('nodemailer');


let sendEmail = async (data) => 
{
    try
    {

        let receipients = {
            from: smtpConfig.sender,
            to: 'priyaparuchuri111@gmail.com'
        }

        let emailContent = {
            subject: data.subject,
            html: data.message,
            attachments:[]
        };
    

        if (data.isHaveFile && !data.isBuffer && data.filepath && data.filepath.path && data.filename)
        {
            emailContent.attachments.push(
                {
                    filename: data.filename,
                    path: data.filepath.path
                }
            );
        }

        if (data.isHaveFile && data.isBuffer)
        {
            emailContent.attachments.push(
                {
                    filename: data.filename,
                    content: data.content,
                    encoding: 'base64',
                }
            );
        }

        let transportConfig = {
            host: smtpConfig.host,
            port: smtpConfig.port,
            secure: (smtpConfig.secure === 'true' || smtpConfig.secure === true) ? true : false,
            auth: {
                user: smtpConfig.email,
                pass: smtpConfig.paswd
            }
        };

        let transporter = nodemailer.createTransport(transportConfig);

        await transporter.sendMail({
            ...receipients,
            ...emailContent
        })

        return {
            status: 1,
            message: "Email sent..."
        }
    }
    catch (error)
    {
        return {
            status: 0,
            message: error.message,
            error: error
        }
    }
};

module.exports = {
    sendEmail: sendEmail
}
