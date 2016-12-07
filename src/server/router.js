'use strict';

const express = require('express');
const router = express.Router();
const Verify = require('./verify');
const Auth = require('./auth');

// TODO: Don't use this.
router.get('/verify/:token', (req, res) => {
  if(req.params && req.params.token && req.query.email) {
    console.log('Do something with this token:', req.params.token);

    Verify.verifyToken(req.query.email, req.params.token, (success) => {
      if (success) {
        res.send('Success! You may now close this page.');
      } else {
        res.send('Error verifying account. Please try again.');
      }
    }); 
  }
});

router.post('/signup', (req, res) => {
  if (!req.body || !req.body.email) {
    res.status = 400;
    res.end('Incorrect parameters.');
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
});

router.get('/register', (req, res) => {
  if (!req.query || !req.query.email || !req.query.token) {
    if (req.session.registrationEmail && req.session.registrationToken) {
      res.render('register', {
        userEmail: req.session.registrationEmail
      });
    } else {
      res.status = 400;
      res.end('Invalid request, did you recieve a confirmation email with a link? Please follow that link.\n' +
        'The verification token also might have expired: please resend yourself the email at pley.usb.purdue.edu');
    }
  } else {
    req.session.registrationEmail = req.query.email;
    req.session.registrationToken = req.query.token;

    // Once we've recieved the query params and saved them to our session we redirect them, this makes it so much prettier.
    res.redirect('/register');
  }
});

router.post('/register', (req, res) => {
  if(req.body && req.body.password && req.body.passwordVerification && req.body.name && 
      req.session.registrationEmail && req.session.registrationToken) {

    if (req.body.password === req.body.passwordVerification) {
      Verify.verifyToken(req.session.registrationEmail, req.session.registrationToken, (success) => {
        if (success) {
          // TODO: Send them the user object also.
          res.render('index');
        } else {
          res.render('register', {
            userEmail: req.body.email,
            registerMessage: 'Error verifying account. You need to resend yourself the email at pley.usb.purdue.edu'
          });
        }
      }); 
    } else {
      res.render('register', {
        userEmail: req.session.registrationEmail,
        registerMessage: 'Your passwords don\'t match.'
      });
    }
  } else if(req.session.registrationEmail && req.session.registrationToken) {
    res.render('register', {
      userEmail: req.session.registrationEmail,
      registerMessage: 'Invalid request, did you fill out all of the fields? You may need to resend yourself the email at pley.usb.purdue.edu'
    });
  } else {
    res.render('index');
  }
});

// Return data related to a user's dashboard.
router.get('/dashboard', (req, res) => {
  let session = req.session;

  if (session.loggedIn) {
    res.json({
      email: 'EMAIL',
      // TODO: Send a user's application info from db here.
      applications: [{}]
    });
  } else {
    res.render('index');
  }
});

router.get(['/register'], (req, res) => {
  res.render('register');
});

router.get(['/', '/docs', '/about', '/login'], (req, res) => {
  res.render('index');
});

// TODO: Put some kind of limiter on this.
router.post('/login', Auth.login);

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;