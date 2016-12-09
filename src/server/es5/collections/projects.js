'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var db = require('../db');
var mongojs = require('mongojs');
var saltRounds = 10;

var Users = function () {
  function Users() {
    _classCallCheck(this, Users);

    this.collection = db.collection('users');
  }

  _createClass(Users, null, [{
    key: 'createProject',
    value: function createProject(userId, projectName, callback) {
      db.collection('projects').save({
        name: projectName,
        author: userId,
        createdAt: Date.now()
      }, function (err, project) {
        if (err) {
          console.log("Error saving project, " + email, err);
          callback(null);
        } else {
          console.log("Created project");
          callback(project);
        }
      });
    }
  }, {
    key: 'findProjectById',
    value: function findProjectById(projectId, fields, callback) {
      db.collection('projects').findOne({
        _id: mongojs.ObjectId(projectId)
      }, fields || {}, function (err, project) {
        if (err) {
          console.log("Error finding project, " + projectId, err);
        } else {
          callback(project);
        }
      });
    }
  }, {
    key: 'findAllProjectsByUser',
    value: function findAllProjectsByUser(userId, fields, callback) {
      db.collection('projects').find({
        author: userId
      }, fields || {}, function (err, projects) {
        if (err) {
          console.log('Error finding projects for user, ' + userId, err);
        } else {
          callback(projects);
        }
      });
    }
  }]);

  return Users;
}();

exports.default = Users;