'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var crypto = require('crypto');

var mailer = require('./mailer');

var db = require('./db');

var Verify = function () {
  function Verify() {
    _classCallCheck(this, Verify);
  }

  _createClass(Verify, [{
    key: 'create',
    value: function create(email, done) {
      if (email && this.verifyPurdueEmail(email.toLowerCase())) {
        this.createVerificationToken(function (token) {
          // Create the user in our database and give them a login token.
          db.collection('users').update({
            email: email,
            verifiedAt: { $exists: false }
          }, {
            email: email,
            createdAt: Date.now(),
            verificationToken: token,
            verified: false
          }, {
            upsert: true
          }, function (err, result) {
            console.log('created token err:', err);
            console.log('created token result', result);

            if (err) {
              done(false);
            } else if (result && result.nModified === 1) {
              mailer.sendVerificationEmail(email, token);
              done(true);
            } else {
              done(false);
            }
          });
        });
      } else {
        done(false);
      }
    }
  }, {
    key: 'createVerificationToken',
    value: function createVerificationToken(callback) {
      crypto.randomBytes(48, function (ex, buf) {
        var token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
        callback(token);
      });
    }

    /**
     * @return true or false, depending on if the token exists for the email.
     */

  }, {
    key: 'verifyToken',
    value: function verifyToken(email, token, done) {
      // Create the user in our database and verify their login token.
      db.collection('users').update({
        email: email,
        verificationToken: token,

        // When a password exists for the account, we know they have gone through signup already.
        verifiedAt: { $exists: false }
      }, {
        $set: {
          verifiedAt: Date.now()
        }
      }, function (err, result) {
        if (err) {
          console.log('Error verifying token:', err);
          done(false);
        } else if (result && result.nModified === 1) {
          done(true);

          // mailer.sendVerificationEmail(email, token);
        } else {
          console.log('Error verifying token:', err);
          done(false);
        }
      });
    }
  }, {
    key: 'verifyPurdueEmail',
    value: function verifyPurdueEmail(purdueEmail) {
      var purdueEmailRegex = new RegExp('@purdue.edu\s*$');

      return purdueEmailRegex.test(purdueEmail);
    }
  }]);

  return Verify;
}();

module.exports = new Verify();