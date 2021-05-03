import jwt from 'jsonwebtoken';
import config from 'config';

import { TOKEN, HTTP_CODES, HTTP_MESSAGES } from '../utils/constants.js';

const authController = (req, res) => {
  const { username, password } = req.body;

  const { clients } = req;
  
  if (!clients) {
    return res.status(HTTP_CODES.NOT_FOUND).send({
      code: HTTP_CODES.NOT_FOUND,
      message: `Clients: ${HTTP_MESSAGES.NOT_FOUND}`
    });
  }

  const loguedUser = clients.find(
    client => client.name === username && client.email === password
  );

  if (loguedUser) {
    const token = jwt.sign(loguedUser, config.get('SECRET_KEY'), {
      expiresIn: TOKEN.EXPIRES_IN
    });

    return res.send({ token, type: TOKEN.TYPE, expires_in: TOKEN.EXPIRES_IN });
  }
  return res.status(HTTP_CODES.UNAUTHORIZED).send({
    code: HTTP_CODES.UNAUTHORIZED,
    message: HTTP_MESSAGES.UNAUTHORIZED
  });
};

export default authController;