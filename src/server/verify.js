'use strict';

const crypto = require('crypto');

const mailer = require('./mailer');
const db = require('./db');

class Verify {
  constructor() {
    // TODO: Connect to mongodb
  }

  create(email, done) {
    if (email && this.verifyPurdueEmail(email.toLowerCase())) {
      this.createVerificationToken((token) => {
        // Create the user in our database and give them a login token.
        db.collection('users').update({
          email: email
        }, {
          email: email,
          createdAt: Date.now(),
          verificationToken: token,
          verified: false
        }, {
          upsert: true
        }, (err, result) => {
          console.log('created token err:',err);
          console.log('created token result',result);

          if (err) {
            done(false);
          } else {
            done(true);

            mailer.sendVerificationEmail(email, token);
          }
        });
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

  /**
   * @return true or false, depending on if the token exists for the email.
   */
  verifyToken(email, token, done) {
    // Create the user in our database and give them a login token.
    db.collection('users').update({
      email: email,
      verificationToken: token,

      // When a password exists for the account, we know they have gone through signup already.
      verifiedAt: {$exists: false}
    }, {
      verifiedAt: Date.now()
    }, {
      upsert: true
    }, (err, result) => {
      console.log('err:', err);
      console.log('result:', result);

      if (err) {
        done(false);
      } else {
        done(true);
      }
    });
  }

  verifyPurdueEmail(purdueEmail) {
    const purdueEmailRegex = new RegExp('@purdue.edu\s*$');

    return purdueEmailRegex.test(purdueEmail);
  }
}

module.exports = new Verify();