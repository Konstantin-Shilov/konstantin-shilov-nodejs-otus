const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const {catch404, errorHandler} = require('./errorHandling');
const router = require('./router');

const app = express();

const options = {
  env: 'development',
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(router(options));

app.use(catch404);
app.use(errorHandler);

module.exports = app;
