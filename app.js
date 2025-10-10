const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

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

// ROUTES (order matters)
app.use('/api', apiRouter);       // 1) API first
app.use('/travel', travelRouter); // 2) /travel page (module 2+)
app.use('/', indexRouter);        // 3) home (can redirect to /travel)

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
