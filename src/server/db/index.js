const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// TODO: Move this into ENV variables or something.
const mongoDBURL = 'mongodb://localhost:27017/pley';

var _db;

module.exports =  {
  connectToDatabase: function(callback) {
    MongoClient.connect(mongoDBURL, (err, db) => {
      _db = db;
      if(callback)
        callback(err, db);
    });
  },

  // The mongo client connection is async, this makes it require correctly when connected from the entry.
  db: function() {
    return _db;
  },

  close: function() {
    mongodb.close();
  }
};
