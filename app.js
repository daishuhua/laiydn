var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var routes = require('./routes/index');
var users = require('./routes/users');
var data = require('./routes/data');
var weixin = require('./routes/weixin');
var setting = require('./setting.js');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'www/view'));
app.set('view engine', 'ejs');
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: setting.cookieSecret,
  name  : setting.host,
  cookie: {maxAge: setting.cookieMaxAge},
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'www')));

app.use('/', routes);
app.use('/users', users);
app.use('/data', data);
app.use('/weixin', weixin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
