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
    Users.findUserByEmail(email, (user) => {
      if (user && user.hashedPassword) {
        // Compare the two hashed passwords.
        Users.authenticate(user, password, (match) => {
          if (match) {
            req.session.reload((err) => {
              req.session.user = user;
              req.session.save((err) => {
                console.log(req.session);
                res.status(200);
                res.end();
              });
            });
          } else {
            res.status(401).send('Invalid email/password.');
          }
        });
      } else {
        // No match in db for email with a verified account.
        res.status(401).end('Invalid email/password.');
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
    console.log("received post register request");
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
      }

      Verify.verifyToken(req.body.email, req.body.token, (success) => {
        if (success) {
          console.log('verified token!')
          Users.hash(req.body.password, (err, hash) => {
            if (err) console.log("Error hashing password.", err);
            if (hash) {
              Users.updateUserByEmail(req.body.email, {
                hashedPassword: hash,
                name: req.body.name
              }, (user) => {
                console.log("Saved new user registration!");
                var userObject = {
                  email: user.email,
                  name: user.name
                };
                req.session.user = userObject;
                res.render('index');
              });
            }
          })
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
