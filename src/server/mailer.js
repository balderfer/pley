'use strict';

const nodemailer = require('nodemailer');

class Mailer {
  constructor() {
    if (!process.env.MAILER_EMAIL || !process.env.MAILER_PASS) {
      throw new Error('No emailer credentials.');
    } else {
      // Create a reusable transporter object using the default SMTP transport.
      this.transporter = nodemailer.createTransport(`smtps://${process.env.MAILER_EMAIL}%40gmail.com:${process.env.MAILER_PASS}@smtp.gmail.com`);
    }
  }

  sendVerificationEmail(email, token) {
    const verifyUrl = 'pley.usb.cs.purdue.edu';

    const emailHTMLContent = 
    `<b>Hello! Welcome to Pley.</b>
    <br>
    To get started, please click this button:
    <a href=${verifyUrl}/verify/${token} target="_blank">
      <button style="background: #ffd100;border: 1px solid black; outline:none; border-radius: 6px; padding: 20px;">Get started</button>
    </a>`;

    const mailOptions = {
      from: '"Purdue USB" <usb@cs.purdue.edu>',
      to: email,
      subject: 'Pley ✔ Get verified',
      html: emailHTMLContent
    };

    // console.log('Sending email to',email);

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // TODO: Make some callback for this.
        // return console.log(error);
      }
      // console.log('Message sent: ' + info.response);
    });
  }
}

module.exports = new Mailer();