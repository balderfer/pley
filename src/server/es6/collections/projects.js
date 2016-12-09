import bcrypt from 'bcrypt';

const db = require('../db');
const mongojs = require('mongojs');
const saltRounds = 10;

export default class Users {

  constructor() {
    this.collection = db.collection('users');
  }

  static createProject(userId, projectName, callback) {
    db.collection('projects').save({
      name: projectName,
      author: userId,
      createdAt: Date.now()
    }, (err, project) => {
      if (err) {
        console.log("Error saving project, " + email, err);
        callback(null);
      } else {
        console.log("Created project");
        callback(project);
      }
    });
  }

  static findProjectById(projectId, fields, callback) {
    db.collection('projects').findOne({
      _id: mongojs.ObjectId(projectId)
    }, fields || {}, (err, project) => {
      if (err) {
        console.log("Error finding project, " + projectId, err);
      } else {
        callback(project);
      }
    });
  }

  static findAllProjectsByUser(userId, fields, callback) {
    db.collection('projects').find({
      author: userId
    }, fields || {}, (err, projects) => {
      if (err) {
        console.log('Error finding projects for user, ' + userId, err);
      } else {
        callback(projects);
      }
    });
  }

}