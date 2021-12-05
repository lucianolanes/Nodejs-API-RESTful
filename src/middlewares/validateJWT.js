const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../helpers/httpStatusCodes');
const { checkJWT } = require('../services/JWTServices');

const SECRET = 'Pr4iseTh3Sun';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    checkJWT(token);
    try {
      const payload = jwt.verify(token, SECRET);
      req.user = payload;
    
      return next();
    } catch (err) {
      return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
  } catch (err) {
    next(err);
  }
};