const { body } = require('express-validator');

const checkUserLoginValidator = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('email should be a valid email')
    .trim(),

  body('password').notEmpty().withMessage('password cannot be empty').trim(),
];

const checkUserSignupValidator = [...checkUserLoginValidator];

module.exports = {
  checkUserSignupValidator,
  checkUserLoginValidator,
};
