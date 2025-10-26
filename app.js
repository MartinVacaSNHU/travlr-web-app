require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

//Wire in authentication module
var passport = require('passport')
require('./app_api/config/passport')

// DB registers models:
require('./app_api/models/db');

// Routers
const apiRouter    = require('./app_api/routes');
const indexRouter  = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');

const app = express();

// view engine (HBS) + partials + static
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));
app.use(express.static(path.join(__dirname, 'public')));

// std middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

//Enable CORS for development only
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// ROUTES (order matters)
app.use('/api', apiRouter);
app.use('/travel', travelRouter);
app.use('/', indexRouter);

// Catch UnauthorizedError from express-jwt and return 401 JSON
app.use((err, req, res, next) => {
  if (err && err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: err.name + ': ' + err.message });
  }
  return next(err);
});

// 404
app.use((req, res, next) => next(require('http-errors')(404)));

// unified error handler (won’t crash on undefined url; JSON for /api)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const url = (req && req.originalUrl) ? req.originalUrl : '';
  if (url.startsWith('/api/')) {
    return res.status(status).json({ message: err.message || 'Server error' });
  }
  res.status(status);
  res.render('error', { message: err.message, status,
    error: req.app.get('env') === 'development' ? err : {} });
});

module.exports = app;
