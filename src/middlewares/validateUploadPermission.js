const { verifyPermission } = require('../services/recipesServices');

async function validateUploadPermission(req, res, next) {
  const { id } = req.params;
  const { email } = req.user;
  const verify = await verifyPermission(id, email);
  if (verify.code) return res.status(verify.code).json({ message: verify.message });

  next();
}

module.exports = validateUploadPermission;