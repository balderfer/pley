'use strict';

const express = require('express');
const router = express.Router();
const Verify = require('./verify');
const Auth = require('./auth');

router.post('/verify', (req, res) => {
  if (!req.body || !req.body.email) {
    res.status = 400;
    res.end('Incorrect parameters.');
  } else {
    Verify.create(req.body.email, (success) => {
      if (success) {
        res.status(200);
        res.end('Success');
      } else {
        res.status(400);
        res.end('Failure');
      }
    });
  }
});

// TODO: Don't use this.
router.get('/verify/:token', (req, res) => {
  if(req.params && req.params.token && req.params.email) {
    console.log('Do something with this token:', req.params.token);

    Verify.verifyToken(req.params.email, req.params.token, (success) => {
      if (success) {
        res.send('Error verifying account. Please try again.');
      } else {
        res.send('Success! You may now close this page.');
      }
    }); 
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

router.get(['/', '/docs', '/about', '/login'], (req, res) => {
  // console.log('cookies:',req.cookies);
  res.render('index');
});

// TODO: Put some kind of limiter on this.
router.post('/login', (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    Auth.login(req.body.email, req.body.password, (success) => {
      if (success) {
        res.status(200);
        res.end('Success');
      } else {
        res.send(401, 'Invalid email/password.');
      }
    });
  } else {
    res.status(400);
    res.end('Must supply email/password.');
  }
});

module.exports = router;