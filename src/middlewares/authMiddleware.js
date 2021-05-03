import config from 'config';
import jwt from 'jsonwebtoken';

import { HTTP_CODES, HTTP_MESSAGES } from '../utils/constants.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token || !token.includes('Bearer')) {
    return res.status(HTTP_CODES.UNAUTHORIZED).send(HTTP_MESSAGES.WRONG_TOKEN);
  }

  try {
    const bearerToken = token.split(' ')[1];
    const decoded = jwt.verify(bearerToken, config.get('SECRET_KEY'));
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .send(`${HTTP_MESSAGES.BAD_REQUEST}: ${req.baseUrl}`);
  }
};

export default authMiddleware;
