const { CREATED, OK, FORBIDDEN } = require('../helpers/httpStatusCodes');
const { createUser, validateAndLogin } = require('../services/usersServices');

async function createNewUser(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const verifyAndCreate = await createUser({ name, email, password, role: 'user' });
    return res.status(CREATED).json(verifyAndCreate);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const validateLogin = await validateAndLogin(email, password);

    return res.status(OK).json(validateLogin);
  } catch (err) {
    next(err);
  }
}

async function createNewAdmin(req, res, next) {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
  }

  try {
    const { name, email, password } = req.body;
    const verifyAndCreate = await createUser({ name, email, password, role });

    return res.status(CREATED).json(verifyAndCreate);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createNewAdmin,
  createNewUser,
  login,
};