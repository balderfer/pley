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
        res.send('Success');
      } else {
        res.status(400);
        res.send('Failure');
      }
    });
  }
});

// TODO: Don't use this.
// router.get('/verify/:token', (req) => {
//   if(req.params && req.params.token) {
//     console.log('Do something with this token:', req.params.token);
//   }
// });

router.get(['/', '/docs', '/about', '/login'], (req, res) => {
  // if () {

  // }
  console.log('cookies:',req.cookies);
  res.render('index');
});

// TODO: Put some kind of limiter on this.
router.post('/login', (req, res) => {
  if (req.body && req.body.email && req.body.password) {
    Auth.login(req.body.email, req.body.password, (err, token) => {
      if (err) {
        res.send(401, 'Invalid email/password.');
      } else {
        res.json({
          token: token
        });
      }
    });
  } else {
    res.status(400);
    res.end('Must supply email/password.');
  }
});

module.exports = router;