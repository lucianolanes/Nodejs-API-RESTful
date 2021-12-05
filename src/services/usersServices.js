const { createNewUser, getEmail, getEmailAndPassword } = require('../models/usersModels');
const { BAD_REQUEST, CONFLICT, UNAUTHORIZED } = require('../helpers/httpStatusCodes');
const { generateJWT } = require('./JWTServices');
const ValidationException = require('../exceptions/validationException');

function validateUserData(newUserData) {
  const { name, email, password } = newUserData;
  const message = 'Invalid entries. Try again.';
  if (!name || !email || !password) {
    throw new ValidationException(message, BAD_REQUEST);
  }

  const emailValidation = /^[a-z0-9_]+[.-]?@[a-z]+\.[a-z]{2,3}(?:\.[a-z]{2})?$/.test(email);
  if (!emailValidation) throw new ValidationException(message, BAD_REQUEST);
}

async function checkEmail(email) {
  const emailExists = await getEmail(email);
  if (emailExists) throw new ValidationException('Email already registered', CONFLICT);
}

async function createUser(newUserData, newRole) {
  validateUserData(newUserData);
  await checkEmail(newUserData.email);

  const created = await createNewUser({ ...newUserData, newRole });
  const { name, email, role, _id } = created[0];
  return { user: { name, email, role, _id } };
}

async function validateAndLogin(email, password) {
  if (!email || !password) throw new ValidationException('All fields must be filled', UNAUTHORIZED);

  const exists = await getEmailAndPassword(email, password);
  if (!exists) throw new ValidationException('Incorrect username or password', UNAUTHORIZED);

  const { _id, role } = exists;
  return generateJWT(_id, email, role);
}

module.exports = {
  createUser,
  validateAndLogin,
};