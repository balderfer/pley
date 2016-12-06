'use strict';

/**
 * This handles logins with a token.
 */
const bcrypt = require('bcrypt');

const db = require('./db');

/* Recommended as of 2014. */
const saltRounds = 10;

class Auth {
  /**
   * callback (success)
   */
  login(req, email, password, callback) {
    console.log('Log in', email, 'with password', password);

    // Find the user's hashed password in the DB.
    db.collection('users').find({
      email: email,
      verifiedAt: {$exists: true}
    }, {
      hashedPassword: 1,
      email: 1,
      name: 1
    }, (err, result) => {
      console.log('logun err:',err);
      console.log('logun result:',result);
      if (result && result.hashedPassword) {
        // Compare the two hashed passwords.
        bcrypt.compare(password, result.hashedPassword).then((match) => {
          if(match) {
            req.session.email = result.email;
            req.session.name = result.name;
            req.session.loggedIn = true;
          }

          callback(match);
        });
      }
    });
  }
}

module.exports = new Auth();