import axios from 'axios';
import config from 'config';

import { HTTP_CODES, HTTP_MESSAGES } from '../utils/constants.js';

const makeRequestToAssestment = (...uris) => {
  return async (req, res, next) => {
    try {
      const login = await axios.post(config.get('LOGIN_URI'), {
        client_id: config.get('CLIENT_ID'),
        client_secret: config.get('CLIENT_SECRET')
      });

      if (uris && login) {
        for (const uri of uris) {
          if (uri) {
            const response = await axios.get(uri, {
              headers: {
                Authorization: `Bearer ${login.data.token}`
              }
            });
            if (uri.includes('clients')) {
              req.clients = response.data;
            } else if (uri.includes('policies')) {
              req.policies = response.data;
            } else {
              req.data = response.data;
            }
          } else {
            return res.status(HTTP_CODES.BAD_REQUEST).send({
              code: HTTP_CODES.BAD_REQUEST,
              message: `${HTTP_MESSAGES.BAD_REQUEST}: ${req.baseUrl} no uri provided`
            });
          }
        }
        return next();
      }
    } catch (err) {
      console.error(err);
      return res.status(HTTP_CODES.SERVER_ERROR).send({
        code: HTTP_CODES.SERVER_ERROR,
        message: HTTP_MESSAGES.SERVER_ERROR
      });
    }
  };
};

export default makeRequestToAssestment;
