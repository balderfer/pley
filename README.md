Pley
=========

Installation
------------

Install node js from https://nodejs.org/en/download/

Install MongoDB from https://www.mongodb.com/

```bash
$ npm install -g gulp-cli
$ npm install -g webpack
$ npm install -g eslint # If you're having issues with eslint you might want to make sure you're on an updated version of node js, or just message me.
$ npm install -g jasmine
$ npm install
```

Deployment
----------

#### Development

```bash
$ mongod --dbpath=/data --port 27017 #Start the MongoDB database.
$ npm start
$ browser http://localhost:3000
```

Team
------------

* Ben Alderfer
* Spencer Brown
* Rhys Howell
* Evan Walsh