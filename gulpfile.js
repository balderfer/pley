const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint');
const livereload = require('gulp-livereload');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

const Jasmine = require('jasmine');

const config = {
  sassPath: 'src/styles/index.scss',
  cssDestDir: 'public/css',
  jsClientEntry: 'src/client/index.jsx',
  jsClientDependencies: 'src/client/lib/**/*.js',
  jsPath: 'src/**/*.js',
  jsDependPath: 'src/client/lib/**/*.js',
  jsDestDir: 'public/js',
  jsSpecPath: 'src/**/*[sS]pec.js',
  clientJsPath: [
    'src/client/**/*.js',
    'src/client/**/*.jsx',
    '!src/**/*.spec.js'
  ],
  sharedJsPath: 'src/shared/**/*.js',
  serverJsPath: ['src/server/**/*.js'],
  serverJsEntry: 'src/server/index.js',
  serverJsDestDir: './'
};


const webpackConfig = {
  output: {
    path: __dirname + config.jsDestDir,
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

gulp.task('testDev', ['test'], function() {
  // Watch for changes in the test files and test accordingly.
  gulp.watch([config.jsSpecPath], ['test']);
});

gulp.task('test', function() {
  const jasmine = new Jasmine();

  jasmine.loadConfig({
    spec_dir: '/',
    spec_files: [
      config.jsSpecPath,
    ],
    helpers: [
      'helpers/**/*.js'
    ]
  });

  // Run the jasmine tests (Tests all files that end in [sS]pec.js).
  jasmine.execute();
});

gulp.task('dev', function() {
  gulp.watch([config.jsPath, 'index.jsx', 'gulpfile.js' /* That's me! */], []);

  // Watch for clientside changes and run building tasks.
  gulp.watch([config.clientJsPath, config.sharedJsPath], ['js']);

  // Watch for changes in the dependencies for clientside and build accordingly.
  gulp.watch([config.jsDependPath], ['jsClientDependencies']);

  gulp.watch([config.sassPath],['style']);

  // Watch for any changes on public files and live reload.
  gulp.watch('public/**', function(file) {
    livereload.changed(file.path);
  });
});

// JSLint
gulp.task('lint', function () {
  gulp.src([
    '**/*.js',
    '**/*.jsx',
    '!node_modules/**' /* Ignore modules. */,
    '!**/lib/**' /* Ignore external libraries. */,
    '!public/**' /* Ignore built files. */
  ])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format());
});

// SASS -> CSS
gulp.task('style', function() {
  gulp.src([config.sassPath])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssDestDir));
});

gulp.task('jsClientDependencies', function() {
  // First build in the dependencies.
  gulp.src(config.jsClientDependencies)
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest(config.jsDestDir));
});

// Build the js using webpack and pipe it into a build.js file in the public folder.
gulp.task('js', function() {
  // Build in the client code starting from the entry point.
  gulp.src(config.jsClientEntry)
    .pipe(webpack(webpackConfig))
    .on('error', function handleError() {
      this.emit('end'); // Recover from errors.
    })
    .pipe(concat('build.js'))
    .pipe(gulp.dest(config.jsDestDir));
});

gulp.task('server', function() {
  // Watch for changes in server code and restart the server.
  nodemon({
    script: 'index.js',
    ext: 'js html',
    watch: [config.serverJsPath, config.sharedJsPath]
  })
    .on('restart', function() {
      setTimeout(function() {
        livereload.reload();
      }, 1000);
    });
});

gulp.task('default', ['js', 'dev', 'server', 'style', 'jsClientDependencies']);