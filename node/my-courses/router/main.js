const express = require('express');
const {authChecker} = require('../middleware/authValidator');

module.exports = function() {
  const router = express.Router();

  router.get('/', authChecker, function(req, res) {
    res.render('pages/index', { isAuth: req.isAuth, userName: req.userName });
  });

  return router;
};
