'use strict';

const Verify = require('../verify');
const db = require('../db');
import { Users } from '../collections';

/* Recommended as of 2014. */

export default class Auth {

  static login(req, res) {
    if (!(req.body && req.body.email && req.body.password)) {
      res.status(400);
    }

    var email = req.body.email;
    var password = req.body.password;

    // Find the user's hashed password in the DB.
    Users.findUserByEmail(email, {
      _id: 1,
      name: 1,
      hashedPassword: 1,
      email: 1
    }, (user) => {
      if (user && user.hashedPassword) {
        // Compare the two hashed passwords.
        Users.authenticate(user, password, (match) => {
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

  static logout(req, res) {
    req.session.user = null;
    res.redirect('/');
  }

  static signup(req, res) {
    if (!req.body || !req.body.email) {
      res.status = 400;
      res.send('Incorrect parameters.');
    } else {
      Verify.create(req.body.email, (success) => {
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

  static settings(req, res) {
    if(!req.session.user || !req.body || !req.body.password || !req.body.name) {
      res.status(401).end('Thats a bad request');
    } else {
      Users.findUserByEmail(req.session.user.email, {
        _id: 1,
        hashedPassword: 1
      }, (user) => {
        if (user && user.hashedPassword) {
          Users.authenticate(user, req.body.password, (match) => {
            // The user is who they say they are, let them change the settings.
            if (match) {              
              req.session.user.name = req.body.name;

              if (req.body.newPassword && req.body.confirmPassword) {
                Users.hash(req.body.newPassword, (err, hash) => {
                  if (err) {
                    console.log('Error hashing password.', err);
                    res.status(400).end('Error hashing password.');
                    return;
                  }
                  if (hash) {
                    const update = {
                      name: req.body.name,
                      hashedPassword: hash
                    };

                    Users.updateUserByEmail(req.session.user.email, update, (response) => {
                      if (response && response.nModified === 1) {
                        res.status(200).end('Success');
                      } else { 
                        res.status(400).end('Error updating user.');
                      }
                    });
                  }
                });
              } else {
                const update = {
                  name: req.body.name
                };

                // The user is who they say they are, let them change the settings.
                Users.updateUserByEmail(req.session.user.email, update, (response) => {
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

  static getRegister(req, res) {
    if (req.query && req.query.email && req.query.token) {
      res.render('register', {
        userEmail: req.query.email,
        verifyToken: req.query.token
      });
    } else {
      res.redirect('/');
    }
  }

  static postRegister(req, res) {
    if(req.body &&
       req.body.token &&
       req.body.email &&
       req.body.password &&
       req.body.passwordVerification &&
       req.body.name) {      

      if (req.body.password !== req.body.passwordVerification) {
        res.render('register', {
          userEmail: req.body.email,
          registerMessage: 'Your passwords don\'t match.'
        });
        return;
      }

      Verify.verifyToken(req.body.email, req.body.token, (success) => {
        if (success) {
          Users.hash(req.body.password, (err, hash) => {
            if (err) console.log('Error hashing password.', err);
            if (hash) {
              Users.updateUserByEmail(req.body.email, {
                hashedPassword: hash,
                name: req.body.name
              }, (user) => {
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

    } else if(req.body.email && req.body.token) {
      res.render('register', {
        userEmail: req.body.email,
        registerMessage: 'Invalid request, did you fill out all of the fields? You may need to resend yourself the email at pley.usb.purdue.edu'
      });
    } else {
      console.log("No session for registration.")
      res.render('index');
    }
  }

}
