'use strict';

const express = require('express');
const router = express.Router();

const Verify = require('./verify');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/verify', (req, res) => {
  if (!req.body || !req.body.email) {
    res.status = 400;
    res.end('Incorrect parameters.');
  } else {
    Verify.create(req.body.email, (success) => {
      if(success) {
        res.status = 200;
        res.send('Success');
      } else {
        res.status = 400;
        res.send('Failure');
      }
    });
  }
});

module.exports = router;