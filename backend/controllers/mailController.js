const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  secureConnection: false,
  port: 587,
  tls: {
    ciphers:'SSLv3'
  },
  auth: {
    user: 'info2@thac.or.th',
    pass: 'Thac@1234'
  }
})

module.exports = {
  sendMessage: async (req, res, next) => {
    const mailOptions = req.body
    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        return err
      } else {
        return info
        // res.send({ status: 200, statusText: 'successful' })
      }
    })
  }
}