const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../helpers/httpStatusCodes');

const SECRET = 'Pr4iseTh3Sun';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
  
    return next();
  } catch (err) {

    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};