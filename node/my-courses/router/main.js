const express = require('express');

module.exports = function() {
  const router = express.Router();

  router.get('/', function(req, res, next) {
    res.render('pages/index');
  });

  return router;
};
