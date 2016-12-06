const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routing = require('./src/server/router');
var db = require('./src/server/db');

const app = express();

/**
 * For timestamped console messages.
 * It makes for easier debugging.
 */
require('log-timestamp');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'ult1m4t3 53cr3t',
  resave: true,
  saveUninitialized: true
}));

app.use('/', routing);

// Set the view engine to handlebars.
app.set('views', 'views/');
app.engine('.hbs', exphbs({
  layoutsDir: 'views/',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/',  express.static('./public'));

const port = process.env.PORT || 3000;

// Initialize the db connection, start the server afterwords.
db.connectToDatabase((err) => {
  if (err)
    throw err;

  app.listen(port, () => {
    console.log('Listening on port:', port);
  });
});
