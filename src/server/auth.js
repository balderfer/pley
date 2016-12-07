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
  login(req, res) {

    if (!(req.body && req.body.email && req.body.password)) {
      res.status(400);
    }

    var email = req.body.email;
    var password = req.body.password;

    // Find the user's hashed password in the DB.
    db.collection('users').findOne({
      email: email,
      verifiedAt: {$exists: true}
    }, {
      hashedPassword: 1,
      email: 1,
      name: 1
    }, (err, user) => {

      if (user && user.hashedPassword) {
        // Compare the two hashed passwords.
        bcrypt.compare(password, user.hashedPassword).then((match) => {
          if(match) {
            req.session.user = {
              email: user.email,
              name: user.name
            };

            res.status(200).end({
              email: user.email,
              name: user.name
            });
          } else {
            res.status(401).end('Invalid email/password.');
          }
        });
      } else {
        // No match in db for email with a verified account.
        res.status(401).end('Invalid email/password.');
      }
    });
  }
}

module.exports = new Auth();