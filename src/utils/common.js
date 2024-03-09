const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    return bcrypt.hash(password, process.env.BCRYPT_SALT);
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}

async function validateRole(userRole, allowedRoles, res) {
  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    res.status(401).send({
      status: false,
      message: 'Access Denied',
    });
  }
  return true;
}

module.exports = {
  hashPassword,
  validateRole,
};
