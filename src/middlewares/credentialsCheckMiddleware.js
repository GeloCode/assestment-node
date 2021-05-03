import { HTTP_CODES, HTTP_MESSAGES } from '../utils/constants.js';

const credentialsCheckMiddleware = (req, res, next) => {
  const { username, password } = req.body;

  if (username && password) {
    return next();
  }
  console.error('Username/Password not present in the request');
  return res.status(HTTP_CODES.BAD_REQUEST).send({
    code: HTTP_CODES.BAD_REQUEST,
    message: `${HTTP_MESSAGES.BAD_REQUEST}: ${req.baseUrl}`
  });
};

export default credentialsCheckMiddleware;
