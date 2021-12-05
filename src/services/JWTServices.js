const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../helpers/httpStatusCodes');
const ValidationException = require('../exceptions/validationException');

const SECRET = 'Pr4iseTh3Sun';

function generateJWT(id, email, role) {
  const CONFIG = {
    expiresIn: '5h',
    algorithm: 'HS256',
  };

  const PAYLOAD = { id, email, role };
  const token = jwt.sign(PAYLOAD, SECRET, CONFIG);

  return { token };
}

function checkJWT(token) {
  if (!token) throw new ValidationException('missing auth token', UNAUTHORIZED);
}

module.exports = {
  generateJWT,
  checkJWT,
};