const { validationResult } = require('express-validator');

/**
 * The function `validateInput` checks for validation errors in the request and sends a response with
 * the errors if any, otherwise it proceeds to the next middleware.
 * @param req - The `req` parameter in the `validateInput` function typically represents the HTTP
 * request object, which contains information about the incoming request from the client, such as the
 * request headers, parameters, body, and other details.
 * @param res - The `res` parameter in the `validateInput` function stands for the response object in
 * Express.js. It is used to send a response back to the client making the HTTP request. In the
 * provided code snippet, the `res` object is used to send a JSON response with status 400 (
 * @param next - The `next` parameter in the `validateInput` function is a callback function that is
 * used to pass control to the next middleware function in the request-response cycle. When called, it
 * passes the control to the next middleware function.
 * @returns If there are validation errors present in the request, a response with status code 400 and
 * a JSON object containing the status as false and the filtered error messages will be returned.
 * Otherwise, the `next()` function will be called to proceed to the next middleware in the request
 * handling chain.
 */
function validateInput(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const filteredErrors = errors.array().map((error) => {
      return error.msg;
    });

    return res.status(400).json({
      status: false,
      errors: filteredErrors,
    });
  }

  next();
}

module.exports = validateInput;
