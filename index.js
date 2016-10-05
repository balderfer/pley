const koa = require("koa");
const hbs = require("koa-hbs");
const static = require("koa-static");
const Router = require("./app/router");


const app = koa();

app.use(hbs.middleware({
  viewPath: __dirname + "/views"
}));

app.use(static(__dirname + "/public"));

const router = new Router(app);
const port = process.env.PORT || 3000;

app.listen(port);
