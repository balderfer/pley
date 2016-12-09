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
router.post('/api/app/create', _routes.Project.create);
router.post('/api/app/all', _routes.Project.getProjectsForUser);
router.post('/api/app/:projectId', _routes.Project.get);
router.get('/api/app/:projectId/logs', _routes.Project.getLogs);

router.post('/register', _routes.Auth.postRegister);
router.post('/signup', _routes.Auth.signup);
router.post('/login', _routes.Auth.login);
router.post('/settings', _routes.Auth.settings);

router.get('/register', _routes.Auth.getRegister);
router.get('/logout', _routes.Auth.logout);
router.get('*', function (req, res) {
  res.render('index', {
    user: JSON.stringify(req.session.user || {})
  });
});

module.exports = router;