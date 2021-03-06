'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collections = require('../collections');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Verify = require('../verify');
var db = require('../db');

/* Recommended as of 2014. */

var Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: 'login',
    value: function login(req, res) {
      if (!(req.body && req.body.email && req.body.password)) {
        res.status(400);
      }

      var email = req.body.email;
      var password = req.body.password;

      // Find the user's hashed password in the DB.
      _collections.Users.findUserByEmail(email, {
        _id: 1,
        name: 1,
        hashedPassword: 1,
        email: 1
      }, function (user) {
        if (user && user.hashedPassword) {
          // Compare the two hashed passwords.
          _collections.Users.authenticate(user, password, function (match) {
            if (match) {
              req.session.user = {
                _id: user._id,
                email: user.email,
                name: user.name
              };

              res.status(200).end('Success. You are now logged in.');
            } else {
              res.status(401).end('Invalid email/password.');
            }
          });
        } else {
          // No match in db for email with a verified account.
          res.status(401).end('Cannot find user');
        }
      });
    }
  }, {
    key: 'logout',
    value: function logout(req, res) {
      req.session.user = null;
      res.redirect('/');
    }
  }, {
    key: 'signup',
    value: function signup(req, res) {
      if (!req.body || !req.body.email) {
        res.status = 400;
        res.send('Incorrect parameters.');
      } else {
        Verify.create(req.body.email, function (success) {
          if (success) {
            res.status(200);
            res.send('Success');
          } else {
            res.status(400);
            res.send('Failure');
          }
        });
      }
    }
  }, {
    key: 'settings',
    value: function settings(req, res) {
      if (!req.session.user || !req.body || !req.body.password || !req.body.name) {
        res.status(401).end('Thats a bad request');
      } else {
        _collections.Users.findUserByEmail(req.session.user.email, {
          _id: 1,
          hashedPassword: 1
        }, function (user) {
          if (user && user.hashedPassword) {
            _collections.Users.authenticate(user, req.body.password, function (match) {
              // The user is who they say they are, let them change the settings.
              if (match) {
                req.session.user.name = req.body.name;

                if (req.body.newPassword && req.body.confirmPassword) {
                  _collections.Users.hash(req.body.newPassword, function (err, hash) {
                    if (err) {
                      console.log('Error hashing password.', err);
                      res.status(400).end('Error hashing password.');
                      return;
                    }
                    if (hash) {
                      var update = {
                        name: req.body.name,
                        hashedPassword: hash
                      };

                      _collections.Users.updateUserByEmail(req.session.user.email, update, function (response) {
                        if (response && response.nModified === 1) {
                          res.status(200).end('Success');
                        } else {
                          res.status(400).end('Error updating user.');
                        }
                      });
                    }
                  });
                } else {
                  var update = {
                    name: req.body.name
                  };

                  // The user is who they say they are, let them change the settings.
                  _collections.Users.updateUserByEmail(req.session.user.email, update, function (response) {
                    if (response && response.nModified === 1) {
                      res.status(200).end('Success');
                    } else {
                      res.status(400).end('Error updating user.');
                    }
                  });
                }
              } else {
                res.status(401).end('Invalid email/password.');
              }
            });
          } else {
            // No match in db for email with a verified account.
            res.status(401).end('Cannot find user');
          }
        });
      }
    }
  }, {
    key: 'getRegister',
    value: function getRegister(req, res) {
      if (req.query && req.query.email && req.query.token) {
        res.render('register', {
          userEmail: req.query.email,
          verifyToken: req.query.token
        });
      } else {
        res.redirect('/');
      }
    }
  }, {
    key: 'postRegister',
    value: function postRegister(req, res) {
      if (req.body && req.body.token && req.body.email && req.body.password && req.body.passwordVerification && req.body.name) {

        if (req.body.password !== req.body.passwordVerification) {
          res.render('register', {
            userEmail: req.body.email,
            registerMessage: 'Your passwords don\'t match.'
          });
          return;
        }

        Verify.verifyToken(req.body.email, req.body.token, function (success) {
          if (success) {
            _collections.Users.hash(req.body.password, function (err, hash) {
              if (err) console.log('Error hashing password.', err);
              if (hash) {
                _collections.Users.updateUserByEmail(req.body.email, {
                  hashedPassword: hash,
                  name: req.body.name
                }, function (user) {
                  req.session.user = {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                  };

                  res.redirect('/dashboard');
                });
              }
            });
          } else {
            res.render('register', {
              userEmail: req.body.email,
              registerMessage: 'Error verifying account. You need to resend yourself the email at pley.usb.purdue.edu'
            });
          }
        });
      } else if (req.body.email && req.body.token) {
        res.render('register', {
          userEmail: req.body.email,
          registerMessage: 'Invalid request, did you fill out all of the fields? You may need to resend yourself the email at pley.usb.purdue.edu'
        });
      } else {
        console.log("No session for registration.");
        res.render('index');
      }
    }
  }]);

  return Auth;
}();

exports.default = Auth;