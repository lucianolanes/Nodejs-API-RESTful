const { createNewUser, getEmail } = require('../models/usersModels');
const { BAD_REQUEST, CONFLICT } = require('../helpers/httpStatusCodes');

function validateUserData(newUserData) {
  const { name, email, password } = newUserData;
  const message = 'Invalid entries. Try again.';
  if (!name || !email || !password) {
    return { message, code: BAD_REQUEST };
  }

  const emailValidation = /^[a-z0-9_]+[.-]?@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/.test(email);
  if (!emailValidation) {
    return { message, code: BAD_REQUEST };
  }

  return {};
}

async function checkEmail(email) {
  const emailExists = await getEmail(email);
  if (emailExists) return { message: 'Email already registered', code: CONFLICT };
  return {};
}

async function createUser(newUserData) {
  const validateData = validateUserData(newUserData);
  if (validateData.message) return validateData;
  
  const verifyEmail = await checkEmail(newUserData.email);
  if (verifyEmail.message) return verifyEmail;

  const created = await createNewUser({ ...newUserData, role: 'user' });
  const { name, email, role, _id } = created[0];
  return { user: { name, email, role, _id } };
}

module.exports = {
  createUser,
};