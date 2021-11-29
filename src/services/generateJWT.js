const jwt = require('jsonwebtoken');

const SECRET = 'Pr4iseTh3Sun';

const CONFIG = {
  expiresIn: '5h',
  algorithm: 'HS256',
};

module.exports = (id, email, role) => {
  const PAYLOAD = { id, email, role };
  const token = jwt.sign(PAYLOAD, SECRET, CONFIG);

  return { token };
};