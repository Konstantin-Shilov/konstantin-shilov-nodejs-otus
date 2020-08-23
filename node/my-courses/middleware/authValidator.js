const { body, validationResult } = require('express-validator');

const loginValidationRules = () => [body('email').isEmail(), body('password').notEmpty()];
const registrationValidationRules = () => [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('name').notEmpty(),
];

const validateApi = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, message: errors.array() });
  }

  next();
};

const authChecker = (req, res, next) => {
  req.isAuth = req.isAuthenticated();
  req.userName = req.user ? req.user.name : null;
  next();
};

module.exports = {
  loginValidationRules,
  registrationValidationRules,
  validateApi,
  authChecker,
};
