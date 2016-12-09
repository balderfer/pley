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
    const verifyUrl = `http://pley.usb.cs.purdue.edu/register?token=${token}&email=${email}`;
    console.log('verifyUrl:', verifyUrl);

    const emailHTMLContent = 
    `<div style="text-align: center; font-family: open sans,helvetica neue,helvetica,arial,sans-serif;">
      <br>
      <h1>Hello! Welcome to Pley.</h1>
      <br>
      <br>
      To get started, please click this button:
      <a href="${verifyUrl}" target="_blank" style="text-decoration: none;">
        <span style="color: black; background: #ffd100; outline:none; border: none; border-radius: 6px; padding: 20px; margin: 10px; font-size:22px;">Get Started</span>
      </a>
      <br>
      <br>
      <br>
      <p>Or you may follow this link: <a href="${verifyUrl}" target="_blank">${verifyUrl}</a></p>
    </div>`;

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
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  }
}

module.exports = new Mailer();