'use strict';

const crypto = require('crypto');

const mailer = require('./mailer');

class Verify {
  constructor() {
    // TODO: Connect to mongodb
  }

  create(email, done) {
    if (this.verifyPurdueEmail(email)) {
      this.createVerificationToken((token) => {
        mailer.sendVerificationEmail(email, token);
        done(true);
      });
    } else {
      done(false);
    }
  }

  createVerificationToken(callback) {
    crypto.randomBytes(48, (ex, buf) => {
      const token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
      callback(token);
    });
  }

  verifyPurdueEmail(purdueEmail) {
    const purdueEmailRegex = new RegExp('@purdue.edu\s*$');

    return purdueEmailRegex.test(purdueEmail);
  }
}

module.exports = new Verify();