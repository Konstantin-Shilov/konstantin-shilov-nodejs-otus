passport = require('passport');
const express = require('express');
const {
  registrationValidationRules,
  loginValidationRules,
  validateApi,
} = require('../middleware/authValidator');

function apiAuthenticate(name) {
  return function(req, res, next) {
    passport.authenticate(name, function(err, user, info) {
      if (err) return next(err);

      if (!user) {
        const { message } = info;
        return res.status(404).json({ success: false, message });
      }

      req.logIn(user, function(err) {
        if (err) return next(err);
        res.status(200).json({ success: true });
      });
    })(req, res, next);
  };
}

module.exports = function() {
  const router = express.Router();

  router.post('/api/v1/login', loginValidationRules(), validateApi, apiAuthenticate('login'));
  router.post('/api/v1/register', registrationValidationRules(), validateApi, apiAuthenticate('register'));

  return router;
};
