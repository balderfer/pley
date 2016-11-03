'use strict';

const crypto = require('crypto');

class Verify {
  constructor() {
    // TODO: Connect to mongodb
  }

  create(email, done) {
    if (this.verifyPurdueEmail(email)) {
      this.createVerificationToken((token) => {
        console.log('token created:',token);
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
    return purdueEmail;
  }
}

module.exports = new Verify();