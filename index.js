const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const exphbs = require('express-handlebars');
const routing = require('./src/server/es5/router');

const app = express();

/**
 * For timestamped console messages.
 * It makes for easier debugging.
 */
require('log-timestamp');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('ult1m4t3 53cr3t'));

app.use(session({
  secret: 'ult1m4t3 53cr3t',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  },
  store: new MongoStore({
    url: 'mongodb://bart.usb.cs.purdue.edu:27017/pley-sessions'
  })
}));


// Set the view engine to handlebars.
app.set('views', 'views/');
app.engine('.hbs', exphbs({
  layoutsDir: 'views/',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/',  express.static('./public'));
app.use('/', routing);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Listening on port:', port);
});
