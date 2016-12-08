'use strict';

var _routes = require('./routes');

var express = require('express');
var router = express.Router();


// Return data related to a user's dashboard.
// router.get('/dashboard', (req, res) => {
//   let session = req.session;

//   if (session.loggedIn) {
//     res.json({
//       email: 'EMAIL',
//       // TODO: Send a user's application info from db here.
//       applications: [{}]
//     });
//   } else {
//     res.render('index', {
//       user: JSON.stringify(req.session.user || {})
//     });
//   }
// });

router.get('/register', _routes.Auth.getRegister);
router.post('/register', _routes.Auth.postRegister);
router.post('/signup', _routes.Auth.signup);
router.post('/login', _routes.Auth.login);
router.get('/logout', _routes.Auth.logout);
router.get(['/register'], function (req, res) {
  return res.render('register');
});
router.get(['/', '/docs', '/about', '/login', '/dashboard', '/dashboard/new'], function (req, res) {
  res.render('index', {
    user: JSON.stringify(req.session.user || {})
  });
});

module.exports = router;