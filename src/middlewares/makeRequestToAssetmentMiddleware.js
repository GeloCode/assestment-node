import axios from 'axios';
import config from 'config';

import { HTTP_CODES, HTTP_MESSAGES } from '../utils/constants.js';

const makeRequestToAssestment = (cache, ...uris) => {
  return async (req, res, next) => {
    try {
      const login = await axios.post(config.get('LOGIN_URI'), {
        client_id: config.get('CLIENT_ID'),
        client_secret: config.get('CLIENT_SECRET')
      });
      if (uris && login) {
        for (const uri of uris) {
          if (uri) {
            let requestHeaders = {
              headers: {
                Authorization: `Bearer ${login.data.token}`,
              }
            }

            if (uri.includes('clients') && cache.has('etagClients')) {
              requestHeaders.headers['If-None-Match'] = cache.get('etagClients');
            } else if (uri.includes('policies') && cache.has('etagPolicies')) {
              requestHeaders.headers['If-None-Match'] = cache.get('etagPolicies');
            } else if (cache.has('etag')) {
              requestHeaders.headers['If-None-Match'] = cache.get('etag');
            }
            
            try {
              const response = await axios.get(uri, requestHeaders);
              if (uri.includes('clients')) {
                req.clients = response.data;
                cache.set('etagClients', response.headers.etag);
                cache.set('clients', response.data);
              } else if (uri.includes('policies')) {
                req.policies = response.data;
                cache.set('etagPolicies', response.headers.etag);
                cache.set('policies', response.data);
                break;
              } else {
                req.data = response.data;
                cache.set('etag', response.headers.etag);
                cache.set('data', response.data);
              }
            } catch(err) {
              if (err.response.status === 304) {
                console.log('Using ETAG with CACHED responses')
                req.clients = cache.has('clients') ? cache.get('clients') : [];
                req.policies = cache.has('policies') ? cache.get('policies') : [];
                req.data = cache.has('data') ? cache.get('data') : [];
              }
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
