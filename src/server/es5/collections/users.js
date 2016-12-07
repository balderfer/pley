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


var saltRounds = 10;

var Users = function () {
  function Users() {
    _classCallCheck(this, Users);

    this.collection = db.collection('users');
  }

  _createClass(Users, null, [{
    key: 'findUserByEmail',
    value: function findUserByEmail(email, callback) {
      db.collection('users').findOne({
        email: email,
        verifiedAt: { $exists: true }
      }, function (err, user) {
        if (err) {
          console.log("Error finding user, " + email, err);
        } else {
          callback(user);
        }
      });
    }
  }, {
    key: 'updateUserByEmail',
    value: function updateUserByEmail(email, opts, callback) {
      db.collection('users').update({
        email: email
      }, {
        $set: opts
      }, function (err, user) {
        if (err) {
          console.log("Error updating user, " + email, err);
        } else {
          callback(user);
        }
      });
    }
  }, {
    key: 'authenticate',
    value: function authenticate(user, password, callback) {
      _bcrypt2.default.compare(password, user.hashedPassword).then(callback);
    }
  }, {
    key: 'hash',
    value: function hash(text, callback) {
      _bcrypt2.default.hash(text, saltRounds, callback);
    }
  }]);

  return Users;
}();

exports.default = Users;