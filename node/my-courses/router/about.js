const express = require('express');

module.exports = function() {
  const router = express.Router();

  router.get('/about', function(req, res, next) {
    res.render('pages/about');
  });

  return router;
};
