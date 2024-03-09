const users = require('express').Router();
const validateInput = require('../middlewares/validateInput');
const userService = require('../services/users');
const {
  checkUserSignupValidator,
  checkUserLoginValidator,
} = require('../validators/users');

users.post(
  '/register',
  [checkUserSignupValidator, validateInput],
  async (req, res) => {
    const userPayload = req.body;
    const isUserExists = await userService.isUserExists(userPayload);
    if (isUserExists) {
      res.status(200).send({
        status: true,
        message: 'User already exists in our database',
      });
    } else {
      const insertionDbResponse = await userService.addUser(userPayload);
      if (insertionDbResponse._id) {
        res.status(200).send({
          status: true,
          message: 'User created successfully',
        });
      }
    }
  }
);

users.post(
  '/login',
  [checkUserLoginValidator, validateInput],
  async (req, res) => {
    const loginUserPayload = await userService.fetchUserDetails(req.body);
    if (!loginUserPayload) {
      res.status(401).send({
        status: false,
        message: 'Please check your credentials and try logging again!',
      });
    }
    const loginResult = await userService.generateAccessToken(loginUserPayload);
    if (loginResult.token) {
      res.status(200).send({
        status: true,
        token: loginResult.token,
        message: 'Token generated successfully',
      });
    }
  }
);

module.exports = users;
