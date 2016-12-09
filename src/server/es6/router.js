'use strict';

const express = require('express');
const router = express.Router();
import { Auth, Project } from './routes';

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
router.post('/api/app/create', Project.create);
router.post('/api/app/all', Project.getProjectsForUser);
router.post('/api/app/:projectId', Project.get);
router.get('/api/app/:projectId/logs', Project.getLogs);

router.post('/register', Auth.postRegister);
router.post('/signup', Auth.signup);
router.post('/login', Auth.login);
router.post('/settings', Auth.settings);

router.get('/register', Auth.getRegister);
router.get('/logout', Auth.logout);
router.get('*', (req, res) => {
  res.render('index', {
    user: JSON.stringify(req.session.user || {})
  });
});

module.exports = router;