'use strict';

const express = require('express');
const router = express.Router();
import { Auth } from './routes';

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

router.get('/register', Auth.getRegister);
router.post('/register', Auth.postRegister);
router.post('/signup', Auth.signup);
router.post('/login', Auth.login);
router.get('/logout', Auth.logout);
router.get(['/register'], (req, res) => res.render('register'));
router.get(['/', '/docs', '/about', '/login'], (req, res) => res.render('index'));

module.exports = router;