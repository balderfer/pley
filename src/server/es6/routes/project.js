'use strict';

const db = require('../db');
const request = require('superagent');
import { Projects, Users } from '../collections';

export default class Project {

  static create(req, res) {
    if (!req.session.user) {
      res.status(403).send("Unauthorized");
    } else {
      if (req.body && req.body.applicationName && req.body.githubUrl) {
        // Projects.createProject(req.session.user._id, req.body.applicationName, (project) => {
        //   if (project) {
        //     res.status(200).send(project);
        //   } else {
        //     res.status(400).send("Failed to create project");
        //   }
        // })
        request
          .post('http://pley-proxy.usb.cs.purdue.edu/new-app')
          .type('form')
          .send({
            githubURL: req.body.githubUrl,
            subdomain: req.body.applicationName,
            userId: req.session.user._id
          })
          .end((err, response) => {
            if (err) {
              console.log(err);
              res.status(400).json({
                error: err,
                response: response
              });
            } else {
              res.status(200).json(response);
            }
          });
      } else {
        res.status(400).send("Missing required fields");
      }
    }
  }

  static get(req, res) {
    if (!req.session.user) {
      res.status(403).send("Unauthorized");
    } else {
      Projects.findProjectById(req.params.projectId, {
        _id: 1,
        name: 1,
        author: 1,
        createdAt: 1
      }, (project) => {
        if (project) {
          if (project.author == req.session.user._id) {
            res.status(200).send(project);
          } else {
            res.status(403).send("Unauthorized");
          }
        } else {
          res.status(400).send("Error, could not retrieve project");
        }
      });
    }
  }

  static getProjectsForUser(req, res) {
    if (!req.session.user) {
      res.status(403).send('Unauthorized');
    } else {
      // Projects.findAllProjectsByUser(req.session.user._id, {
      //   name: 1,
      //   author: 1,
      //   createdAt: 1,
      //   _id: 1
      // }, (projects) => {
      //   if (projects) {
      //     res.status(200).json(projects);
      //   } else {
      //     res.status(400).send("Error finding projects");
      //   }
      // });
      request
        .get('http://pley-proxy-2.usb.cs.purdue.edu/app-data?userId=' + req.session.user._id)
        .end((err, response) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              error: err,
              response: response
            });
          } else {
            res.status(200).json(JSON.parse(response.text));
          }
        });
    }
  }

}
