const { CREATED } = require('../helpers/httpStatusCodes');
const { createUser } = require('../services/userServices');

async function createNewUser(req, res) {
  const { name, email, password } = req.body;
  const verifyAndCreate = await createUser({ name, email, password });

  if (verifyAndCreate.code) {
    return res.status(verifyAndCreate.code).json({ message: verifyAndCreate.message });
  }

  return res.status(CREATED).json(verifyAndCreate);
}

module.exports = {
  createNewUser,
};