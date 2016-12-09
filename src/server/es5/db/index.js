'use strict';

// TODO: Move this into ENV variables or something.
var mongoDBURL = 'mongodb://bart.usb.cs.purdue.edu:27017/pley';

var mongojs = require('mongojs');
var db = mongojs(mongoDBURL);

db.on('error', function (err) {
  throw err;
});

module.exports = db;