const { verifyPermission } = require('../services/recipesServices');

async function validateUserPermission(req, res, next) {
  try {
    const { id } = req.params;
    const { email } = req.user;
    await verifyPermission(id, email);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = validateUserPermission;