'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodemailer = require('nodemailer');

var Mailer = function () {
  function Mailer() {
    _classCallCheck(this, Mailer);

    if (!process.env.MAILER_EMAIL || !process.env.MAILER_PASS) {
      throw new Error('No emailer credentials.');
    } else {
      // Create a reusable transporter object using the default SMTP transport.
      this.transporter = nodemailer.createTransport('smtps://' + process.env.MAILER_EMAIL + '%40gmail.com:' + process.env.MAILER_PASS + '@smtp.gmail.com');
    }
  }

  _createClass(Mailer, [{
    key: 'sendVerificationEmail',
    value: function sendVerificationEmail(email, token) {
      var verifyUrl = 'http://pley.usb.cs.purdue.edu/register?token=' + token + '&email=' + email;
      console.log('verifyUrl:', verifyUrl);

      var emailHTMLContent = '<b>Hello! Welcome to Pley.</b>\n    <br>\n    To get started, please click this button:\n    <a href="' + verifyUrl + '" target="_blank">\n      <button style="background: #ffd100;border: 1px solid black; outline:none; border-radius: 6px; padding: 20px;">Get started</button>\n    </a>';

      var mailOptions = {
        from: '"Purdue USB" <usb@cs.purdue.edu>',
        to: email,
        subject: 'Pley ✔ Get verified',
        html: emailHTMLContent
      };

      // console.log('Sending email to',email);

      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          // TODO: Make some callback for this.
          return console.log(error);
        }
        console.log('Message sent: ' + info.response);
      });
    }
  }]);

  return Mailer;
}();

module.exports = new Mailer();