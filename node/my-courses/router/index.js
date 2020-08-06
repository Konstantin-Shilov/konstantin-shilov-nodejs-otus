const express = require('express');

const index = require('./main');
const about = require('./about');
const contact = require('./contact');
const courses = require('./courses');

module.exports = function(options) {
  const router = express.Router();

  router.use(index(options));
  router.use(about(options));
  router.use(contact(options));
  router.use(courses(options));

  return router;
};
