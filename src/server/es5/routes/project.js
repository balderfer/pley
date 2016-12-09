'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _collections = require('../collections');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = require('../db');
var request = require('superagent');

var Project = function () {
  function Project() {
    _classCallCheck(this, Project);
  }

  _createClass(Project, null, [{
    key: 'create',
    value: function create(req, res) {
      if (!req.session.user) {
        res.status(403).send("Unauthorized");
      } else {
        if (req.body && req.body.applicationName && req.body.githubUrl) {
          // Projects.createProject(req.session.user._id, req.body.applicationName, (project) => {
          //   if (project) {
          //     res.status(200).send(project);
          //   } else {
          //     res.status(400).send("Failed to create project");
          //   }
          // })
          request.post('http://pley-proxy.usb.cs.purdue.edu/new-app').type('form').send({
            githubURL: req.body.githubUrl,
            subdomain: req.body.applicationName,
            userId: req.session.user._id
          }).end(function (err, response) {
            if (err) {
              console.log(err);
              res.status(400).json({
                error: err,
                response: response
              });
            } else {
              res.status(200).json(response);
            }
          });
        } else {
          res.status(400).send("Missing required fields");
        }
      }
    }
  }, {
    key: 'get',
    value: function get(req, res) {
      if (!req.session.user) {
        res.status(403).send("Unauthorized");
      } else {
        _collections.Projects.findProjectById(req.params.projectId, {
          _id: 1,
          name: 1,
          author: 1,
          createdAt: 1
        }, function (project) {
          if (project) {
            if (project.author == req.session.user._id) {
              res.status(200).send(project);
            } else {
              res.status(403).send("Unauthorized");
            }
          } else {
            res.status(400).send("Error, could not retrieve project");
          }
        });
      }
    }
  }, {
    key: 'getLogs',
    value: function getLogs(req, res) {
      if (!req.session.user) {
        res.status(403).send('Unauthorized');
      } else {
        request.get('http://bart.usb.cs.purdue.edu:3000/logs/' + req.params.projectId).end(function (err, response) {
          if (err) {
            console.log(err);
            res.status(400).json({
              error: err,
              response: response
            });
          } else {
            res.status(200).send(response.text);
          }
        });
      }
    }
  }, {
    key: 'getProjectsForUser',
    value: function getProjectsForUser(req, res) {
      if (!req.session.user) {
        res.status(403).send('Unauthorized');
      } else {
        // Projects.findAllProjectsByUser(req.session.user._id, {
        //   name: 1,
        //   author: 1,
        //   createdAt: 1,
        //   _id: 1
        // }, (projects) => {
        //   if (projects) {
        //     res.status(200).json(projects);
        //   } else {
        //     res.status(400).send("Error finding projects");
        //   }
        // });
        request.get('http://pley-proxy-2.usb.cs.purdue.edu/app-data?userId=' + req.session.user._id).end(function (err, response) {
          if (err) {
            console.log(err);
            res.status(400).json({
              error: err,
              response: response
            });
          } else {
            res.status(200).json(JSON.parse(response.text));
          }
        });
      }
    }
  }]);

  return Project;
}();

exports.default = Project;