const db = require('../db');
import bcrypt from 'bcrypt';

const saltRounds = 10;

export default class Users {

  constructor() {
    this.collection = db.collection('users');
  }

  static findUserByEmail(email, fields, callback) {
    db.collection('users').findOne({
      email: email,
      verifiedAt: {$exists: true}
    }, fields || {}, (err, user) => {
      if (err) {
        console.log("Error finding user, " + email, err);
      } else {
        callback(user);
      }
    });
  }

  static updateUserByEmail(email, opts, callback) {
    db.collection('users').update({
      email: email
    }, {
      $set: opts
    }, (err, user) => {
      if (err) {
        console.log("Error updating user, " + email, err);
      } else {
        callback(user);
      }
    });
  }

  static authenticate(user, password, callback) {
    bcrypt.compare(password, user.hashedPassword).then(callback);
  }

  static hash(text, callback) {
    bcrypt.hash(text, saltRounds, callback);
  }
}