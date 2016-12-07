'use strict';

/**
 * This handles logins with a token.
 */
const bcrypt = require('bcrypt');

var db = require('./db');

/* Recommended as of 2014. */
const saltRounds = 10;

class Auth {
  /**
   * callback (success)
   */
  login(req, email, password, callback) {
    // Find the user's hashed password in the DB.
    db.collection('users').findOne({
      email: email,
      verifiedAt: {$exists: true}
    }, {
      hashedPassword: 1,
      email: 1,
      name: 1
    }, (err, user) => {
      console.log('logun err:',err);
      console.log('logun user:',user);

      if (user && user.hashedPassword) {
        // Compare the two hashed passwords.
        bcrypt.compare(password, user.hashedPassword).then((match) => {
          if(match) {
            req.session.user = {
              email: user.email,
              name: user.name
            };

            return {
              email: user.email,
              name: user.name
            };
          }
        });
      } else {
        // No match in db for email with a verified account.
        callback(false);
      }
    });
  }
}

module.exports = new Auth();