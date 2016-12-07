// TODO: Move this into ENV variables or something.
const mongoDBURL = 'mongodb://localhost:27017/pley';

const mongojs = require('mongojs');
var db = mongojs(mongoDBURL);

db.on('error', (err) => {
  throw err;
});

module.exports = db;