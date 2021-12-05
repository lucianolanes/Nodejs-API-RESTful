const validationException = require('../exceptions/validationException');
const { INTERNAL_ERROR } = require('../helpers/httpStatusCodes');

module.exports = (err, _req, res, _next) => {
  if (err instanceof validationException) {
    return res.status(err.code).json({ message: err.message });
  }
  return res.status(INTERNAL_ERROR).json({ message: err.message });
};