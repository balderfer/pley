const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// TODO: Move this into ENV variables or something.
const mongoDBURL = 'mongodb://localhost:27017/pley';

var db;

// Initialize mongoDB connection.
MongoClient.connect(mongoDBURL, (err, database) => {
  if(err) 
    throw err;

  db = database;
});

module.exports = db;