const { hashPassword } = require('../utils/common');
const { generateJwtAccessToken } = require('../utils/jwt');
const User = require('../models/User');

module.exports = {
  async getAllUsers() {
    try {
      return await User.find();
    } catch (error) {
      console.log('Error finding the users in the database', error);
      throw error;
    }
  },
  async addUser(user) {
    try {
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
      const userDbInsertionObj = new User(user);
      return await userDbInsertionObj.save();
    } catch (error) {
      console.log('Failed adding the given user', error);
      throw error;
    }
  },
  async isUserExists(user) {
    try {
      return await User.exists({ email: user.email });
    } catch (error) {
      console.log('Failed checking whether user exists', error);
      throw error;
    }
  },

  async fetchUserDetails(user) {
    try {
      return await User.findOne({
        email: user.email,
        password: await hashPassword(user.password),
      })
        .select(['_id', 'email', 'role'])
        .lean();
    } catch (error) {
      console.log('Error fetching the login details', error);
      throw error;
    }
  },
  async generateAccessToken(user) {
    try {
      return {
        token: await generateJwtAccessToken(user),
      };
    } catch (error) {
      console.log('Failed generating the token', error);
      throw error;
    }
  },
};
