const { CREATED, OK, FORBIDDEN } = require('../helpers/httpStatusCodes');
const { createUser, validateAndLogin } = require('../services/usersServices');

async function createNewUser(req, res) {
  const { name, email, password } = req.body;
  const verifyAndCreate = await createUser({ name, email, password, role: 'user' });

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

async function createNewAdmin(req, res) {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
  }

  const { name, email, password } = req.body;
  const verifyAndCreate = await createUser({ name, email, password, role });
  if (verifyAndCreate.code) {
    return res.status(verifyAndCreate.code).json({ message: verifyAndCreate.message });
  }

  return res.status(CREATED).json(verifyAndCreate);
}

module.exports = {
  createNewAdmin,
  createNewUser,
  login,
};