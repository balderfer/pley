const koa = require('koa');
const hbs = require('koa-hbs');
const koaStatic = require('koa-static');
const Router = require('./src/server/router');

const app = koa();

app.use(hbs.middleware({
  viewPath: __dirname + '/views'
}));

app.use(koaStatic(__dirname + '/public'));

new Router(app);
const port = process.env.PORT || 3000;

app.listen(port);
