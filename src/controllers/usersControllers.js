const { CREATED, OK } = require('../helpers/httpStatusCodes');
const { createUser, validateAndLogin } = require('../services/usersServices');

async function createNewUser(req, res) {
  const { name, email, password } = req.body;
  const verifyAndCreate = await createUser({ name, email, password });

  if (verifyAndCreate.code) {
    return res.status(verifyAndCreate.code).json({ message: verifyAndCreate.message });
  }

  return res.status(CREATED).json(verifyAndCreate);
}

async function login(req, res) {
  const { email, password } = req.body;
  const validateLogin = await validateAndLogin(email, password);

  if (validateLogin.code) {
    return res.status(validateLogin.code).json({ message: validateLogin.message });
  }

  return res.status(OK).json(validateLogin);
}

module.exports = {
  createNewUser,
  login,
};