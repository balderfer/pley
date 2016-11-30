'use strict';

const crypto = require('crypto');

const mailer = require('./mailer');
const mongoClient = require('mongodb').MongoClient;

const constants = require('./constants');
// Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");

//   db.close();
// });

class Verify {
  constructor() {
    // TODO: Connect to mongodb
  }

  create(email, done) {
    if (this.verifyPurdueEmail(email)) {
      this.createVerificationToken((token) => {
        mailer.sendVerificationEmail(email, token);

        // Set the token in our database for that user's email.
        // var template = sync.await(db.collection('sdfv').findOne({
        //   _id: id
        // }, {
        //   _id: 1
        // }, sync.defer()));

        done(true);
      });
    } else {
      done(false);
    }
  }

  createVerificationToken(callback) {
    crypto.randomBytes(48, (ex, buf) => {
      const token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
      callback(token);
    });
  }

  verifyPurdueEmail(purdueEmail) {
    const purdueEmailRegex = new RegExp('@purdue.edu\s*$');

    return purdueEmailRegex.test(purdueEmail);
  }
}

module.exports = new Verify();