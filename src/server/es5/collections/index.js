'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _users = require('./users');

Object.defineProperty(exports, 'Users', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_users).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }