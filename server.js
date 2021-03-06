var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');
// var auth = require('./resources/auth');

// require and load dotenv
require('dotenv').load();

mongoose.connect( process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/kypos');

process.on('exit', function(){ 
  mongoose.disconnect();
});

var routes = require('./config/routes');
// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), '/dist')));
// app.use('/dist/bower_components',  express.static(__dirname + '/dist/bower_components'));

app.use(methodOverride('_method'));


app.use(routes);
// app.use('/', routes);
// app.use('/users', users);

// error handlers
// angular routes

app.get('/*', function(req, res){
  // res.render('index');
  console.log("HIT!")
  res.sendFile(process.cwd() + '/views/index.html')
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



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
