'use strict';

const route = require('koa-route');
const Verify = require('./verify');

class Router {
  constructor(app) {
    app.use(route.get('/', this.index));

    app.use(route.post('/verify', this.createVerification));
  }

  * index() {
    yield this.render('index');
  }

  * createVerification(next) {
    Verify.create();

    this.status = 200;
    yield next;
  }
}

module.exports = Router;