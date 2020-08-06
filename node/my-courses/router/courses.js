const express = require('express');

module.exports = function() {
  const router = express.Router();

  router.get('/courses/:course', (req, res) => {
    res.render('pages/course');
  });

  router.get('/courses', function(req, res, next) {
    res.render('pages/courses');
  });

  return router;
};
