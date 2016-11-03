'use strict';

const crypto = require('crypto');

class Verify {
  constructor() {
    // TODO: Connect to mongodb
  }

  create() {
    this.createVerificationToken((token) => {
      console.log('token created:',token);
    });
  }

  createVerificationToken(callback) {
    crypto.randomBytes(48, (ex, buf) => {
      const token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
      callback(token);
    });
  }
}

module.exports = new Verify();