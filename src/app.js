import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';

import {
  HTTP_CODES,
  HTTP_MESSAGES,
  DEFAULT_MESSAGE_VIABLE_URLS
} from './utils/constants.js';

import authMiddleware from './middlewares/authMiddleware.js';
import credentialsCheckMiddleware from './middlewares/credentialsCheckMiddleware.js';
import makeRequestToAssetmentMiddleware from './middlewares/makeRequestToAssetmentMiddleware.js';

import authRouter from './routers/authRouter.js';
import clientRouter from './routers/clientRouter.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ message: DEFAULT_MESSAGE_VIABLE_URLS });
});

app.use('/login', credentialsCheckMiddleware, makeRequestToAssetmentMiddleware(config.get('CLIENTS_URI')), authRouter());

app.use('/clients', authMiddleware, makeRequestToAssetmentMiddleware(config.get('CLIENTS_URI'), config.get('POLICIES_URI')), clientRouter());

app.use((req, res) => {
  res
    .status(HTTP_CODES.BAD_REQUEST)
    .send({
      code: HTTP_CODES.BAD_REQUEST,
      message: `${HTTP_MESSAGES.BAD_REQUEST}: this resource is not defined`
    });
});

export default app;
