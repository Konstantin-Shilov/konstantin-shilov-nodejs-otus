const express = require('express');
const {authChecker} = require('../middleware/authValidator');

module.exports = function() {
  const router = express.Router();

  router.get('/about', authChecker, function(req, res, next) {
    res.render('pages/about', { isAuth: req.isAuth, userName: req.userName });
  });

  return router;
};
