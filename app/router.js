const route = require("koa-route");

class Router {
  constructor(app) {
    app.use(route.get("/", this.index));
  }

  * index() {
    yield this.render("index");
  }

}

module.exports = Router;