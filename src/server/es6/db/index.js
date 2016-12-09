// TODO: Move this into ENV variables or something.
const mongoDBURL = 'mongodb://bart.usb.cs.purdue.edu:27017/pley';

const mongojs = require('mongojs');
var db = mongojs(mongoDBURL);

db.on('error', (err) => {
  throw err;
});

module.exports = db;