const express = require('express');

module.exports = function() {
  const router = express.Router();

  router.get('/contact', function(req, res, next) {
    res.render('pages/contact');
  });

  return router;
};
