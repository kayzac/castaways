var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var hbs          = require('express-hbs');
var serverport   = process.env.PORT || 3000;

var routes = require('./routes/index');

var app = express();

/**
* View Engine
*/
app.engine('hbs', hbs.express3({
 defaultLayout: __dirname + '/views/layouts/default.hbs',
 partialsDir: __dirname + '/views/layouts/partials',
 layoutsDir: __dirname + '/views/layouts',
 extname: '.hbs'
}));

// configure views path
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

//only setup livereload in development
if (process.env.NODE_ENV === 'development') {
  var livereload = require('connect-livereload'),
    livereloadport = 35729;

  server.use(livereload({
    port: livereloadport
  }));
}

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


var app = app.listen(serverport, function() {
  console.log('Listening on port %d', app.address().port);
});