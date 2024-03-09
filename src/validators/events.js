const { body, param } = require('express-validator');
const { isValidObjectId } = require('mongoose');

const checkEventValidator = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isDate()
    .withMessage('Date should be a valid date'),

  body('time')
    .notEmpty()
    .withMessage('Time cannot be empty')
    .custom((value) => {
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
      if (!timeRegex.test(value)) {
        throw new Error('Time should be in the format HH:MM AM/PM');
      }
      return true;
    }),

  body('description')
    .notEmpty()
    .withMessage('Description cannot be empty')
    .trim(),
];

const checkEventIdValidator = [
  param('id')
    .notEmpty()
    .withMessage('id cannot be empty')
    .isMongoId()
    .withMessage('id must be a valid mongo object id')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid ObjectId');
      }
      return true;
    }),
];

const checkUpdateEventValidator = [
  body().custom((value, { req }) => {
    const { date, time, description } = req.body;
    if (!date && !time && !description) {
      throw new Error(
        'At least one of date, time, or description must be provided'
      );
    }
    return true;
  }),

  body('date')
    .optional()
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isDate()
    .withMessage('Date should be a valid date'),

  body('time')
    .optional()
    .notEmpty()
    .withMessage('Time cannot be empty')
    .custom((value, {}) => {
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
      if (value && !timeRegex.test(value)) {
        throw new Error('Time should be in the format HH:MM AM/PM');
      }
      return true;
    }),

  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty')
    .trim(),
];

module.exports = {
  checkEventValidator,
  checkEventIdValidator,
  checkUpdateEventValidator,
};
